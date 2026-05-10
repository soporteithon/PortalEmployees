import { useState } from 'react';
import { FileText, Download, Loader2, FileCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from '@/lib/api';
import { useAuthStore } from '@/auth/store/auth.store';

export const Reportes = () => {
    const [loading, setLoading] = useState(false);
    const { User: user } = useAuthStore();

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await api.get('/reports/employment-certificate', {
                responseType: 'blob'
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `constancia_laboral_${user?.codEmpleado}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading PDF:', error);
            alert('Error al generar la constancia laboral');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-700">
            <header className="space-y-2">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">Generación de Reportes</h1>
                <p className="text-slate-500 font-medium">Gestiona y descarga tus documentos oficiales de forma inmediata.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden group hover:shadow-2xl transition-all duration-500">
                    <div className="h-2 bg-red-900" />
                    <CardHeader>
                        <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                            <FileText className="w-6 h-6 text-red-900" />
                        </div>
                        <CardTitle className="text-xl font-bold text-slate-800">Constancia Laboral</CardTitle>
                        <CardDescription>Genera tu constancia laboral actualizada con tu salario y puesto vigente.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button 
                            onClick={handleDownload} 
                            disabled={loading}
                            className="w-full bg-slate-900 hover:bg-red-900 text-white font-bold py-6 rounded-2xl transition-all gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Generando...
                                </>
                            ) : (
                                <>
                                    <Download className="w-4 h-4" />
                                    Descargar PDF
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
                
                <Card className="border-none shadow-md bg-slate-50/50 rounded-[2rem] border-dashed border-2 border-slate-200 flex flex-col items-center justify-center p-8 text-center opacity-60">
                    <FileCheck className="w-10 h-10 text-slate-300 mb-4" />
                    <p className="text-slate-400 font-medium">Más reportes próximamente</p>
                </Card>
            </div>
        </div>
    );
};
