import axios from "./axios";
import {ISymptom, ISymptomCreate} from "../types/symptom";
import {apiRoutes} from "../constants";

export const fetchSymptoms = async ({queryKey}) => {
    const params = {
        page: queryKey[1].page,
        size: queryKey[1].size
    }
    const {data, headers} = await axios.get<ISymptom[]>(apiRoutes.SYMPTOMS, {params});
    return {
        symptoms: data,
        itemsCount: headers['x-total-count'] as number
    };
}

export const getSymptom = async ({queryKey}) => {
    const {data} = await axios.get<ISymptom>(`${apiRoutes.SYMPTOMS}/${queryKey[1]}`);
    return data;
}

export const newSymptom = async (symptom: ISymptomCreate) => {
    const {data} = await axios.post<ISymptom>(apiRoutes.SYMPTOMS, symptom);
    return data;
}

export const editSymptom = async (symptom: ISymptom) => {
    const {data} = await axios.put<ISymptom>(apiRoutes.SYMPTOMS, symptom);
    return data;
}
