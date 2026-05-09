import { Button } from "@/components/ui/button";
import { useAuthStore } from '@/auth/store/auth.store';
import { Link } from "react-router";
import { formatDisplayName } from "@/lib/utils";
import { UserMenu } from "../popover/popover-component";

export const SideMenuTopBar = () => {
    const { isAdmin, User } = useAuthStore();

    return (
        <div className="flex justify-between items-start px-6 py-2 border-b border-gray-200 text-sm text-gray-700">

            {/* LOGO */}
            <div className="hidden md:flex items-start">
                <img
                    src="/public/logo.png"
                    alt="LOGO"
                    className="h-24 w-auto object-contain"
                />
            </div>



            {/* USER INFO */}
            <div className="flex items-start space-x-4 mt-1 text-[10px]">






                <Button variant="link" className="hover:text-blue-700 font-medium transition">
                    👋 Bienvenido,   <span className="font-bold">
                        {formatDisplayName(User?.name)}
                    </span>
                </Button>

                {isAdmin() && (
                    <Link to="/admin">
                        <Button className="bg-red-600 text-white  px-4 py-2 hover:bg-red-700 transition cursor-pointer">
                            Admin
                        </Button>
                    </Link>
                )}

                <UserMenu />

            </div>
        </div >
    );
};