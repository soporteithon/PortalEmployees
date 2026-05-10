import { PieChart, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import type { HistoricoIngreso } from '@/interfaces/ingresos.interface';

interface GraficaIngresosProps {
    historial?: HistoricoIngreso[];
}

export const GraficaIngresos = ({ historial }: GraficaIngresosProps) => {
    // Validación defensiva
    const data = Array.isArray(historial) ? historial : [];

    if (data.length === 0) {
        return (
            <Card className="lg:col-span-2 border-none shadow-xl bg-white rounded-[2rem] p-8 flex flex-col items-center justify-center min-h-[350px]">
                <div className="p-4 bg-red-50 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Sin datos de evolución</h3>
                <p className="text-slate-500 text-sm">No se encontraron registros de ingresos para el período seleccionado.</p>
            </Card>
        );
    }

    return (
        <Card className="lg:col-span-2 border-none shadow-xl bg-white rounded-[2rem] p-8">
            <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-slate-800 text-xl flex items-center gap-3">
                    <div className="p-2 bg-red-50 rounded-xl">
                        <PieChart className="w-5 h-5 text-red-700" />
                    </div>
                    Evolución Salarial
                </h3>
            </div>
            
            <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height={300} minWidth={0} minHeight={0} debounce={50}>
                    <AreaChart 
                        data={data} 
                        margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                    >
                        <defs>
                            <linearGradient id="colorSalario" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#991b1b" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#991b1b" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="anio"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                            tickFormatter={(value) => `L ${value}`}
                            width={80}
                        />
                        <Tooltip
                            contentStyle={{ 
                                borderRadius: '16px', 
                                border: 'none', 
                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                padding: '12px'
                            }}
                            labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                            itemStyle={{ color: '#991b1b', fontWeight: 'bold' }}
                            formatter={(value: any) => [`L ${Number(value).toLocaleString()}`, 'Salario']}
                        />
                        <Area
                            type="monotone"
                            dataKey="salarioMensual"
                            stroke="#991b1b"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorSalario)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};