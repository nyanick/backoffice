import axios from "./axios";
import {ISpecialty, ISpecialtyCreate} from "../types/specialty";
import {apiRoutes} from "../constants";

export const fetchSpecialties = async ({queryKey}) => {
    const params = {
        page: queryKey[1].page,
        size: queryKey[1].size
    }
    const {data, headers} = await axios.get<ISpecialty[]>(apiRoutes.SPECIALTIES, {params});
    return {
        specialties: data,
        itemsCount: headers['x-total-count']
    };
}

export const getSpecialty = async ({queryKey}) => {
    const {data} = await axios.get<ISpecialty>(`${apiRoutes.SPECIALTIES}/${queryKey[1]}`);
    return data;
}

export const newSpecialty = async (specialty: ISpecialtyCreate) => {
    const {data} = await axios.post<ISpecialty>(apiRoutes.SPECIALTIES, specialty);
    return data;
}

export const editSpecialty = async (specialty: ISpecialty) => {
    const {data} = await axios.put<ISpecialty>(apiRoutes.SPECIALTIES, specialty);
    return data;
}
