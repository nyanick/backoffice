import axios from "./axios";
import {INurseCreate, INurse, INurseDetails} from "../types/nurse";
import {apiRoutes} from "../constants";

export const fetchNurses = async ({queryKey}) => {
    const params = {
        page: queryKey[1].page,
        size: queryKey[1].size
    }
    const {data, headers} = await axios.get<INurseDetails[]>(apiRoutes.NURSES, {params});
    return {
        nurses: data,
        itemsCount: headers['x-total-count'] as number
    };
}

export const getNurseByUserId = async ({queryKey}) => {
    const [, {userId}] = queryKey
    const {data} = await axios.get<INurseDetails>(`${apiRoutes.NURSES}/user/${userId}`);
    return data;
}

export const getNurseByNurseId = async ({queryKey}) => {
    const [, {nurseId}] = queryKey
    const {data} = await axios.get<INurseDetails>(`${apiRoutes.NURSES}/${nurseId}`);
    return data;
}

export const getNurseDetailsByUserId = async ({queryKey}) => {
    const {data} = await axios.get<INurseDetails>(`${apiRoutes.NURSES}/user/${queryKey[1]}/details`);
    return data;
}

export const getNurseDetailsByNurseId = async ({queryKey}) => {
    const [, {nurseId}] = queryKey
    const {data} = await axios.get<INurseDetails>(`${apiRoutes.NURSES}/${nurseId}/details`);
    return data;
}

export const addNurse = async (nurse: INurseCreate) => {
    const {data} = await axios.post<INurseCreate>(apiRoutes.NURSES, nurse);
    return data;
}

export const editNurse = async (nurse: INurseCreate) => {
    const {data} = await axios.put<INurseCreate>(apiRoutes.NURSES, nurse);
    return data;
}
