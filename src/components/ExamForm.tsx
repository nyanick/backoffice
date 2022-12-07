import React, {MutableRefObject, useEffect} from "react";
import {Form, Formik} from "formik";
import {InputField} from "./InputField";
import {FormFooterButtons} from "./FormFooterButtons";
import * as yup from "yup";
import {UseMutationResult} from "react-query";
import {useRouter} from "next/router";
import {IExam, IExamCreate} from "../types/exam";
import Select from "react-select";
import {ICategory} from "../types/category";

interface Props {
    formikRef: MutableRefObject<any>
    createMode: 'single' | 'multiple'
    setCreateMode: (mode: 'single' | 'multiple') => void
    setExamCreated?: (created: boolean) => void
    setExamUpdated?: (updated: boolean) => void
    categories: ICategory[]
    exam?: IExam
    addExamMutation?: UseMutationResult<IExam, unknown, IExamCreate>
    updateExamMutation?: UseMutationResult<IExam, unknown, IExam>
}

export const ExamForm: React.FC<Props> = (
    {
        formikRef,
        createMode,
        setCreateMode,
        setExamCreated,
        setExamUpdated,
        categories,
        exam,
        addExamMutation,
        updateExamMutation
    }
) => {
    const router = useRouter()

    const ExamCreateSchema = yup.object().shape({
        name: yup.string().required('champs requis'),
        categoryId: yup.string().required('champs requis')
    });

    const {isSuccess: examAddSuccess} = addExamMutation || {}
    const {isSuccess: examUpdateSuccess} = updateExamMutation || {}

    useEffect(() => {
        if (examAddSuccess) {
            setExamCreated(true)
        }
    }, [examAddSuccess])

    useEffect(() => {
        if (examUpdateSuccess) {
            setExamUpdated(true)
        }
    }, [examUpdateSuccess])

    return (
        <Formik
            enableReinitialize
            innerRef={formikRef}
            validationSchema={ExamCreateSchema}
            initialValues={{
                name: exam?.name,
                categoryId: exam?.categoryId || ''
            }}
            onSubmit={async (values) => {
                if (router.query.id) {
                    updateExamMutation.mutate({
                        ...values,
                        examId: exam.examId
                    })
                } else {
                    addExamMutation.mutate(values)
                }
            }}>
            {({setFieldValue, touched, errors}) => (
                <Form autoComplete='off' noValidate>
                    <InputField
                        required
                        name='name'
                        placeholder='nom'
                        label='Nom'/>
                    <div>
                        <label
                            className="!font-normal text-sm mb-1 text-gray-600 after:content-['*'] after:ml-0.5 after:text-red-500 after:inline-block"
                            htmlFor='categoryId'>Catégorie</label>
                        <Select
                            onChange={(newValue: any) => setFieldValue('categoryId', newValue?.value)}
                            className="basic-single rounded-md"
                            classNamePrefix="select"
                            styles={{
                                control: (base) => (errors.categoryId && touched.categoryId ? {
                                    ...base, ...{
                                        borderRadius: '0.375rem',
                                        borderColor: '#f00',
                                        borderWidth: '2px',
                                    }
                                } : {...base})
                            }}
                            placeholder='Sélectionner une catégorie'
                            isSearchable={true}
                            name='categoryId'
                            inputId='categoryId'
                            id='categoryId'
                            instanceId='categoryId'
                            defaultValue={categories.filter(category => category.categoryId === exam?.categoryId).map(item => ({
                                label: item.name,
                                value: item.categoryId
                            }))[0]}
                            options={categories.map(category => ({
                                label: category.name,
                                value: category.categoryId
                            }))}/>
                        <label
                            className={`!font-normal !mb-0 text-red-500 !transition-transform duration-500 ease-out overflow-hidden ${errors.categoryId && touched.categoryId ? 'visible' : 'hidden'}`}>{errors.categoryId}</label>
                    </div>
                    <hr className='mt-8'/>
                    <FormFooterButtons
                        updateMode={!!router.query.id}
                        createMode={createMode}
                        setCreateMode={setCreateMode}
                        onCancel={() => router.back()}
                        processing={addExamMutation != null ? addExamMutation.isLoading : updateExamMutation.isLoading}/>
                </Form>
            )}
        </Formik>
    )
}
