import { useQuery } from "@tanstack/react-query";
import { vaucherApi } from "@/api/VaucherAPI";
import type { User } from "@/interfaces/user.interface";

const getUsers = async (): Promise<User[]> => {
    const { data } = await vaucherApi.get<User[]>('/auth/users');
    return data;
}

export const useUsers = () => {
    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return {
        usersQuery,
    };
}

const getUserById = async (id: number): Promise<User> => {
    const { data } = await vaucherApi.get<User>(`/auth/users/${id}`);
    return data;
}

export const useUser = (id: number) => {
    const userQuery = useQuery({
        queryKey: ['user', id],
        queryFn: () => getUserById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });

    return {
        userQuery,
    };
}
