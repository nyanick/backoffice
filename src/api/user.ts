import axios from "./axios";
import {apiRoutes} from "../constants";
import {IUser, IUserCreate} from "../types/user";

export const fetchUsers = async ({queryKey}) => {
    const params = {
        page: queryKey[1].page,
        size: queryKey[1].size,
        role: queryKey[1].role,
    }
    const {data, headers} = await axios.get<IUser[]>(apiRoutes.USERS, {params});
    return {
        users: data,
        itemsCount: headers['x-total-count'] as number
    };
}

export const fetchAuthorities = async () => {
    const {data} = await axios.get<string[]>(`${apiRoutes.USERS}/authorities`);
    return data;
}

export const getUser = async ({queryKey}) => {
    const {data} = await axios.get<IUser>(`${apiRoutes.USERS}/${queryKey[1]}`);
    return data;
}

export const newUser = async (user: IUserCreate) => {
    const {data} = await axios.post<IUser>(apiRoutes.USERS, user);
    return data;
}

export const editUser = async (user: IUser) => {
    const {data} = await axios.put<IUser>(apiRoutes.USERS, user);
    return data;
}
