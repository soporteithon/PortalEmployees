import { useState } from "react"
import { AdminTitle } from "@/admin/components/adminTitle"
import { Link } from "react-router"
import { useUsers } from "@/admin/hooks/useUsers"
import { vaucherApi } from "@/api/VaucherAPI"
import {
    Loader2,
    PlusIcon,
    Lock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { UserTabla } from "./components/UserTabla"

export const AdminUsersPage = () => {
    const { usersQuery } = useUsers();
    const [selectedUser, setSelectedUser] = useState<{ codEmpleado: number; name: string } | null>(null);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    if (usersQuery.isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                <p className="text-gray-500 font-medium">Cargando usuarios...</p>
            </div>
        )
    }

    if (usersQuery.isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="bg-red-50 p-6 rounded-xl border border-red-100 text-center">
                    <p className="text-red-600 font-semibold mb-2">Error al cargar usuarios</p>
                    <p className="text-red-500 text-sm">Por favor, intenta de nuevo más tarde.</p>
                </div>
            </div>
        )
    }

    const users = usersQuery.data || [];

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser || !newPassword) return;

        setIsUpdatingPassword(true);
        try {
            await vaucherApi.patch(`/auth/users/${selectedUser.codEmpleado}`, { password: newPassword });
            toast.success(`Contraseña actualizada para ${selectedUser.name}`);
            setIsPasswordModalOpen(false);
            setNewPassword('');
        } catch (error: any) {
            const message = error.response?.data?.message || "Error al actualizar contraseña";
            toast.error(Array.isArray(message) ? message[0] : message);
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 animate-in fade-in duration-500">
            <AdminTitle
                title="Gestión de Usuarios"
                subtitle={`Administra los ${users.length} usuarios registrados en el sistema`}
            />

            <div className="flex justify-end mb-10 gap-4">
                <Link to="/admin/users/new">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Nuevo Usuario
                    </Button>
                </Link>
            </div>

            <UserTabla
                users={users}
                setSelectedUser={setSelectedUser}
                setIsPasswordModalOpen={setIsPasswordModalOpen}
            />

            <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Lock className="w-5 h-5 text-blue-600" />
                            Cambiar Contraseña
                        </DialogTitle>
                        <DialogDescription>
                            Establece una nueva contraseña para <strong>{selectedUser?.name}</strong>.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handlePasswordReset}>
                        <div className="py-4 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    autoFocus
                                />
                                <p className="text-xs text-gray-500">Mínimo 6 caracteres, mayúscula, minúscula y número.</p>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsPasswordModalOpen(false)}
                                disabled={isUpdatingPassword}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={isUpdatingPassword}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {isUpdatingPassword ? 'Actualizando...' : 'Guardar Nueva Contraseña'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

