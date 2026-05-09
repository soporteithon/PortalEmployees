import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity('APP_USUARIOS')
export class User {

    @PrimaryColumn({ name: 'COD_EMPLEADO', type: 'int' })
    codEmpleado: number;

    @Column({ name: 'EMAIL', type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({ name: 'PASSWORD_HASH', type: 'varchar', length: 255, select: false })
    password: string;

    @Column({ name: 'ROL', type: 'varchar', length: 20, default: 'USER' })
    rol: string;

    @Column({ name: 'ACTIVO', type: 'bit', default: 1 })
    activo: boolean;

    @Column({ name: 'ULTIMO_ACCESO', type: 'datetime', nullable: true })
    ultimoAcceso: Date;

    @Column({ name: 'FECHA_CREO', type: 'datetime', default: () => 'GETDATE()' })
    fechaCreo: Date;

    @OneToOne(() => Employee)
    @JoinColumn({ name: 'COD_EMPLEADO' })
    employee: Employee;
    static employee: any;



    @BeforeInsert()
    checkFieldsBeforeInsert() {
        if (this.email) {
            this.email = this.email.toLowerCase().trim();
        }
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }

}
