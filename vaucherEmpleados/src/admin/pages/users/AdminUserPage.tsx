import { useNavigate, useParams } from "react-router";
import { AdminTitle } from "@/admin/components/adminTitle";
import { ArrowLeft, UserPlus } from "lucide-react";
import { Link } from "react-router";
import { useUser } from "@/admin/hooks/useUsers";
import { RegistrarUser } from "./components/registrarUser";

/**
 * Componente AdminUserPage
 * Maneja tanto la creación como la edición de usuarios (APP_USUARIOS).
 */
export const AdminUserPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const { userQuery } = useUser(Number(id));

    return (
        <div className="max-w-3xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-6">
                <Link to="/admin/users" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <AdminTitle
                    title={isEditMode ? "Editar Usuario" : "Nuevo Usuario"}
                    subtitle={isEditMode ? `Modificando acceso para: ${userQuery.data?.name || '...'}` : "Registra una nueva cuenta de acceso para un empleado"}
                />
            </div>

            <RegistrarUser onSuccess={() => navigate('/admin/users')} />

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
