export interface User {
    codEmpleado: number;
    email: string;
    activo: boolean; // Cambiado de isActive a activo
    rol: string;     // Cambiado de roles[] a rol
    name: string;
    direccion: string;
    lugarNacimiento: string;
    puesto?: string;
    tipoPlanilla?: string;

    ultimoAcceso?: string;
    fechaCreo?: string;
    fechaNacimiento?: Date;
}
