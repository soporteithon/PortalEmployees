import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    TrendingUp,

    AlertCircle,
    ArrowUpRight,

    PieChart,
    Lock,
    Eye,
    EyeOff
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

import { api } from '@/lib/api';
import type { HistoricoIngresosResponse } from '@/interfaces/ingresos.interface';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchBar } from '@/components/SideBar/Sidebar';
import { HeaderIngresos } from '../components/headerIngresos';

// Formateador de moneda para HNL
const formatHNL = (value: number) => {
    return new Intl.NumberFormat('es-HN', {
        style: 'currency',
        currency: 'HNL',
    }).format(value);
};

export const Ingresos = () => {
    const [showData, setShowData] = useState(false);
    const [showSalary, setShowSalary] = useState(false);

    // Fetch de datos con React Query
    const { data, isLoading, isError, error } = useQuery<HistoricoIngresosResponse>({
        queryKey: ['historico-ingresos'],
        queryFn: async () => {
            const { data } = await api.get('/ingresos/historico');
            return data;
        },
        retry: 1
    });

    if (isLoading) return <IngresosSkeleton />;
    if (isError) return <ErrorState message={(error as any)?.message || 'Error al cargar el historial'} />;

    const historial = data?.historial || [];
    const empleado = data?.empleado;
    const ultimoSalario = historial.length > 0 ? historial[historial.length - 1].salarioMensual : 0;
    const salarioInicial = historial.length > 0 ? historial[0].salarioMensual : 0;
    const incrementoTotal = ultimoSalario - salarioInicial;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-inter">
            <SearchBar />

            <main className="flex-1 p-6 lg:p-10 space-y-8 animate-in fade-in duration-700 relative">

                {/* CAPA DE PRIVACIDAD */}
                {!showData && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-slate-50/20 backdrop-blur-xl rounded-3xl overflow-hidden">
                        <Card className="max-w-md w-full border border-white/20 shadow-2xl rounded-[2.5rem] p-10 text-center space-y-8 bg-white/80">
                            <div className="w-24 h-24 bg-red-100/50 rounded-full flex items-center justify-center mx-auto shadow-inner border border-red-200">
                                <Lock className="w-10 h-10 text-red-700 animate-bounce" />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Información Protegida</h2>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    Tus datos de ingresos son confidenciales. Haz clic para desbloquear la vista.
                                </p>
                            </div>
                            <Button
                                onClick={() => setShowData(true)}
                                className="w-full bg-red-900 hover:bg-red-800 text-white font-bold py-8 rounded-3xl shadow-xl shadow-red-900/20 transition-all hover:scale-[1.03] active:scale-95 text-lg"
                            >
                                <TrendingUp className="w-5 h-5 mr-3" /> Visualizar Información
                            </Button>
                        </Card>
                    </div>
                )}

                <div className={!showData ? 'filter blur-2xl grayscale pointer-events-none transition-all duration-700 scale-95 opacity-50' : 'transition-all duration-700 scale-100 opacity-100'}>
                    {/* Header Corporativo */}
                    <HeaderIngresos empleado={empleado} onHide={() => setShowData(false)} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Tarjeta Salario Actual (Más pequeña y privada) */}
                        <Card className="lg:col-span-1 border-none shadow-lg bg-white rounded-3xl overflow-hidden relative group">
                            <CardHeader className="pb-2 pt-4 px-6 flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ingreso Mensual</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowSalary(!showSalary)}
                                    className="h-8 w-8 p-0 hover:bg-slate-50 text-slate-400"
                                >
                                    {showSalary ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </Button>
                            </CardHeader>
                            <CardContent className="px-6 pb-6 pt-0">
                                <div className="flex flex-col gap-2">
                                    <div className="text-2xl font-black text-slate-900 tracking-tighter">
                                        {showSalary ? formatHNL(ultimoSalario) : "••••••••••"}
                                    </div>
                                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] bg-emerald-50 w-fit px-2 py-0.5 rounded-full">
                                        <ArrowUpRight className="w-3 h-3" />
                                        +{formatHNL(incrementoTotal)}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Gráfica de Evolución */}
                        <Card className="lg:col-span-2 border-none shadow-xl bg-white rounded-[2rem] p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-black text-slate-800 text-xl flex items-center gap-3">
                                    <div className="p-2 bg-red-50 rounded-xl">
                                        <PieChart className="w-5 h-5 text-red-700" />
                                    </div>
                                    Evolución Salarial
                                </h3>
                            </div>
                            <div className="h-[250px] w-full relative">
                                <ResponsiveContainer width="100%" height={250} minWidth={0} debounce={50}>
                                    <AreaChart data={historial}>
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
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}

                                            labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
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
                    </div>

                </div>
            </main>
        </div>
    );
};

const IngresosSkeleton = () => (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
        <div className="w-72 bg-white hidden lg:block border-r" />
        <div className="flex-1 p-6 lg:p-10 space-y-8">
            <Skeleton className="h-56 w-full rounded-[2rem]" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Skeleton className="h-44 rounded-[2rem]" />
                <Skeleton className="h-44 lg:col-span-2 rounded-[2rem]" />
            </div>
        </div>
    </div>
);

const ErrorState = ({ message }: { message: string }) => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-none shadow-2xl rounded-[2.5rem] p-10 text-center space-y-6 bg-white">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Error de Carga</h2>
                <p className="text-slate-500 font-medium leading-relaxed">{message}</p>
            </div>
            <Button onClick={() => window.location.reload()} className="w-full bg-red-900 text-white font-bold py-7 rounded-2xl">
                Reintentar
            </Button>
        </Card>
    </div>
);
