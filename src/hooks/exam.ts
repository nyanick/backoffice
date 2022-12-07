import {useMutation, useQuery} from "react-query";
import {editExam, fetchExams, getExam, newExam} from "../api/exam";
import {IExam, IExamCreate} from "../types/exam";

export const useExams = (size, page) => {
    return useQuery(["groups", {size, page}], fetchExams)
}

export const useExam = (id: string) => {
    return useQuery(["exams", id], getExam, {
        enabled: !!id
    })
}

export const useAddExam = () => {
    return useMutation((exam: IExamCreate) => newExam(exam))
}

export const useEditExam = () => {
    return useMutation((exam: IExam) => editExam(exam))
}
