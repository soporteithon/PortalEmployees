import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { GetUser, Auth } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) { }

  @Get('employment-certificate')
  @Auth()
  async getEmploymentCertificate(
    @Res() res: Response,
    @GetUser() user: User,
  ) {
    const buffer = await this.reportsService.generateEmploymentCertificate(user);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=constancia_laboral_${user.codEmpleado}.pdf`,
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
