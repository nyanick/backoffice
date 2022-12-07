import axios from "./axios";
import {IDoctorDetails, IDoctorCreate, IDoctor} from "../types/doctor";
import {apiRoutes} from "../constants";

export const fetchDoctors = async ({queryKey}) => {
    const params = {
        page: queryKey[1].page,
        size: queryKey[1].size
    }
    const {data, headers} = await axios.get<IDoctorDetails[]>(apiRoutes.DOCTORS, {params});
    return {
        doctors: data,
        itemsCount: headers['x-total-count'] as number
    };
}

export const getDoctorByUserId = async ({queryKey}) => {
    const [, {userId}] = queryKey
    const {data} = await axios.get<IDoctor>(`${apiRoutes.DOCTORS}/user/${userId}`);
    return data;
}

export const getDoctorByDoctorId = async ({queryKey}) => {
    const [, {doctorId}] = queryKey
    const {data} = await axios.get<IDoctor>(`${apiRoutes.DOCTORS}/${doctorId}`);
    return data;
}

export const getDoctorDetailsByUserId = async ({queryKey}) => {
    const {data} = await axios.get<IDoctorDetails>(`${apiRoutes.DOCTORS}/user/${queryKey[1]}/details`);
    return data;
}

export const getDoctorDetailsByDoctorId = async ({queryKey}) => {
    const [, {doctorId}] = queryKey
    const {data} = await axios.get<IDoctorDetails>(`${apiRoutes.DOCTORS}/${doctorId}/details`);
    return data;
}

export const addDoctor = async (doctor: IDoctorCreate) => {
    const {data} = await axios.post<IDoctorDetails>(apiRoutes.DOCTORS, doctor);
    return data;
}

export const editDoctor = async (doctor: IDoctorCreate) => {
    const {data} = await axios.put<IDoctorDetails>(apiRoutes.DOCTORS, doctor);
    return data;
}
