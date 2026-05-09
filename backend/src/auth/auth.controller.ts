import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetUser, Auth } from './decorators';


import { CreateUserDto, LoginUserDto, UpdateUserDto, ChangePasswordDto } from './dto';
import { User } from './entities/user.entity';

import { ValidRoles } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('register')
  @Auth(ValidRoles.admin) // Solo usuarios autenticados con rol ADMIN pueden entrar
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('users')
  @Auth(ValidRoles.admin)
  findAll() {
    return this.authService.findAll();
  }

  @Get('users/:id')
  @Auth(ValidRoles.admin)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authService.findOne(id);
  }

  @Patch('users/:id')
  @Auth(ValidRoles.admin)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.authService.update(id, updateUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus(user);
  }

  @Patch('change-password')
  @Auth()
  changePassword(
    @GetUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.authService.changePassword(user, changePasswordDto);
  }


  // @Get('private')
  // @UseGuards(AuthGuard())
  // testingPrivateRoute(
  //   @Req() request: Express.Request,
  //   @GetUser() user: User,
  //   @GetUser('email') userEmail: string,

  //   @RawHeaders() rawHeaders: string[],
  //   @Headers() headers: IncomingHttpHeaders,
  // ) {


  //   return {
  //     ok: true,
  //     message: 'Hola Mundo Private',
  //     user,
  //     userEmail,
  //     rawHeaders,
  //     headers
  //   }
  // }


  // @SetMetadata('roles', ['admin','super-user'])

  // @Get('private2')
  // @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // privateRoute2(
  //   @GetUser() user: User
  // ) {

  //   return {
  //     ok: true,
  //     user
  //   }
  // }


  // @Get('private3')
  // @Auth(ValidRoles.admin)
  // privateRoute3(
  //   @GetUser() user: User
  // ) {

  //   return {
  //     ok: true,
  //     user
  //   }
  // }



}
