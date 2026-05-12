import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { vaucherApi } from "@/api/VaucherAPI";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface RegistrarUserProps {
    onSuccess?: () => void;
}

export const RegistrarUser = ({ onSuccess }: RegistrarUserProps) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(isEditMode);

    const [formData, setFormData] = useState({
        codEmpleado: '',
        email: '',
        password: '',
        rol: 'USER'
    });

    // Cargar datos si estamos en modo edición
    useEffect(() => {
        if (isEditMode) {
            const fetchUser = async () => {
                try {
                    const { data } = await vaucherApi.get(`/auth/users/${id}`);
                    setFormData({
                        codEmpleado: data.codEmpleado.toString(),
                        email: data.email,
                        password: '', // No mostramos el password actual
                        rol: data.rol
                    });
                } catch (error) {
                    toast.error("Error al cargar los datos del usuario");
                    navigate('/admin/users');
                } finally {
                    setFetchingData(false);
                }
            };
            fetchUser();
        }
    }, [id, isEditMode, navigate]);

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
            // Aseguramos que codEmpleado sea número
            const submissionData = {
                ...formData,
                codEmpleado: Number(formData.codEmpleado)
            };

            if (isEditMode) {
                // Modo Edición: PATCH
                const { codEmpleado, ...updateData } = submissionData;
                // Solo enviamos password si el administrador escribió algo
                if (!updateData.password) delete (updateData as any).password;

                await vaucherApi.patch(`/auth/users/${id}`, updateData);
                toast.success("Información actualizada correctamente");
            } else {
                // Modo Creación: POST
                await vaucherApi.post('/auth/register', submissionData);
                toast.success("Usuario creado exitosamente");
            }

            if (onSuccess) {
                onSuccess();
            } else {
                navigate('/admin/users');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || "Error al procesar la solicitud";
            toast.error(Array.isArray(message) ? message[0] : message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (fetchingData) {
        return (
            <div className="flex justify-center p-8">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
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
                            disabled={isEditMode}
                            className={isEditMode ? "bg-gray-50 text-gray-500" : ""}
                        />
                        {!isEditMode && <p className="text-xs text-gray-500">Debe coincidir con un código de Empleado </p>}
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
                        className="bg-red-800 hover:bg-red-900 cursor-pointer text-white min-w-[140px]"
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
    );
};
