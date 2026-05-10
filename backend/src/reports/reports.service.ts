import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger('ReportsService');

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) { }

  async generateEmploymentCertificate(user: User): Promise<Buffer> {
    // Consulta refinada basada en lo que sabemos del esquema
    const query = `
      SELECT 
          e.NOMBRE AS nombre,
          o.NOMBRE AS puesto,
          ee.FECHA_INGRESO AS fechaIngreso,
          ee.NO_DOCUMENTO AS numeroIdentidad,
          (SELECT MAX(SUELDO) FROM EMPL_SUELDOPERIODO WHERE COD_EMPLEADO = e.COD_EMPLEADO AND ANO = (SELECT MAX(ANO) FROM EMPL_SUELDOPERIODO WHERE COD_EMPLEADO = e.COD_EMPLEADO)) AS salario
      FROM EMPL_EMPLEADO e
      INNER JOIN EMPL_EMPLEADO_EMPR ee ON ee.COD_EMPLEADO = e.COD_EMPLEADO
      INNER JOIN ORG_NIVELES o ON ee.CODIGO_NIVEL = o.CODIGO_NIVEL
      WHERE e.COD_EMPLEADO = @0 AND ee.COD_STATUS = 1;
    `;

    try {
      this.logger.log(`Generando constancia para empleado: ${user.codEmpleado}`);
      const results = await this.dataSource.query(query, [user.codEmpleado]);

      if (!results || results.length === 0) {
        this.logger.error(`No se encontró información para el empleado ${user.codEmpleado}`);
        throw new Error('Empleado no encontrado o inactivo en la base de datos');
      }

      const data = results[0];
      this.logger.log(`Datos obtenidos: ${JSON.stringify(data)}`);

      return await this.createPdf(data, user.codEmpleado);
    } catch (error) {
      this.logger.error('Error detallado:', error.message);
      throw new InternalServerErrorException(error.message || 'Error al generar la constancia laboral');
    }
  }

  private createPdf(data: any, codEmpleado: number): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          margin: 50,
          size: 'LETTER',
        });

        const chunks: any[] = [];

        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', (err) => reject(err));

        // =========================================================
        // FECHAS
        // =========================================================
        const today = new Date();

        const dia = today.getDate();
        const mesRaw = today.toLocaleString('es-HN', { month: 'long' });
        const mes = mesRaw.charAt(0).toUpperCase() + mesRaw.slice(1);
        const anio = today.getFullYear();

        // Formato legal: "al primer día" o "a los X días"
        const diaTexto = dia === 1 ? 'al primer día' : `a los ${dia} días`;
        const fechaLegal = `${diaTexto} del mes de ${mes} de ${anio}`;

        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };

        const hireDate = data.fechaIngreso
          ? new Date(data.fechaIngreso)
          : new Date();

        const hireDateString = hireDate.toLocaleDateString('es-HN', options);

        // =========================================================
        // TÍTULO
        // =========================================================
        doc
          .fillColor('#1e293b')
          .font('Helvetica-Bold')
          .fontSize(22)
          .text('CONSTANCIA LABORAL', {
            align: 'center',
            underline: true,
          })
          .moveDown(2);

        // Configuración base
        doc
          .font('Helvetica')
          .fontSize(12)
          .fillColor('#000000');

        // =========================================================
        // PÁRRAFO PRINCIPAL CON NEGRITAS
        // =========================================================
        doc.text('Por este medio ', {
          align: 'justify',
          lineGap: 6,
          continued: true,
        });

        doc
          .font('Helvetica-Bold')
          .text('Finos Textiles de Centro America S.A', {
            continued: true,
          });

        doc
          .font('Helvetica')
          .text(' hace constar que ', {
            continued: true,
          });

        doc
          .font('Helvetica-Bold')
          .text(data.nombre || '---', {
            continued: true,
          });

        doc
          .font('Helvetica')
          .text(', con número de identidad ', {
            continued: true,
          });

        doc
          .font('Helvetica-Bold')
          .text(data.numeroIdentidad || '---', {
            continued: true,
          });

        doc
          .font('Helvetica')
          .text(
            `, labora en nuestra institución desempeñando el cargo de ${data.puesto || 'Colaborador'
            }, desde el ${hireDateString} hasta la fecha actual.`,
            {
              align: 'justify',
              lineGap: 6,
            },
          )
          .moveDown();

        // =========================================================
        // SALARIO
        // =========================================================
        const salario = Number(data.salario || 0).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        doc
          .font('Helvetica')
          .text(`Percibiendo un salario mensual bruto de L. ${salario}.`, {
            align: 'justify',
            lineGap: 6,
          })
          .moveDown(2);

        // =========================================================
        // FECHA DE EMISIÓN
        // =========================================================
        doc
          .font('Helvetica')
          .text(
            `Para los fines que al interesado convenga se extiende la presente en la ciudad de Choloma, Cortés, ${fechaLegal}.`,
            {
              align: 'justify',
              lineGap: 6,
            },
          )
          .moveDown(5);

        // =========================================================
        // FIRMA
        // =========================================================
        doc.text('Atentamente,', {
          align: 'left',
        });

        doc.moveDown(3);

        const firmaWidth = 250;

        // Línea de firma y textos centrados
        doc

          .font('Helvetica-Bold')
          .fontSize(11)
          .text('Ing. Laura Midence', {
            width: firmaWidth,
            align: 'left',
          })
          .fontSize(10)
          .text('Gerencia de Recursos Humanos', {
            width: firmaWidth,
            align: 'left',
          });

        // Restaurar fuente base
        doc
          .font('Helvetica')
          .fontSize(12);

        // Finalizar documento
        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  }
}
