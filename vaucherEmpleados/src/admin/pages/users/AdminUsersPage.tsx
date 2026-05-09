import { useState } from "react"
import { AdminTitle } from "@/admin/components/adminTitle"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Link, useNavigate } from "react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useUsers } from "@/admin/hooks/useUsers"
import { vaucherApi } from "@/api/VaucherAPI"
import {
    Loader2,
    PlusIcon,
    MoreHorizontal,
    Edit,
    Key,
    UserMinus,
    UserCheck,
    History,
    Lock
} from "lucide-react"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export const AdminUsersPage = () => {
    const { usersQuery } = useUsers();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
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

    const handleToggleStatus = (codEmpleado: number, currentStatus: boolean) => {
        const action = currentStatus ? 'desactivando' : 'activando';

        toast.promise(
            vaucherApi.patch(`/auth/users/${codEmpleado}`, { activo: !currentStatus }),
            {
                loading: `${action.charAt(0).toUpperCase() + action.slice(1)} acceso para el usuario #${codEmpleado}...`,
                success: () => {
                    queryClient.invalidateQueries({ queryKey: ['users'] });
                    return `Usuario ${currentStatus ? 'desactivado' : 'activado'} correctamente`;
                },
                error: 'No se pudo cambiar el estado del usuario',
            }
        );
    };

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

            <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <Table>
                    <TableCaption className="pb-4 text-gray-400 text-xs">Información extraída de la tabla APP_USUARIOS.</TableCaption>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-20 text-center font-bold text-gray-500 text-xs uppercase tracking-wider">ID</TableHead>
                            <TableHead className="font-bold text-gray-500 text-xs uppercase tracking-wider">Nombre del Empleado</TableHead>
                            <TableHead className="font-bold text-gray-500 text-xs uppercase tracking-wider">Email Corporativo</TableHead>
                            <TableHead className="text-center font-bold text-gray-500 text-xs uppercase tracking-wider">Rol</TableHead>
                            <TableHead className="text-center font-bold text-gray-500 text-xs uppercase tracking-wider">Estado</TableHead>
                            <TableHead className="text-center font-bold text-gray-500 text-xs uppercase tracking-wider">Último Acceso</TableHead>
                            <TableHead className="text-right font-bold text-gray-500 text-xs uppercase tracking-wider pr-6">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.codEmpleado} className="hover:bg-blue-50/30 transition-colors group">
                                <TableCell className="text-center font-mono text-xs text-gray-400 group-hover:text-blue-600 transition-colors">
                                    #{user.codEmpleado}
                                </TableCell>
                                <TableCell className="font-semibold text-gray-900">
                                    {user.name}
                                </TableCell>
                                <TableCell className="text-gray-600 text-sm">
                                    {user.email}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={user.rol === 'ADMIN' ? 'warning' : 'info'} className="font-bold">
                                        {user.rol}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={user.activo ? 'success' : 'secondary'} className="gap-1.5 py-1">
                                        <span className={`w-1.5 h-1.5 rounded-full ${user.activo ? 'bg-emerald-500' : 'bg-red-700'}`} />
                                        {user.activo ? 'Activo' : 'Inactivo'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center text-xs text-gray-400">
                                    {user.ultimoAcceso ? new Date(user.ultimoAcceso).toLocaleString() : 'Nunca'}
                                </TableCell>
                                <TableCell className="text-right pr-6">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-100 text-gray-500 hover:text-blue-600 transition-colors">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <DropdownMenuLabel className="text-xs text-gray-400 uppercase">Opciones de Usuario</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => navigate(`/admin/users/${user.codEmpleado}`)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Editar Información
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => {
                                                setSelectedUser({ codEmpleado: user.codEmpleado, name: user.name });
                                                setIsPasswordModalOpen(true);
                                            }}>
                                                <Key className="mr-2 h-4 w-4" />
                                                Cambiar Contraseña
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => toast.info("Ver historial de actividad...")}>
                                                <History className="mr-2 h-4 w-4" />
                                                Ver Actividad
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className={user.activo ? "text-red-600 focus:bg-red-50 focus:text-red-600" : "text-emerald-600 focus:bg-emerald-50 focus:text-emerald-600"}
                                                onClick={() => handleToggleStatus(user.codEmpleado, user.activo)}
                                            >
                                                {user.activo ? (
                                                    <>
                                                        <UserMinus className="mr-2 h-4 w-4" />
                                                        Desactivar Acceso
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserCheck className="mr-2 h-4 w-4" />
                                                        Activar Acceso
                                                    </>
                                                )}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

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
