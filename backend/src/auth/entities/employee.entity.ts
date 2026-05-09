import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('EMPL_EMPLEADO')
export class Employee {

    @PrimaryColumn({ name: 'COD_EMPLEADO', type: 'int' })
    codEmpleado: number;

    @Column({ name: 'NOMBRE', type: 'varchar', length: 150 })
    name: string;

    @Column({ name: 'DIRECCION', type: 'varchar', length: 150 })
    direccion: string;

    @Column({ name: 'LUGAR_NACIMIENTO', type: 'varchar', length: 150 })
    lugarNacimiento: string;

    @Column({ name: 'FECHA_NACIMIENTO', type: 'date', nullable: true })
    fechaNacimiento?: Date;
}
