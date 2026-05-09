import { useState } from "react";
import { useAuthStore } from '@/auth/store/auth.store';




interface EmpleadoData {
    direccion: string;
    pais: string;
    departamentoProvinicia: string;
    municipio: string;
    departamento: string;
    paisProcedencia: string;
    fechaNacimiento: string;
    permanente: boolean;
    temporal: boolean;
}

const empleado: EmpleadoData = {

    direccion: "Col. Castaños. San Pedro Sula",
    pais: "Honduras",
    departamentoProvinicia: "Cortes",
    municipio: "San Pedro Sula",
    departamento: "Cortés",
    paisProcedencia: "Honduras",
    fechaNacimiento: "22/11/2003",
    permanente: false,
    temporal: true,
};

interface ReadOnlyFieldProps {
    label: string;
    value: string;
    id: string;
}

const ReadOnlyField = ({ label, value, id }: ReadOnlyFieldProps) => (
    <div className="flex flex-col">
        <label htmlFor={id} className="text-gray-700 font-medium mb-1 text-sm">
            {label}
        </label>
        <input
            type="text"
            id={id}
            name={id}
            value={value}
            readOnly
            className="px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg text-gray-600 focus:outline-none text-sm"
        />
    </div>
);

export default function Expedientes() {


    const { User } = useAuthStore();


    const [data] = useState<EmpleadoData>(empleado);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-50 bg-white shadow-xl p-6 border-r border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">
                    Activo
                </h2>
                <img
                    src="../assets/fotoPerfil.jpeg"
                    className="w-25 mx-auto py-5"
                    alt="fotoPerfil"
                />

                <div className="flex items-center py-2 text-xs text-gray-600 space-x-2">
                    <input
                        id="permanente"
                        disabled
                        type="checkbox"
                        checked={data.permanente}
                        readOnly
                        className="w-4 h-4 text-red-800 border-gray-300 rounded focus:ring-red-800 cursor-pointer"
                    />
                    <label
                        htmlFor="permanente"
                        className="cursor-pointer select-none font-medium"
                    >
                        Permanente
                    </label>
                </div>

                <div className="flex items-center text-xs text-gray-600 space-x-2">
                    <input
                        id="temporal"
                        checked={data.temporal}
                        readOnly
                        type="checkbox"
                        className="w-4 h-4 text-red-800 border-gray-300 rounded focus:ring-red-800 cursor-pointer"
                    />
                    <label
                        htmlFor="temporal"
                        className="cursor-pointer select-none font-medium"
                    >
                        Temporal
                    </label>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-6 lg:p-10">
                {/* Header Banner */}
                <div className="mb-8 flex items-center bg-red-800 text-white rounded-lg shadow-lg px-6 py-4 w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <h1 className="text-xl font-semibold text-white">Mi expediente</h1>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Consulta de expediente
                </h2>
                <p className="text-gray-600 mb-8"></p>

                {/* Form Card */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Basic Info */}
                        <ReadOnlyField
                            label="Código empleado"
                            value={`${User?.codEmpleado}`}
                            id="codigo_empleado"
                        />
                        <ReadOnlyField
                            label="Nombre Completo"
                            value={`${User?.name}`}
                            id="nombre_completo"
                        />
                        <ReadOnlyField
                            label="Email"
                            value={`${User?.email}`}
                            id="email"
                        />

                        {/* Datos de Procedencia — full width */}
                        <div className="col-span-1 md:col-span-3 flex flex-col">
                            <h1 className="text-xl text-black font-bold mb-4">
                                Datos de Procedencia
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <ReadOnlyField
                                    label="Direccion"
                                    value={`${User?.direccion}`}
                                    id="direccion"
                                />
                                <ReadOnlyField
                                    label="Lugar de Nacimiento"
                                    value={`${User?.lugarNacimiento}`}
                                    id="lugarNacimiento"
                                />


                                <ReadOnlyField
                                    label="Fecha de Nacimiento"
                                    value={`${User?.fechaNacimiento}`}
                                    id="fechaNacimiento"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
