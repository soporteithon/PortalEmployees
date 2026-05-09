import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto, UpdateUserDto, ChangePasswordDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) { }


  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      // Si viene un rol en el DTO lo usamos, si no, usamos USER por defecto
      user.rol = createUserDto.rol || 'USER';

      await this.userRepository.save(user);
      delete user.password;

      // Buscamos el nombre para retornarlo en la respuesta inicial
      const userWithEmployee = await this.userRepository.findOne({
        where: { codEmpleado: user.codEmpleado },
        relations: { employee: true }
      });


      (user as any).name = userWithEmployee?.employee?.name || 'Usuario';
      (user as any).direccion = userWithEmployee?.employee?.direccion || 'No disponible';

      return {
        user,
        token: this.getJwtToken({ codEmpleado: user.codEmpleado }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      relations: { employee: true },
      select: {
        codEmpleado: true,
        email: true,
        password: true,
        rol: true,
        activo: true,
        ultimoAcceso: true,
        fechaCreo: true,

        employee: {
          name: true,
          direccion: true,
          lugarNacimiento: true,
          fechaNacimiento: true,
        }
      },
    });

    if (!user) throw new UnauthorizedException('Credenciales no validas ');

    // Agregamos el nombre y dirección desde la relación con Empleado
    (user as any).name = user.employee?.name || 'Usuario';
    (user as any).direccion = user.employee?.direccion || 'No disponible';
    (user as any).lugarNacimiento = user.employee?.lugarNacimiento || 'No disponible';
    (user as any).fechaNacimiento = user.employee?.fechaNacimiento || 'No disponible';

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales no son validas');

    if (!user.activo)
      throw new UnauthorizedException('El usuario está inactivo, hable con un administrador');

    delete user.password;

    // Obtener información extra (Puesto y Tipo de Planilla)
    const extraData = await this.getEmployeeExtraData(user.codEmpleado);
    (user as any).puesto = extraData?.puesto || 'No disponible';
    (user as any).tipoPlanilla = extraData?.tipoPlanilla || 'No disponible';

    return {
      user,
      token: this.getJwtToken({ codEmpleado: user.codEmpleado }),
    };
  }

  async checkAuthStatus(user: User) {
    // Mapeamos el nombre y dirección desde la relación
    (user as any).name = user.employee?.name || 'Usuario';
    (user as any).direccion = user.employee?.direccion || 'No disponible';
    (user as any).lugarNacimiento = user.employee?.lugarNacimiento || 'No disponible';

    // Obtener información extra (Puesto y Tipo de Planilla)
    const extraData = await this.getEmployeeExtraData(user.codEmpleado);
    (user as any).puesto = extraData?.puesto || 'No disponible';
    (user as any).tipoPlanilla = extraData?.tipoPlanilla || 'No disponible';

    return {
      user: user,
      token: this.getJwtToken({ codEmpleado: user.codEmpleado })
    };

  }

  async findAll() {
    const users = await this.userRepository.find({
      relations: { employee: true },
      select: {
        codEmpleado: true,
        email: true,
        rol: true,
        activo: true,
        ultimoAcceso: true,
        fechaCreo: true,
        employee: {
          name: true,
        }
      },
    });

    return users.map(user => ({
      ...user,
      name: user.employee?.name || 'Usuario',
    }));
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { codEmpleado: id },
      relations: { employee: true },
      select: {
        codEmpleado: true,
        email: true,
        rol: true,
        activo: true,
        ultimoAcceso: true,
        fechaCreo: true,
        employee: {
          name: true,
          fechaNacimiento: true,
        }
      },
    });

    if (!user) throw new BadRequestException(`User with id ${id} not found`);

    return {
      ...user,
      name: user.employee?.name || 'Usuario',
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password, ...toUpdate } = updateUserDto;

    const user = await this.userRepository.preload({
      codEmpleado: id,
      ...toUpdate,
    });

    if (!user) throw new BadRequestException(`User with id ${id} not found`);

    if (password) {
      user.password = bcrypt.hashSync(password, 10);
    }

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async changePassword(user: User, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto;

    // Obtener usuario con contraseña de la base de datos
    const userWithPassword = await this.userRepository.findOne({
      where: { codEmpleado: user.codEmpleado },
      select: { codEmpleado: true, password: true } // Necesario porque password tiene select: false en la entidad
    });

    if (!userWithPassword) {
      throw new BadRequestException('Usuario no encontrado');
    }

    // Verificar contraseña actual
    if (!bcrypt.compareSync(currentPassword, userWithPassword.password)) {
      throw new BadRequestException('La contraseña actual es incorrecta');
    }

    // Actualizar contraseña en la BD
    userWithPassword.password = bcrypt.hashSync(newPassword, 10);

    try {
      await this.userRepository.save(userWithPassword);
      return { message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;

  }

  private async getEmployeeExtraData(codEmpleado: number) {
    try {
      const query = `
        SELECT 
            o.NOMBRE AS puesto,
            p.NOMBRE AS tipoPlanilla
        FROM EMPL_EMPLEADO e
        INNER JOIN EMPL_EMPLEADO_EMPR ee ON ee.COD_EMPLEADO = e.COD_EMPLEADO
        INNER JOIN ORG_NIVELES o ON ee.CODIGO_NIVEL = o.CODIGO_NIVEL
        INNER JOIN PLN_PLANTILLA_EMPL pe ON pe.COD_EMPLEADO = e.COD_EMPLEADO
        INNER JOIN PLN_PLANTILLA p ON p.COD_PLANTILLA = pe.COD_PLANTILLA AND p.COD_EMPRESA = pe.COD_EMPRESA
        WHERE e.COD_EMPLEADO = @0 AND ee.COD_STATUS = 1
      `;

      const result = await this.userRepository.query(query, [codEmpleado]);
      return result[0];
    } catch (error) {
      console.error('Error fetching employee extra data:', error);
      return null;
    }
  }

  private handleDBErrors(error: any): never {
    if (error.number === 2627 || error.number === 2601)
      throw new BadRequestException('Ya existe un registro con esos datos (Duplicado)');

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');
  }
}
