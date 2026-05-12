import { vaucherApi } from "@/api/VaucherAPI";
import type { AuthResponse } from "../interfaces/auth.response";





export const checkAuthAction = async (): Promise<AuthResponse> => {



    const token = sessionStorage.getItem('token');

    if (!token) throw new Error('No token');

    try {
        const { data } = await vaucherApi.get<AuthResponse>('/auth/check-status');

        sessionStorage.setItem('token', data.token);

        return data;

    } catch (error) {
        sessionStorage.removeItem('token');
        throw new Error('Token expired');
    }
}

