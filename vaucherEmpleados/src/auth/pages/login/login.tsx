import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CustomLogo } from "@/components/custom/CustomLogo"

import type { FormEvent } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"
import { useAuthStore } from "../../store/auth.store";

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();


    const [isPosting, setIsPosting] = useState(false);


    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsPosting(true);
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;




        const isValid = await login(email, password);

        if (isValid) {
            navigate('/dashboard');
            return;

        }


        toast.error("Credenciales no validas");
        setIsPosting(false);

    }


    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={handleLogin}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <CustomLogo />
                                <div className="h-1 w-80 mx-auto mt-6 bg-linear-to-r from-blue-500 via-red-500 to-red-800 rounded-full opacity-80"></div>
                            </div>




                            <div className="grid gap-2">
                                <Label htmlFor="email">Usuario</Label>
                                <Input id="email" type="text" name="email" placeholder="Ingresa tu usuario" required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Ingresa tu contraseña</Label>

                                </div>
                                <Input id="password" type="password" name="password" required placeholder="contraseña" />
                            </div>



                            {/* RECORDAR */}
                            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-red-800 border-gray-300 rounded" />
                                    <span>Recordar sesión</span>
                                </label>

                                <a href="#" className="text-red-800 font-semibold hover:text-red-900 mt-3 sm:mt-0">
                                    Olvidé mi contraseña
                                </a>
                            </div>


                            <Button type="submit" className="w-full bg-red-800 hover:bg-red-700 p-5" disabled={isPosting}>
                                Iniciar Sesión
                            </Button>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">


                            </div>
                            <div className="text-center text-sm">
                                No tienes cuenta?{" "}
                                <a href="mailto:[EMAIL_ADDRESS]" className="underline underline-offset-4">
                                    Contacte a IT
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="/fondoAuth.jpg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                Haciendo click estas de acuerdo con <a href="#">Terminos de Servicio</a> y <a href="#">Politicas de Privacidad</a>.
            </div>
        </div>
    )
}

