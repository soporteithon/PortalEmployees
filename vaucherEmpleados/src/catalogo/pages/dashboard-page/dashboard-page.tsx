import { Outlet } from "react-router-dom";

// importa tus componentes (ajusta rutas)
import { SideMenuTopBar } from "../../components/side-menu-component/side-menu-topBar/side-menu-topBar";
import { SideMenuFooterText } from "../../components/side-menu-component/side-menu-footerText/side-menu-footerText";
import { SideMenuComponent } from "../../components/side-menu-component/side-menu-component";
import { FooterComponent } from "@/catalogo/components/side-menu-component/Footer/Footer-component";

export const DashboardPage = () => {
    return (
        <>
            {/* NAVBAR */}
            <nav className="bg-linear from-white via-gray-50 to-white shadow border-t-4 border-red-700 font-[Poppins]">

                {/* TOP BAR */}
                <SideMenuTopBar />

                {/* SIDE MENU */}
                <SideMenuComponent />
            </nav>

            {/* FOOTER TEXT (arriba del contenido) */}
            <SideMenuFooterText />

            {/* CONTENIDO DINÁMICO */}
            <div>
                <div className="ml-[10px] px-4 flex-col flex-1 w-full h-full text-slate-500">
                    {/* equivalente a router-outlet */}
                    <Outlet />
                </div>

                {/* FOOTER */}
                <FooterComponent />

            </div>
        </>
    );
};