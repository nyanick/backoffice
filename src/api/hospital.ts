import axios from "./axios";
import {IHospital, IHospitalCreate} from "../types/hospital";
import {apiRoutes} from "../constants";

export const fetchHospitals = async ({queryKey}) => {
    const params = {
        page: queryKey[1].page,
        size: queryKey[1].size
    }
    const {data, headers} = await axios.get<IHospital[]>(apiRoutes.HOSPITALS, {params});
    return {
        hospitals: data,
        itemsCount: headers['x-total-count']
    };
}

export const getHospital = async ({queryKey}) => {
    const {data} = await axios.get<IHospital>(`${apiRoutes.HOSPITALS}/${queryKey[1]}`);
    return data;
}

export const newHospital = async (hospital: IHospitalCreate) => {
    const {data} = await axios.post<IHospital>(apiRoutes.HOSPITALS, hospital);
    return data;
}

export const editHospital = async (hospital: IHospital) => {
    const {data} = await axios.put<IHospital>(apiRoutes.HOSPITALS, hospital);
    return data;
}
