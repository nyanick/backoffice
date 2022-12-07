import {useMutation, useQuery} from "react-query";
import {editGroup, fetchGroups, getGroup, newGroup} from "../api/group";
import {IGroup, IGroupCreate} from "../types/group";

export const useGroups = (size, page) => {
    return useQuery(["groups", {size, page}], fetchGroups)
}

export const useGroup = (id: string) => {
    return useQuery(["groups", id], getGroup, {
        enabled: !!id
    })
}

export const useAddGroup = () => {
    return useMutation((group: IGroupCreate) => newGroup(group))
}

export const useEditGroup = () => {
    return useMutation((group: IGroup) => editGroup(group))
}
