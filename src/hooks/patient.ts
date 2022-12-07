import {useMutation, useQuery} from "react-query";
import {
    editPatient,
    fetchPatients,
    getPatientByPatientId,
    getPatientByUserId,
    getPatientDetailsByPatientId,
    getPatientDetailsByUserId,
    addPatient
} from "../api/patient";
import {IPatientEdit} from "../types/patient";

export const usePatients = (size, page) => {
    return useQuery(["patients", {page, size}], fetchPatients)
}

export const useGetPatientByUserId = (userId: string) => {
    return useQuery(["patients", userId], getPatientByUserId)
}

export const useGetPatientByPatientId = (patientId: string) => {
    return useQuery(["patients", patientId], getPatientByPatientId)
}

export const useGetPatientDetailsByUserId = (userId?: string) => {
    return useQuery(["patients", userId], getPatientDetailsByUserId, {
        enabled: !!userId
    })
}

export const useGetPatientDetailsByPatientId = (patientId: string) => {
    return useQuery(["patients", patientId], getPatientDetailsByPatientId)
}

export const useAddPatient = () => {
    return useMutation((patient: IPatientEdit) => addPatient(patient))
}

export const useEditPatient = () => {
    return useMutation((patient: IPatientEdit) => editPatient(patient))
}
