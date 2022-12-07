import {useMutation, useQuery} from "react-query";
import {editSymptom, fetchSymptoms, getSymptom, newSymptom} from "../api/symptom";
import {ISymptom, ISymptomCreate} from "../types/symptom";

export const useSymptoms = (size, page) => {
    return useQuery(["symptoms", {size, page}], fetchSymptoms)
}

export const useSymptom = (id: string) => {
    return useQuery(["symptoms", id], getSymptom, {
        enabled: !!id
    })
}

export const useAddSymptom = () => {
    return useMutation((symptom: ISymptomCreate) => newSymptom(symptom))
}

export const useEditSymptom = () => {
    return useMutation((symptom: ISymptom) => editSymptom(symptom))
}
