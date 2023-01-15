import {useMutation, useQuery} from "react-query";
import {editUser, fetchAuthorities, fetchUsers, getUser, newUser} from "../api/user";
import {IAuthority, IUser, IUserCreate} from "../types/user";

export const useUsers = (size, page, role) => {
    return useQuery(["users", {size, page, role}], fetchUsers)
}

export const useGetAuthorities = () => {
    return useQuery("authorities", fetchAuthorities, {
        select: data => {
            let result = [];
            data.forEach(function(authority){
                let role= authority.split("_")[1].charAt(0).toUpperCase() + authority.split("_")[1].substr(1).toLowerCase();
                let hosipal_role = authority.split("_")[2];
                let label = role;
                if(hosipal_role){
                    //console.log(hosipal_role);
                    label = label +" "+ hosipal_role.charAt(0).toUpperCase() + hosipal_role.substr(1)?.toLowerCase();
                }
                
                result.push(
                    {
                        value: authority,
                        label: label
                    } as IAuthority
                )
            });
            return result;
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
