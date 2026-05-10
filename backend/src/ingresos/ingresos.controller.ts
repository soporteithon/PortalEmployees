import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IngresosService } from './ingresos.service';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';

@ApiTags('Ingresos')
@Controller('ingresos')
export class IngresosController {
  constructor(private readonly ingresosService: IngresosService) {}

  @Get('historico')
  @Auth() // Protegido con JWT
  getHistorico(@GetUser() user: User) {
    return this.ingresosService.getHistorico(user);
  }
}
