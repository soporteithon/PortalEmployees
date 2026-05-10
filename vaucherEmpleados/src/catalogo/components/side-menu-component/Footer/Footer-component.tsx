import {
    Building2,
    Mail,
    Phone,
    BookOpen,
    HelpCircle,
    ShieldCheck,
    LifeBuoy,
    FileText,
    RefreshCcw,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const FooterComponent = () => {
    return (
        <footer className="mt-12">
            {/* Footer principal */}
            <Card className="overflow-hidden border-red-100 shadow-xl shadow-red-900/5 rounded-3xl">
                <CardContent className="p-0">
                    {/* Sección superior */}
                    <div className="relative bg-linear-to-br from-white via-red-50/40 to-white px-8 py-12 lg:px-12">
                        {/* Glow decorativo */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-200/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10">
                            {/* Branding */}
                            <div className="lg:col-span-4">
                                <div className="inline-flex items-center gap-3 mb-5">
                                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-red-700 to-red-900 flex items-center justify-center shadow-lg shadow-red-900/20">
                                        <Building2 className="w-6 h-6 text-white" />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Finotex Employee Portal
                                        </h2>
                                        <p className="text-sm text-red-700 font-medium">
                                            Plataforma Corporativa
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm leading-7 text-gray-600 max-w-md">
                                    Accede de forma rápida y segura a tus recibos de pago,
                                    reportes, consultas y toda tu información laboral en un solo
                                    lugar.
                                </p>

                                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 border border-red-100">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs font-semibold text-gray-700">
                                        Sistema operativo y seguro
                                    </span>
                                </div>
                            </div>

                            {/* Recursos */}
                            <div className="lg:col-span-2">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">
                                    Recursos
                                </h3>

                                <ul className="space-y-3">
                                    <FooterLink
                                        icon={BookOpen}
                                        label="Manual de Usuario"
                                    />
                                    <FooterLink
                                        icon={HelpCircle}
                                        label="Preguntas Frecuentes"
                                    />
                                    <FooterLink
                                        icon={ShieldCheck}
                                        label="Política de Privacidad"
                                    />
                                </ul>
                            </div>

                            {/* Soporte */}
                            <div className="lg:col-span-3">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">
                                    Soporte
                                </h3>

                                <ul className="space-y-3">
                                    <FooterLink
                                        icon={LifeBuoy}
                                        label="Centro de Ayuda"
                                    />
                                    <FooterLink
                                        icon={FileText}
                                        label="Contacto de Soporte"
                                    />
                                    <FooterLink
                                        icon={RefreshCcw}
                                        label="Actualizar Información"
                                    />
                                </ul>
                            </div>

                            {/* Contacto */}
                            <div className="lg:col-span-3">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">
                                    Contacto
                                </h3>

                                <div className="space-y-4">
                                    <ContactItem
                                        icon={Mail}
                                        label="Correo"
                                        value="soporteithon@finotex.com"
                                    />

                                    <ContactItem
                                        icon={Phone}
                                        label="Teléfono"
                                        value="+504 9510-4400"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Copyright */}
                    <div className="bg-linear-to-b from-red-900 via-red-800 to-red-900 px-8 py-5">
                        <div className="relative flex items-center justify-center">
                            {/* Texto centrado */}
                            <p className="text-sm text-red-100 text-center">
                                © 2026 FINOTEX. Todos los derechos reservados.
                            </p>

                            {/* Versión alineada al extremo derecho */}
                            <p className="absolute right-0 text-xs uppercase tracking-widest text-red-200/80 font-semibold">
                                Versión 2.0
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </footer>
    );
};

interface FooterLinkProps {
    icon: React.ElementType;
    label: string;
}

const FooterLink = ({ icon: Icon, label }: FooterLinkProps) => (
    <li>
        <button
            className="group flex items-center gap-3 text-sm text-gray-600 hover:text-red-700 transition-colors"
            type="button"
        >
            <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-red-50 group-hover:border-red-100 transition-colors">
                <Icon className="w-4 h-4" />
            </div>
            <span className="font-medium">{label}</span>
        </button>
    </li>
);

interface ContactItemProps {
    icon: React.ElementType;
    label: string;
    value: string;
}

const ContactItem = ({ icon: Icon, label, value }: ContactItemProps) => (
    <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-red-700" />
        </div>

        <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {label}
            </p>
            <p className="text-sm font-semibold text-gray-700 break-all">
                {value}
            </p>
        </div>
    </div>
);