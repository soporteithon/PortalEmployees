import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '@/components/SideBar/Sidebar';
import { useAuthStore } from '@/auth/store/auth.store';
import { formatDisplayName } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
    ReceiptText, Wallet, PieChart, Database, FileMinus, TimerIcon,
    ChevronRight, Megaphone, Clock
} from 'lucide-react';

const stats = [
    { label: 'Horas laboradas', value: '44', desc: 'Semana actual', accent: 'bg-red-500' },
    { label: 'Días de vacaciones', value: '02', desc: 'Disponibles', accent: 'bg-red-500' },
    { label: 'Reportes generados', value: '08', desc: 'Este periodo', accent: 'bg-orange-500' },
    { label: 'Horas extra', value: '15', desc: 'Pendientes', accent: 'bg-orange-500' },
];

const menuItems = [
    { to: '/dashboard/nominas', title: 'Mis Recibos', subtitle: 'Consulta tus nóminas', icon: ReceiptText, color: 'bg-red-50 text-red-700' },
    { to: '/dashboard/ingresos', title: 'Mis Ingresos', subtitle: 'Historial de ingresos', icon: Wallet, color: 'bg-green-50 text-green-700' },
    { to: '/dashboard/reportes', title: 'Generar Reportes', subtitle: 'Análisis y estadísticas', icon: PieChart, color: 'bg-blue-50 text-blue-700' },
    { to: '/dashboard/dss', title: 'Módulo de Consulta', subtitle: 'Información detallada', icon: Database, color: 'bg-purple-50 text-purple-700' },
    { to: '/dashboard/horas', title: 'Horas extras', subtitle: 'Gestión y aprobación', icon: TimerIcon, color: 'bg-orange-50 text-orange-700' },
    { to: '/dashboard/descuentos', title: 'Descuentos Cíclicos', subtitle: 'Revisión de deducciones', icon: FileMinus, color: 'bg-indigo-50 text-indigo-700' },
];

const noticias = [
    { id: 1, titulo: "Actualización de Políticas de Vacaciones 2026", fecha: "Hace 2 días", tipo: "RRHH" },
    { id: 2, titulo: "Feriado Nacional del próximo lunes", fecha: "Hace 1 semana", tipo: "Aviso" },
    { id: 3, titulo: "Resultados de la encuesta de clima laboral", fecha: "Hace 2 semanas", tipo: "Corporativo" },
];

export const Inicio = () => {
    const { User: currentUser } = useAuthStore();
    const [search] = useState('');

    const filtered = menuItems.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const fechaActual = new Date().toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="flex min-h-screen bg-gray-50 font-inter">
            <SearchBar />

            <main className="flex-1 p-6 lg:p-8 animate-in fade-in duration-500">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* Header Premium */}
                    <div className="relative rounded-3xl overflow-hidden border border-red-500/20 bg-linear-to-r from-red-950 via-slate-900 to-red-900 shadow-2xl shadow-red-500/10">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        <div className="absolute -top-24 -left-24 w-72 h-72 bg-red-900/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 right-0 w-80 h-80 bg-red-900/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-red-900 via-red-200 to-red-900"></div>

                        <div className="absolute top-6 right-6 hidden md:block">
                            <div className="bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl shadow-lg">
                                <p className="text-white text-sm font-semibold capitalize">
                                    {fechaActual}
                                </p>
                            </div>
                        </div>

                        <div className="relative p-5 md:p-6">


                            <h1 className="text-2xl md:text-4xl font-bold text-white mt-5 mb-3">
                                ¡Bienvenido, {formatDisplayName(currentUser?.name || '')}! 👋
                            </h1>

                            <p className="text-slate-300 text-md max-w-2xl leading-relaxed">
                                Gestiona tu información laboral de forma segura, rápida y eficiente.
                            </p>

                            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md text-white font-medium">
                                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                {currentUser?.puesto || 'Puesto no asignado'}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((s, idx) => {
                            const colors = [
                                'border-blue-200 bg-black-50/30 text-gray-700',
                                'border-emerald-200 bg-black-50/30 text-gray-700',
                                'border-amber-200 bg-black-50/30 text-gray-700',
                                'border-slate-200 bg-black-50/30 text-gray-700'
                            ];
                            return (
                                <div key={s.label} className={`relative bg-white border ${colors[idx]} rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                                    <p className="text-[0.7rem] uppercase tracking-widest font-black opacity-70 mb-3">
                                        {s.label}
                                    </p>
                                    <div className="flex items-baseline gap-1">
                                        <p className="text-4xl font-black tracking-tighter">
                                            {s.value}
                                        </p>
                                    </div>
                                    <p className="text-xs font-bold mt-2 opacity-60 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {s.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>


                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Columna Módulos (Ocupa 2/3) */}
                        <div className="xl:col-span-2 space-y-6">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Database className="w-5 h-5 text-red-700" />
                                Módulos Principales
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filtered.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link key={item.to} to={item.to} className="group h-full">
                                            <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white group-hover:-translate-y-1">
                                                <CardContent className="p-5 flex flex-col items-center text-center gap-4">
                                                    <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                                                        <Icon className="w-7 h-7" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-800 text-base">{item.title}</h3>
                                                        <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Alerta / Tarea pendiente estática */}

                        </div>

                        {/* Columna Avisos de RRHH (Ocupa 1/3) */}
                        <div className="xl:col-span-1">
                            <Card className="h-full border-none shadow-lg bg-white overflow-hidden">
                                <CardHeader className="bg-gray-50/80 border-b border-gray-100 pb-4 pt-6">
                                    <CardTitle className="text-lg flex items-center gap-2 font-bold text-gray-800">
                                        <Megaphone className="w-5 h-5 text-red-700" />
                                        Avisos de RRHH
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-gray-100">
                                        {noticias.map((noticia) => (
                                            <div key={noticia.id} className="p-5 hover:bg-gray-50 transition-colors group cursor-pointer flex gap-4 items-start">
                                                <div className="mt-1.5 w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]"></div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-sm text-gray-800 group-hover:text-red-700 transition-colors leading-snug">
                                                        {noticia.titulo}
                                                    </p>
                                                    <div className="flex justify-between items-center mt-3">
                                                        <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                                                            <Clock className="w-3 h-3" /> {noticia.fecha}
                                                        </span>
                                                        <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-md bg-gray-100 text-gray-500">
                                                            {noticia.tipo}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                                    <Button variant="outline" className="w-full border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white font-bold rounded-xl transition-all duration-300 py-6">
                                        Centro de Noticias <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};