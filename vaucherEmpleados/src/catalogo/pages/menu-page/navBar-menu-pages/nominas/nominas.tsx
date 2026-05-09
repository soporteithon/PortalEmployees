import { SearchBar } from '@/components/SideBar/Sidebar';
import { useState } from 'react';
import { useAuthStore } from '@/auth/store/auth.store';

const periodos = [
    { value: 'p1', label: '16/09/2025 al 30/09/2025' },
    { value: 'p2', label: '01/09/2025 al 15/09/2025' },
];

export const Nominas = () => {
    const { User: currentUser } = useAuthStore();
    const [search, setSearch] = useState('');
    const [periodo, setPeriodo] = useState('');

    const handleVer = () => {
        if (!periodo) return alert('Selecciona un período');
        // Tu lógica para ver el recibo
        console.log('Ver período:', periodo);
    };

    const handleImprimir = () => {
        if (!periodo) return alert('Selecciona un período');
        // Tu lógica para imprimir
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">

            {/* Sidebar */}
            <SearchBar />
            {/* Contenido principal */}
            <div className="flex-1 flex flex-col p-6 lg:p-10">

                {/* Búsqueda móvil */}
                <div className="block lg:hidden mb-4 relative">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pr-10 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-700"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                        </svg>
                    </span>
                </div>

                {/* Header */}
                <div className="mb-8 flex items-center bg-red-800 text-white rounded-lg shadow-lg px-6 py-4 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h1 className="text-xl font-semibold text-white">Mis recibos de pago</h1>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Consulta de Pagos y Planilla</h2>
                <p className="text-gray-600 mb-8">
                    Selecciona el tipo de planilla y el periodo deseado para visualizar tus ingresos.
                </p>

                {/* Formulario */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Puesto de empleo (deshabilitado) */}
                        <div className="flex flex-col">
                            <label htmlFor="empleo" className="text-gray-700 font-medium mb-1">
                                Puesto de Empleo
                            </label>
                            <select
                                id="empleo"
                                name="empleo"
                                disabled
                                className="px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            >
                                <option value="">{currentUser?.puesto || 'Cargando puesto...'}</option>
                            </select>
                        </div>

                        {/* Tipo de planilla (deshabilitado) */}
                        <div className="flex flex-col">
                            <label htmlFor="planilla" className="text-gray-700 font-medium mb-1">
                                Tipo de Planilla
                            </label>
                            <select
                                id="planilla"
                                name="planilla"
                                disabled
                                className="px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            >
                                <option value="">{currentUser?.tipoPlanilla || 'Cargando planilla...'}</option>
                            </select>
                        </div>

                        {/* Período (activo) */}
                        <div className="flex flex-col">
                            <label htmlFor="periodo" className="text-gray-700 font-medium mb-1">
                                Seleccionar Período
                            </label>
                            <select
                                id="periodo"
                                name="periodo"
                                value={periodo}
                                onChange={(e) => setPeriodo(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition duration-150"
                            >
                                <option value="" disabled>Seleccione un periodo...</option>
                                {periodos.map((p) => (
                                    <option key={p.value} value={p.value}>{p.label}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    {/* Botones */}
                    <div className="mt-8 pt-4 flex justify-end gap-4">
                        <button
                            onClick={handleVer}
                            className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition duration-150 shadow-md"
                        >
                            Ver
                        </button>
                        <button
                            onClick={handleImprimir}
                            className="bg-red-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-900 transition duration-150 shadow-md"
                        >
                            Imprimir
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

