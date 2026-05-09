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
                    <div className="relative rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative p-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            <div className="flex items-start gap-5">


                                <div className="text-black">
                                    <h1 className="text-4xl md:text-3xl font-bold mb-2">
                                        ¡Bienvenido, {formatDisplayName(currentUser?.name || '')}!
                                    </h1>
                                    <p className="text-gray-500 text-lg font-medium">
                                        Este es tu nuevo portal de Finotex
                                    </p>
                                    <p className="text-gray-500 text-lg font-medium">
                                        Aqui encontraras toda tu informacion laboral que necesitas
                                    </p>

                                    <div className="flex flex-wrap gap-4 mt-4">
                                        <span className="px-4 py-1.5 rounded-full text-sm border border-zinc-200 bg-zinc-50 shadow-sm font-medium">
                                            💼 {currentUser?.puesto || 'Puesto no asignado'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">


                                <p className="text-gray-700 text-lg capitalize font-semibold">
                                    {fechaActual}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Originales con diseño mejorado */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((s) => (
                            <div key={s.label} className="relative bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                                <div className={`absolute top-0 left-0 w-1 h-full ${s.accent} rounded-l-xl`} />
                                <p className="text-[0.65rem] uppercase tracking-widest font-bold text-gray-500 mb-2">
                                    {s.label}
                                </p>
                                <p className="text-3xl font-bold text-gray-900 mb-1">
                                    {s.value}
                                </p>
                                <p className="text-xs text-gray-500 font-medium">{s.desc}</p>
                            </div>
                        ))}
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
                                <div className="p-4 border-t border-gray-100 text-center bg-gray-50/50">
                                    <Button variant="ghost" className="w-full text-red-700 hover:text-red-800 hover:bg-red-50 font-semibold gap-1">
                                        Ver todos los avisos <ChevronRight className="w-4 h-4" />
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