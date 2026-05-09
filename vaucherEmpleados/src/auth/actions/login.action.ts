import { vaucherApi } from "../../api/VaucherAPI";
import type { AuthResponse } from "../interfaces/auth.response";

export const loginAction = async (email: string, password: string): Promise<AuthResponse> => {

    try {
        const { data } = await vaucherApi.post<AuthResponse>('auth/login', {
            email,
            password
        });



        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}