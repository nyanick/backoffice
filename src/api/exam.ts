import axios from "./axios";
import {apiRoutes} from "../constants";
import {IExam, IExamCreate} from "../types/exam";

export const fetchExams = async ({queryKey}) => {
    const params = {
        page: queryKey[1].page,
        size: queryKey[1].size,
    }
    const {data, headers} = await axios.get<IExam[]>(apiRoutes.EXAMS, {params});
    return {
        exams: data,
        itemsCount: headers['x-total-count'] as number
    };
}

export const getExam = async ({queryKey}) => {
    const {data} = await axios.get<IExam>(`${apiRoutes.EXAMS}/${queryKey[1]}`);
    return data;
}

export const newExam = async (exam: IExamCreate) => {
    const {data} = await axios.post<IExam>(apiRoutes.EXAMS, exam);
    return data;
}

export const editExam = async (exam: IExam) => {
    const {data} = await axios.put<IExam>(apiRoutes.EXAMS, exam);
    return data;
}
