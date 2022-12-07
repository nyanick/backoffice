import {useMutation, useQuery} from "react-query";
import {editSpecialty, fetchSpecialties, getSpecialty, newSpecialty} from "../api/specialty";
import {ISpecialty, ISpecialtyCreate} from "../types/specialty";

export const useSpecialties = (size, page) => {
    return useQuery(["specialties", {size, page}], fetchSpecialties)
}

export const useSpecialty = (id: string) => {
    return useQuery(["specialties", id], getSpecialty, {
        enabled: !!id
    })
}

export const useAddSpecialty = () => {
    return useMutation((specialty: ISpecialtyCreate) => newSpecialty(specialty))
}

export const useEditSpecialty = () => {
    return useMutation((specialty: ISpecialty) => editSpecialty(specialty))
}
