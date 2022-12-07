import {useMutation, useQuery} from "react-query";
import {ILoginCredentials} from "../types/account";
import {getCurrentUser, login} from "../api/account";

export const useSignIn = () => {
    return useMutation((credentials: ILoginCredentials) => login(credentials))
}

export const useGetCurrentUser = () => {
    return useQuery("account", getCurrentUser)
}
