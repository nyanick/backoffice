import axios from "./axios";
import {IPatientDetails, IPatientEdit, IPatient} from "../types/patient";
import {apiRoutes} from "../constants";

export const fetchPatients = async ({queryKey}) => {
    const params = {
        page: queryKey[1].page,
        size: queryKey[1].size
    }
    const {data, headers} = await axios.get<IPatientDetails[]>(apiRoutes.PATIENTS, {params});
    console.log(data);
    return {
        patients: data,
        itemsCount: headers['x-total-count']
    };
}

export const getPatientByUserId = async ({queryKey}) => {
    const [, {userId}] = queryKey
    const {data} = await axios.get<IPatient>(`${apiRoutes.PATIENTS}/user/${userId}`);
    return data;
}

export const getPatientByPatientId = async ({queryKey}) => {
    const [, {patientId}] = queryKey
    const {data} = await axios.get<IPatient>(`${apiRoutes.PATIENTS}/${patientId}`);
    return data;
}

export const getPatientDetailsByUserId = async ({queryKey}) => {
    const {data} = await axios.get<IPatientDetails>(`${apiRoutes.PATIENTS}/user/${queryKey[1]}/details`);
    return data;
}

export const getPatientDetailsByPatientId = async ({queryKey}) => {
    const [, {patientId}] = queryKey
    const {data} = await axios.get<IPatientDetails>(`${apiRoutes.PATIENTS}/${patientId}/details`);
    return data;
}

export const addPatient = async (patient: IPatientEdit) => {
    const {data} = await axios.post<IPatientDetails>(apiRoutes.PATIENTS, patient);
    return data;
}

export const editPatient = async (patient: IPatientEdit) => {
    const {data} = await axios.put<IPatientDetails>(apiRoutes.PATIENTS, patient);
    return data;
}
