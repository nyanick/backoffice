import {NextPage} from "next";
import {useRouter} from "next/router";
import {useCategories} from "../../../hooks/category";
import {useEditExam, useExam} from "../../../hooks/exam";
import React, {useEffect, useRef, useState} from "react";
import {appRoutes} from "../../../constants";
import {ExamForm} from "../../../components/ExamForm";
import {ExamFormSkeleton} from "../../../components";

const ExamEdit: NextPage = () => {
    const router = useRouter()
    const categoriesQuery = useCategories(null, null)
    const updateExamMutation = useEditExam()
    const examQuery = useExam(router.query.id as any)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const [examUpdated, setExamUpdated] = useState(false)
    const formikRef = useRef(null)

    useEffect(() => {
        if (examUpdated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_EXAMS).then()
            }
        }
    }, [examUpdated])

    return (
        <section className='py-8 space-y-4 max-w-xl mx-auto'>
            <h2 className='text-2xl font-medium'>Mettre à jour l&#39;examen</h2>
            {(categoriesQuery.isLoading || examQuery.isLoading) && <ExamFormSkeleton/>}
            {categoriesQuery.data && examQuery.data && (
                <ExamForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setExamUpdated={setExamUpdated}
                    categories={categoriesQuery.data.categories}
                    updateExamMutation={updateExamMutation}/>
            )}
        </section>
    )
}

export default ExamEdit
