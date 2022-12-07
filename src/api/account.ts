import axios from "./axios";
import {apiRoutes} from "../constants";
import {IUser} from "../types/user";
import {ILoginCredentials, ILoginResponse} from "../types/account";

export const getCurrentUser = async () => {
    const {data} = await axios.get<IUser>(`${apiRoutes.USERS}/account`);
    return data;
}

export const login = async (credentials: ILoginCredentials) => {
    const {data} = await axios.post<ILoginResponse>(`${apiRoutes.USERS}/login`, credentials);
    return data;
}
