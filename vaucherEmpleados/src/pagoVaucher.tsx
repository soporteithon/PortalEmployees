import type { PropsWithChildren } from "react";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./app.router";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreen";
import { useAuthStore } from "@/auth/store/auth.store";

import { IdleTimer } from "./components/auth/IdleTimer";


const queryClient = new QueryClient();

const ChekAuthProvider = ({ children }: PropsWithChildren) => {

    const { checkAuthStatus } = useAuthStore();


    const { isLoading } = useQuery({
        queryKey: ['authcheck'],
        queryFn: checkAuthStatus,
        retry: false,
        staleTime: 1000 * 60 * 1.5,
        refetchOnWindowFocus: true
    });

    if (isLoading) {
        return <CustomFullScreenLoading />;
    }


    return children;

}



export const PagoVaucher = () => {



    return (

        // Provider de react query para manejar el estado de las consultas, para mejorar la experiencia del usuario
        <QueryClientProvider client={queryClient}>
            <IdleTimer />
            <Toaster />
            <ChekAuthProvider>
                <RouterProvider router={appRouter} />
            </ChekAuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
