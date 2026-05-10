import {
    TrendingUp,
    User,
    Briefcase,
    Download,
    Lock,
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import type { EmpleadoInfo } from '@/interfaces/ingresos.interface';

interface HeaderIngresosProps {
    empleado?: EmpleadoInfo;
    onHide: () => void;
}

export const HeaderIngresos = ({ empleado, onHide }: HeaderIngresosProps) => {
    return (
        <header className="relative rounded-[2rem] overflow-hidden bg-linear-to-br from-red-950 via-red-900 to-slate-900 p-8 shadow-2xl mb-8">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-red-200 text-xs font-bold tracking-widest uppercase">
                        <TrendingUp className="w-3 h-3" /> Historial de Ingresos
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                        Mis ingresos mensual
                    </h1>
                    <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-2 text-white text-sm font-medium">
                            <Briefcase className="w-4 h-4" /> {empleado?.puesto || 'Cargando...'}
                        </span>
                        <span className="flex items-center gap-2 text-white text-sm font-medium border-l border-white/20 pl-3">
                            <User className="w-4 h-4" /> COD: {empleado?.codigo || '---'}
                        </span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button className="bg-white text-red-900 hover:bg-red-50 font-bold px-6 py-6 rounded-2xl shadow-xl transition-all">
                        <Download className="w-4 h-4 mr-2" /> PDF
                    </Button>
                    <Button
                        variant="outline"
                        onClick={onHide}
                        className="bg-transparent border-white/20 text-white hover:bg-white/10 font-bold px-6 py-6 rounded-2xl transition-all"
                    >
                        <Lock className="w-4 h-4 mr-2" /> Ocultar
                    </Button>
                </div>
            </div>
        </header>
    );
}