import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { useAuthStore } from "@/auth/store/auth.store";
import { Button } from "@/components/ui/button";

export const ProfileSection = () => {
    const { User: currentUser } = useAuthStore();

    return (
        <TabsContent value="perfil" className="mt-0 outline-none">
            <Card className="border-0 shadow-sm ring-1 ring-zinc-200">
                <CardHeader className="border-b bg-zinc-50/50 pb-6">
                    <CardTitle className="text-xl">Información Personal</CardTitle>
                    <CardDescription>
                        Visualiza tu informacion personal
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 pt-6">
                    {/* Sección de Avatar */}
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                            <AvatarFallback className="text-3xl = from-blue-100 to-blue-200 text-blue-800 font-semibold">
                                {currentUser?.name?.substring(0, 2).toUpperCase() || 'US'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <h3 className="font-medium text-lg">Foto de Perfil</h3>
                            <p className="text-sm text-muted-foreground">Sube una nueva foto de perfil (JPG, PNG).</p>
                            <div className="flex gap-3 pt-1">
                                <Button variant="outline" size="sm" className="font-medium">Cambiar foto</Button>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 font-medium">Eliminar</Button>
                            </div>
                        </div>
                    </div>

                    {/* Formulario de datos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold text-zinc-700">Nombre Completo</Label>
                            <Input id="name" defaultValue={currentUser?.name} readOnly className="bg-zinc-50 border-zinc-200 text-zinc-500 focus-visible:ring-0" />
                            <p className="text-xs text-muted-foreground">Tu nombre legal está administrado por RRHH.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold text-zinc-700">Correo Electrónico de Empresa</Label>
                            <Input id="email" defaultValue={currentUser?.email} readOnly className="bg-zinc-50 border-zinc-200 text-zinc-500 focus-visible:ring-0" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="puesto" className="text-sm font-semibold text-zinc-700">Puesto de Empleo</Label>
                            <Input id="puesto" defaultValue={currentUser?.puesto} readOnly className="bg-zinc-50 border-zinc-200 text-zinc-500 focus-visible:ring-0" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tipoPlanilla" className="text-sm font-semibold text-zinc-700">Tipo de Planilla</Label>
                            <Input id="tipoPlanilla" defaultValue={currentUser?.tipoPlanilla} readOnly className="bg-zinc-50 border-zinc-200 text-zinc-500 focus-visible:ring-0" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
};
