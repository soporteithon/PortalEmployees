import { useState } from "react";
import { NavLink } from "react-router-dom";

export const SideMenuComponent = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="flex items-center justify-between flex-wrap py-3 lg:px-12 px-6 font-roboto">

            {/* MOBILE HEADER */}
            <div className="flex justify-between items-center w-full md:hidden border-b-2 border-gray-200 pb-3">
                <div className="flex items-center shrink-0 ">
                    <img src="/assets/logo.png" alt="LOGO" className="h-20 w-auto object-contain" />
                </div>

                <button
                    onClick={toggleMenu}
                    className="flex items-center px-3 py-2 border-2 rounded text-red-700 border-red-700 hover:bg-red-700 hover:text-white transition"
                >
                    <svg className="fill-current h-5 w-5" viewBox="0 0 20 20">
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>

            {/* MENU */}
            <div
                className={`w-full ${!menuOpen ? "hidden" : ""
                    } md:flex md:items-center md:justify-between md:w-auto md:px-4 px-8 transition-all duration-300`}
            >
                <div className="flex flex-col md:flex-row md:items-center text-md font-semibold text-gray-800 uppercase tracking-wide">

                    {/* INICIO */}
                    <NavLink
                        to="/dashboard/inicio"
                        className={({ isActive }) =>
                            `block mt-3 md:mt-0 px-5 py-2 rounded relative transition
              ${isActive ? "text-red-800" : "text-gray-800"}
              hover:text-red-800 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-red-500 after:transition-all hover:after:w-full`
                        }
                    >
                        Inicio
                    </NavLink>

                    <span className="hidden md:inline text-gray-400">|</span>

                    {/* EXPEDIENTES */}
                    <NavLink
                        to="/dashboard/expedientes"
                        className={({ isActive }) =>
                            `block mt-3 md:mt-0 px-5 py-2 rounded relative transition
                            font-montserrat
                            ${isActive ? "text-red-800" : "text-gray-800"}
                            hover:text-red-950 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-red-700 after:transition-all hover:after:w-full`
                        }
                    >
                        Expedientes
                    </NavLink>

                    <span className="hidden md:inline text-gray-400">|</span>

                    {/* NOMINAS */}
                    <NavLink
                        to="/dashboard/nominas"
                        className={({ isActive }) =>
                            `block mt-3 md:mt-0 px-5 py-2 rounded relative transition
              ${isActive ? "text-red-800" : "text-gray-800"}
              after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-red-700 after:transition-all hover:after:w-full`
                        }
                    >
                        Nóminas
                    </NavLink>

                    <span className="hidden md:inline text-gray-400">|</span>

                    {/* PORTAL */}
                    <NavLink
                        to="/dashboard/portal"
                        className={({ isActive }) =>
                            `block mt-3 md:mt-0 px-5 py-2 rounded relative transition
              ${isActive ? "text-red-800" : "text-gray-800"}
              hover:text-red-950 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-red-700 after:transition-all hover:after:w-full`
                        }
                    >
                        Portal
                    </NavLink>

                </div>
            </div>
        </div>
    );
};