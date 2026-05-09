import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../lib/api';
import type { User } from '@/interfaces/user.interface';




interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: async (username, password) => {
                try {
                    const response = await api.post('/auth/login', { username, password });
                    const { user, token } = response.data;
                    set({ user, token, isAuthenticated: true });
                } catch (error) {
                    throw error;
                }
            },

            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage', // Guarda el estado en localStorage
        }
    )
);
