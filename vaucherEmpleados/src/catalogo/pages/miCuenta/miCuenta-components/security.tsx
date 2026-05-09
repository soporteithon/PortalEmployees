import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { vaucherApi } from "@/api/VaucherAPI";
import { Lock } from "lucide-react";
import { useState } from "react";


export const SecuritySection = () => {


    // Password state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: "", type: "" });

        if (newPassword !== confirmPassword) {
            setMessage({ text: "Las contraseñas no coinciden, intenta de nuevo.", type: "error" });
            return;
        }

        if (newPassword.length < 6) {
            setMessage({ text: "La contraseña debe tener al menos 6 caracteres", type: "error" });
            return;
        }

        try {
            setLoading(true);
            await vaucherApi.patch('/auth/change-password', {
                currentPassword,
                newPassword
            });
            setMessage({ text: "Contraseña actualizada correctamente", type: "success" });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Error al actualizar la contraseña";

            const finalMsg = Array.isArray(errorMsg) ? errorMsg[0] : errorMsg;
            setMessage({ text: finalMsg, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <TabsContent value="seguridad" className="mt-0 outline-none">
            <Card className="border-0 shadow-sm ring-1 ring-zinc-200">
                <form onSubmit={handlePasswordChange}>
                    <CardHeader className="border-b bg-zinc-50/50 pb-6">
                        <CardTitle className="text-xl">Seguridad y Contraseña</CardTitle>
                        <CardDescription>
                            Cambia tu contraseña para mantener tu cuenta segura.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        {message.text && (
                            <div className={`p-3 rounded-md text-sm ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                                {message.text}
                            </div>
                        )}
                        <div className="space-y-2 max-w-md">
                            <Label htmlFor="current-password" className="text-sm font-semibold text-zinc-700">Contraseña Actual</Label>
                            <Input
                                id="current-password"
                                type="password"
                                className="focus-visible:ring-red-800"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="new-password" className="text-sm font-semibold text-zinc-700">Nueva Contraseña</Label>
                                <Input
                                    id="new-password"
                                    type="password"
                                    className="focus-visible:ring-red-800"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required />
                                <p className="text-xs text-muted-foreground">Debe tener al menos 6 caracteres.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password" className="text-sm font-semibold text-zinc-700">Confirmar Nueva Contraseña</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    className="focus-visible:ring-red-800"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end border-t bg-zinc-50/50 p-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="gap-2 bg-red-700 hover:bg-red-800 text-white shadow-sm"
                        >
                            <Lock className="h-4 w-4" />
                            {loading ? "Actualizando..." : "Actualizar Contraseña"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </TabsContent>
    );
}   