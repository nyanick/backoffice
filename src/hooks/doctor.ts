import {useMutation, useQuery} from "react-query";
import {
    editDoctor,
    fetchDoctors,
    getDoctorByDoctorId,
    getDoctorByUserId,
    getDoctorDetailsByDoctorId,
    getDoctorDetailsByUserId,
    addDoctor
} from "../api/doctor";
import {IDoctorCreate} from "../types/doctor";

export const useDoctors = (size, page) => {
    return useQuery(["users", {size, page}], fetchDoctors)
}

export const useGetDoctorByUserId = (userId: string) => {
    return useQuery(["doctors", userId], getDoctorByUserId)
}

export const useGetDoctorByDoctorId = (doctorId: string) => {
    return useQuery(["doctors", doctorId], getDoctorByDoctorId)
}

export const useGetDoctorDetailsByUserId = (userId?: string) => {
    return useQuery(["doctors", userId], getDoctorDetailsByUserId, {
        enabled: !!userId
    })
}

export const useGetDoctorDetailsByDoctorId = (doctorId: string) => {
    return useQuery(["doctors", doctorId], getDoctorDetailsByDoctorId)
}

export const useAddDoctor = () => {
    return useMutation((doctor: IDoctorCreate) => addDoctor(doctor))
}

export const useEditDoctor = () => {
    return useMutation((doctor: IDoctorCreate) => editDoctor(doctor))
}
