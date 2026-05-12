import type { User } from '@/interfaces/user.interface';
import { create } from 'zustand'
import { loginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-auth.actions';



type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';


export type AuthState = {

    //properties

    User: User | null;
    token: string | null;
    authStatus: AuthStatus;


    //getter

    isAdmin: () => boolean;

    //actions
    login: (email: string, password: string) => Promise<boolean>;

    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;

};

export const useAuthStore = create<AuthState>()((set, get) => ({
    //properties
    User: null,
    token: null,
    authStatus: 'checking',

    //getter

    isAdmin: () => {
        const role = get().User?.rol || '';
        return role === 'ADMIN';
    },


    //methods
    login: async (email: string, password: string) => {
        try {
            const data = await loginAction(email, password);
            sessionStorage.setItem("token", data.token);

            set({ User: data.user, token: data.token, authStatus: 'authenticated' });
            return true;

        } catch (error) {
            sessionStorage.removeItem("token");
            set({ User: null, token: null, authStatus: 'not-authenticated' });
            return false;
        }



    },
    logout: () => {
        sessionStorage.removeItem("token");
        set({ User: null, token: null, authStatus: 'not-authenticated' });
    },



    checkAuthStatus: async () => {
        try {
            const { user, token } = await checkAuthAction();
            set({ User: user, token: token, authStatus: 'authenticated' });
            return true;


        } catch (error) {
            set({ User: undefined, token: undefined, authStatus: 'not-authenticated' });
            return false;
        }
    }



}));
