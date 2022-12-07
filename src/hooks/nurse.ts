import {useMutation, useQuery} from "react-query";
import {
    editNurse,
    fetchNurses,
    getNurseByNurseId,
    getNurseByUserId,
    getNurseDetailsByNurseId,
    getNurseDetailsByUserId,
    addNurse
} from "../api/nurse";
import {INurseCreate} from "../types/nurse";

export const useGetNurses = (size, page) => {
    return useQuery(["nurses", {size, page}], fetchNurses)
}

export const useGetNurseByUserId = (userId: string) => {
    return useQuery(["nurses", userId], getNurseByUserId)
}

export const useGetNurseByNurseId = (nurseId: string) => {
    return useQuery(["nurses", nurseId], getNurseByNurseId)
}

export const useGetNurseDetailsByUserId = (userId?: string) => {
    return useQuery(["nurses", userId], getNurseDetailsByUserId, {
        enabled: !!userId
    })
}

export const useGetNurseDetailsByNurseId = (nurseId: string) => {
    return useQuery(["nurses", nurseId], getNurseDetailsByNurseId)
}

export const useAddNurse = () => {
    return useMutation((nurse: INurseCreate) => addNurse(nurse))
}

export const useEditNurse = () => {
    return useMutation((nurse: INurseCreate) => editNurse(nurse))
}
