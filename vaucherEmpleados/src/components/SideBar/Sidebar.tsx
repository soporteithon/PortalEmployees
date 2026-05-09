import { useState } from "react";
import { Search, Clock, FileCheck, TrendingUp, Download, ShieldCheck } from "lucide-react";

export const SearchBar = () => {
    const [search, setSearch] = useState('');

    const activities = [
        { id: 1, title: 'Recibo generado', time: 'Hoy', icon: FileCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { id: 2, title: 'Horas extra aprobadas', time: 'Ayer', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 3, title: 'Seguridad actualizada', time: 'Hace 2 días', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { id: 4, title: 'Reporte descargado', time: 'Hace 3 días', icon: Download, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <aside className="w-72 bg-white border-r border-gray-100 p-8 hidden lg:flex flex-col shadow-[1px_0_10px_rgba(0,0,0,0.02)] h-screen sticky top-0">
            
            <div className="mb-10">
                <h1 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Búsqueda Inteligente</h1>
                
                {/* SEARCH HUB */}
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar módulo o dato..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 transition-all placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* ACTIVIDAD RECIENTE REVOLUCIONADA */}
            <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-4 h-4 text-red-600" />
                    <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">
                        Actividad reciente
                    </h3>
                </div>

                <div className="space-y-2">
                    {activities.map((act) => {
                        const Icon = act.icon;
                        return (
                            <div key={act.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all group cursor-pointer border border-transparent hover:border-gray-100">
                                <div className={`w-10 h-10 rounded-xl ${act.bg} ${act.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-700 truncate group-hover:text-red-700 transition-colors">
                                        {act.title}
                                    </p>
                                    <span className="text-[10px] font-medium text-gray-400">
                                        {act.time}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer del Sidebar opcional */}
            <div className="mt-auto pt-6 border-t border-gray-50">
                <div className="bg-red-50 rounded-2xl p-4 border border-red-100/50">
                    <p className="text-[10px] font-bold text-red-800 uppercase tracking-tighter mb-1">Estatus del Sistema</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-red-900/70">Conexión Segura Activa</span>
                    </div>
                </div>
            </div>

        </aside>
    )
}