import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuthStore } from "@/auth/store/auth.store";
import { formatDisplayName } from "@/lib/utils";
import { Link } from "react-router-dom";

import { User as UserIcon, LogOut } from "lucide-react";

export function UserMenu() {
    const { User, logout } = useAuthStore();


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="focus:outline-none ">
                    <Avatar className="cursor-pointer hover:bg-zinc-800">
                        <AvatarFallback>{User?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-80 p-4 bg-white border-2 border-white"
            >
                {/* HEADER */}
                <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                        <AvatarFallback>{User?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>

                    <div>
                        <p className="font-semibold">{formatDisplayName(User?.name)}</p>
                        <p className="text-sm text-black">
                            {User?.email}
                        </p>
                    </div>
                </div>

                {/* ACTIONS */}
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <Link to="/miCuenta" className="flex items-center gap-2 w-full">
                        <UserIcon className="h-4 w-4" />
                        <span>Ver cuenta</span>
                    </Link>
                </DropdownMenuItem>



                <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-700" />
                <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30 flex items-center gap-2"
                    onSelect={() => logout()} // Usa onSelect para mayor compatibilidad
                >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}