import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class IngresosService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async getHistorico(user: User) {
    try {
      const query = `
        SELECT 
            e.COD_EMPLEADO AS codigo,
            e.NOMBRE AS nombre,
            o.NOMBRE AS puesto,
            sp.ANO AS anio,
            MAX(sp.SUELDO) AS salarioMensual
        FROM EMPL_SUELDOPERIODO sp
        INNER JOIN EMPL_EMPLEADO e 
            ON e.COD_EMPLEADO = sp.COD_EMPLEADO
        INNER JOIN EMPL_EMPLEADO_EMPR ee 
            ON ee.COD_EMPLEADO = e.COD_EMPLEADO
        INNER JOIN ORG_NIVELES o
            ON ee.CODIGO_NIVEL = o.CODIGO_NIVEL
        WHERE 
            ee.COD_STATUS = 1
            AND sp.ANO BETWEEN 2020 AND 2026
            AND e.COD_EMPLEADO = @0
        GROUP BY 
            e.COD_EMPLEADO,
            e.NOMBRE,
            o.NOMBRE,
            sp.ANO
        ORDER BY 
            sp.ANO;
      `;

      const results = await this.dataSource.query(query, [user.codEmpleado]);

      if (results.length === 0) {
        return {
          empleado: {
            codigo: user.codEmpleado.toString(),
            nombre: "Usuario", // Se podría obtener de la entidad si es necesario
            puesto: "No disponible"
          },
          historial: []
        };
      }

      // Formateamos la respuesta como la pidió el usuario
      return {
        empleado: {
          codigo: results[0].codigo,
          nombre: results[0].nombre,
          puesto: results[0].puesto,
        },
        historial: results.map(row => ({
          anio: row.anio,
          salarioMensual: row.salarioMensual,
        }))
      };

    } catch (error) {
      console.error('Error al obtener historial de ingresos:', error);
      throw new InternalServerErrorException('Error al consultar la base de datos');
    }
  }
}
