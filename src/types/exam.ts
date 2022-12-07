export type IExamCreate = {
    categoryId: string
    name: string
}

export type IExam = IExamCreate & {
    examId: string
}
