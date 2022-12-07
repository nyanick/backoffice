import {useMutation, useQuery} from "react-query";
import {editHospital, fetchHospitals, getHospital, newHospital} from "../api/hospital";
import {IHospital, IHospitalCreate} from "../types/hospital";

export const useHospitals = (size, page) => {
    return useQuery(["hospitals", {size, page}], fetchHospitals)
}

export const useHospital = (id: string) => {
    return useQuery(["hospitals", id], getHospital, {
        enabled: !!id
    })
}

export const useAddHospital = () => {
    return useMutation((hospital: IHospitalCreate) => newHospital(hospital))
}

export const useEditHospital = () => {
    return useMutation((hospital: IHospital) => editHospital(hospital))
}
