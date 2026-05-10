export interface HistoricoIngreso {
    anio: number;
    salarioMensual: number;
}

export interface EmpleadoInfo {
    codigo: string;
    nombre: string;
    puesto: string;
}

export interface HistoricoIngresosResponse {
    empleado: EmpleadoInfo;
    historial: HistoricoIngreso[];
}
