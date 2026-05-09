

export const FooterComponent = () => {

    {/* FOOTER GRANDE */ }
    return (

        < div className="w-full bg-white" >
            < footer className="w-full text-gray-800 bg-gray-50 body-font border-t border-gray-500" >
                <div className="container flex flex-col flex-wrap px-5 py-16 mx-auto md:items-center lg:items-start md:flex-row">

                    {/* LOGO + INFO */}
                    <div className="shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
                        <div className="flex items-center justify-center font-bold text-gray-900 text-2xl md:justify-start">
                            <svg className="w-8 h-8 mr-2 text-red-800" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.9l-9-4.5v9l9 4.5 9-4.5v-9l-9 4.5z" />
                            </svg>
                            Finotex Employee Portal
                        </div>

                        <p className="mt-4 text-sm text-gray-600">
                            Accede de forma rápida y segura a tus recibos de pago, reportes y datos laborales.
                        </p>
                    </div>

                    {/* COLUMNAS */}
                    <div className="flex flex-wrap grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">

                        <div className="w-full px-4 md:w-1/2 lg:w-1/4">
                            <h2 className="mb-4 text-sm font-bold uppercase">Recursos</h2>
                            <ul>
                                <li className="mt-3">Manual de Usuario</li>
                                <li className="mt-3">Preguntas Frecuentes</li>
                                <li className="mt-3">Política de Privacidad</li>
                            </ul>
                        </div>

                        <div className="w-full px-4 md:w-1/2 lg:w-1/4">
                            <h2 className="mb-4 text-sm font-bold uppercase">Soporte</h2>
                            <ul>
                                <li className="mt-3">Contacto de Soporte</li>
                                <li className="mt-3">Centro de Ayuda</li>
                                <li className="mt-3">Actualizar Información</li>
                            </ul>
                        </div>

                        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <h2 className="mb-4 text-sm font-bold uppercase">Contacto</h2>
                            <ul>
                                <li className="mt-3">IT-support</li>
                                <li className="mt-3 font-semibold text-red-800">
                                    soporteithon@finotex.com
                                </li>
                                <li className="mt-3 font-semibold text-red-800">
                                    Tel: +504 9510-4400
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* COPYRIGHT */}
                <div className="bg-red-900">
                    <div className="container px-5 py-4 mx-auto text-center">
                        <p className="text-sm text-white">
                            Copyright © 2026 - FINOTEX Todos los derechos reservados
                        </p>
                    </div>
                </div>
            </footer>
        </div >

    );
};







