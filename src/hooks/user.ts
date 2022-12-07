import {useMutation, useQuery} from "react-query";
import {editUser, fetchAuthorities, fetchUsers, getUser, newUser} from "../api/user";
import {IAuthority, IUser, IUserCreate} from "../types/user";

export const useUsers = (size, page, role) => {
    return useQuery(["users", {size, page, role}], fetchUsers)
}

export const useGetAuthorities = () => {
    return useQuery("authorities", fetchAuthorities, {
        select: data => {
            return data.map((authority) => ({
                value: authority,
                label: authority.split("_")[1].charAt(0).toUpperCase() + authority.split("_")[1].substr(1).toLowerCase()
            } as IAuthority))
        }
    })
}

export const useUser = (id: string) => {
    return useQuery(["users", id], getUser, {
        enabled: !!id
    })
}

export const useAddUser = () => {
    return useMutation((user: IUserCreate) => newUser(user))
}

export const useEditUser = () => {
    return useMutation((user: IUser) => editUser(user))
}
