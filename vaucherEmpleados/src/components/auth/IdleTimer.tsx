import { useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '@/auth/store/auth.store';

/**
 * Componente que monitorea la actividad del usuario y cierra la sesión
 * automáticamente tras un periodo de inactividad.
 */
export const IdleTimer = () => {
    const logout = useAuthStore((state) => state.logout);
    const authStatus = useAuthStore((state) => state.authStatus);
    const isAuthenticated = authStatus === 'authenticated';

    // Tiempo de inactividad permitido (ej. 10 minutos = 600,000 ms)
    const IDLE_TIMEOUT = 30 * 1000;

    const timerRef = useRef<number | null>(null);

    const resetTimer = useCallback(() => {
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
        }

        if (isAuthenticated) {
            timerRef.current = window.setTimeout(() => {
                console.log('Sesión cerrada por inactividad');
                logout();
            }, IDLE_TIMEOUT);
        }
    }, [isAuthenticated, logout, IDLE_TIMEOUT]);

    useEffect(() => {
        // Eventos a monitorear
        const events = [
            'mousedown',
            'mousemove',
            'keydown',
            'scroll',
            'touchstart',
            'click'
        ];

        if (isAuthenticated) {
            // Inicializar el timer
            resetTimer();

            // Agregar listeners
            events.forEach((event) => {
                window.addEventListener(event, resetTimer);
            });
        }

        return () => {
            // Limpieza al desmontar o al cambiar autenticación
            if (timerRef.current) {
                window.clearTimeout(timerRef.current);
            }
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [isAuthenticated, resetTimer]);

    return null; // Este componente no renderiza nada visual
};
