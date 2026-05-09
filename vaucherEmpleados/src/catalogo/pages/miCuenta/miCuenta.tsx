import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { SecuritySection } from "./miCuenta-components/security";
import { ProfileSection } from "./miCuenta-components/profile";



export const MiCuenta = () => {

    return (
        <div className="container mx-auto py-10 px-4 max-w-5xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link to="/dashboard">
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight ">Mi Cuenta</h1>
                    <p className="text-muted-foreground ">Administra tu información personal y preferencias de seguridad.</p>
                </div>
            </div>

            <Tabs defaultValue="perfil" className="w-full space-y-6">
                {/* Menú de pestañas horizontal */}
                <TabsList className="grid w-full grid-cols-2 h-14 bg-zinc-100/50 p-1">
                    <TabsTrigger
                        value="perfil"
                        className="flex items-center justify-center gap-2 h-full text-sm data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:shadow-sm rounded-md transition-all"
                    >
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">Perfil Personal</span>
                        <span className="sm:hidden">Perfil</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="seguridad"
                        className="flex items-center justify-center gap-2 h-full text-sm data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:shadow-sm rounded-md transition-all"
                    >
                        <Lock className="h-4 w-4" />
                        <span className="hidden sm:inline">Seguridad</span>
                        <span className="sm:hidden">Seguridad</span>
                    </TabsTrigger>
                </TabsList>

                {/* Contenido de las pestañas */}
                <div className="w-full">
                    <ProfileSection />
                    <SecuritySection />
                </div>
            </Tabs>


        </div>



    );

};