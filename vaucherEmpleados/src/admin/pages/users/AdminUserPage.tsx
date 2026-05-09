import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AdminTitle } from "@/admin/components/adminTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { vaucherApi } from "@/api/VaucherAPI";
import { toast } from "sonner";
import { ArrowLeft, Save, UserPlus, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { useUser } from "@/admin/hooks/useUsers";

/**
 * Componente AdminUserPage
 * Maneja tanto la creación como la edición de usuarios (APP_USUARIOS).
 */
export const AdminUserPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Detecta si hay un ID en la URL
    const isEditMode = !!id;

    // Hook para obtener datos si estamos editando
    const { userQuery } = useUser(Number(id));

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        codEmpleado: '',
        email: '',
        password: '',
        rol: 'USER'
    });

    // Efecto para cargar los datos del usuario cuando termina el fetch
    useEffect(() => {
        if (isEditMode && userQuery.data) {
            setFormData({
                codEmpleado: userQuery.data.codEmpleado.toString(),
                email: userQuery.data.email,
                password: '', // La contraseña no se muestra por seguridad
                rol: userQuery.data.rol
            });
        }
    }, [isEditMode, userQuery.data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'codEmpleado' ? (value === '' ? '' : Number(value)) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validaciones básicas
        if (!formData.codEmpleado || !formData.email) {
            toast.error("Por favor completa los campos obligatorios");
            return;
        }

        if (!isEditMode && !formData.password) {
            toast.error("La contraseña es obligatoria para nuevos usuarios");
            return;
        }

        setLoading(true);
        try {
            if (isEditMode) {
                // Modo Edición: PATCH
                const { codEmpleado, ...updateData } = formData;
                // Solo enviamos password si el administrador escribió algo
                if (!updateData.password) delete (updateData as any).password;

                await vaucherApi.patch(`/auth/users/${id}`, updateData);
                toast.success("Información actualizada correctamente");
            } else {
                // Modo Creación: POST
                await vaucherApi.post('/auth/register', formData);
                toast.success("Usuario creado exitosamente");
            }
            navigate('/admin/users');
        } catch (error: any) {
            const message = error.response?.data?.message || "Error al procesar la solicitud";
            toast.error(Array.isArray(message) ? message[0] : message);
        } finally {
            setLoading(false);
        }
    };

    // Estado de carga inicial si estamos en modo edición
    if (isEditMode && userQuery.isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                <p className="text-gray-500 font-medium">Cargando datos del usuario...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-6">
                <Link to="/admin/users" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <AdminTitle
                    title={isEditMode ? "Editar Usuario" : "Nuevo Usuario"}
                    subtitle={isEditMode ? `Modificando acceso para: ${userQuery.data?.name}` : "Registra una nueva cuenta de acceso para un empleado"}
                />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="codEmpleado">Código de Empleado *</Label>
                            <Input
                                id="codEmpleado"
                                name="codEmpleado"
                                type="number"
                                placeholder="Ej: 1025"
                                value={formData.codEmpleado}
                                onChange={handleChange}
                                required
                                disabled={isEditMode} // No se permite cambiar el código de empleado en edición
                                className={isEditMode ? "bg-gray-50 text-gray-500" : ""}
                            />
                            {!isEditMode && <p className="text-xs text-gray-500">Debe coincidir con un código de la tabla EMPL_EMPLEADO</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rol">Rol del Sistema</Label>
                            <select
                                id="rol"
                                name="rol"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.rol}
                                onChange={handleChange}
                            >
                                <option value="USER">Usuario (Empleado)</option>
                                <option value="ADMIN">Administrador</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico *</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="usuario@empresa.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">
                            {isEditMode ? "Nueva Contraseña (dejar en blanco para no cambiar)" : "Contraseña Temporal *"}
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required={!isEditMode}
                        />
                        <p className="text-xs text-gray-500">Mínimo 6 caracteres, debe incluir mayúscula, minúscula y un número.</p>
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate('/admin/users')}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px]"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    {isEditMode ? 'Actualizando...' : 'Guardando...'}
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Save className="w-4 h-4" />
                                    {isEditMode ? 'Guardar Cambios' : 'Crear Usuario'}
                                </span>
                            )}
                        </Button>
                    </div>
                </form>
            </div>


            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6 flex gap-4">
                <div className="bg-blue-100 p-2 rounded-lg h-fit">
                    <UserPlus className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Nota importante</h4>
                    <p className="text-sm text-blue-800 leading-relaxed">
                        Asegúrate de que el Código de Empleado exista previamente en el sistema de Recursos Humanos.
                        El usuario podrá cambiar su contraseña una vez que inicie sesión por primera vez.
                    </p>
                </div>
            </div>
        </div>
    );
};
