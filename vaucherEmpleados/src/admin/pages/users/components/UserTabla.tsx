import { vaucherApi } from "@/api/VaucherAPI";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Badge } from "@/components/ui/badge";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Edit, Key, MoreHorizontal, UserCheck, UserMinus, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@/interfaces/user.interface";

interface Props {
    users: User[];
    setSelectedUser: (user: { codEmpleado: number; name: string } | null) => void;
    setIsPasswordModalOpen: (open: boolean) => void;
}

export const UserTabla = ({ users, setSelectedUser, setIsPasswordModalOpen }: Props) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

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

    return (
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
    )
}
