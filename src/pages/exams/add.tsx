import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {appRoutes} from "../../constants";
import {useRouter} from "next/router";
import {useAddExam} from "../../hooks/exam";
import {ExamForm} from "../../components/ExamForm";
import {useCategories} from "../../hooks/category";
import {ExamFormSkeleton} from "../../components";

const ExamCreate: NextPage = () => {
    const router = useRouter()
    const categoriesQuery = useCategories(null, null)
    const addExamMutation = useAddExam()
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const [examCreated, setExamCreated] = useState(false)
    const formikRef = useRef(null)

    useEffect(() => {
        if (examCreated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_EXAMS).then()
            }
        }
    }, [examCreated])

    return (
        <section className='py-8 space-y-4 max-w-xl mx-auto'>
            <h2 className='text-2xl font-medium'>Nouvel Examen</h2>
            {categoriesQuery.isLoading && <ExamFormSkeleton/>}
            {categoriesQuery.data && (
                <ExamForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setExamCreated={setExamCreated}
                    categories={categoriesQuery.data.categories}
                    addExamMutation={addExamMutation}/>
            )}
        </section>
    )
}

export default ExamCreate
