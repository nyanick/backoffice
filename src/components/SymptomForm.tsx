import React, {MutableRefObject, useEffect} from "react";
import {Form, Formik} from "formik";
import {InputField} from "./InputField";
import {FormFooterButtons} from "./FormFooterButtons";
import * as yup from "yup";
import {UseMutationResult} from "react-query";
import {useRouter} from "next/router";
import {ISymptom, ISymptomCreate} from "../types/symptom";

interface Props {
    formikRef: MutableRefObject<any>
    createMode: 'single' | 'multiple'
    setCreateMode: (mode: 'single' | 'multiple') => void
    setSymptomCreated?: (created: boolean) => void
    setSymptomUpdated?: (updated: boolean) => void
    symptom?: ISymptom
    addSymptomMutation?: UseMutationResult<ISymptom, unknown, ISymptomCreate>
    updateSymptomMutation?: UseMutationResult<ISymptom, unknown, ISymptom>
}

export const SymptomForm: React.FC<Props> = (
    {
        formikRef,
        createMode,
        setCreateMode,
        setSymptomCreated,
        setSymptomUpdated,
        symptom,
        addSymptomMutation,
        updateSymptomMutation
    }
) => {
    const router = useRouter()

    const SymptomCreateSchema = yup.object().shape({
        name: yup.string().required('champs requis')
    });

    const {isSuccess: symptomAddSuccess} = addSymptomMutation || {}
    const {isSuccess: symptomUpdateSuccess} = updateSymptomMutation || {}

    useEffect(() => {
        if (symptomAddSuccess) {
            setSymptomCreated(true)
        }
    }, [symptomAddSuccess])

    useEffect(() => {
        if (symptomUpdateSuccess) {
            setSymptomUpdated(true)
        }
    }, [symptomUpdateSuccess])

    return (
        <Formik
            enableReinitialize
            innerRef={formikRef}
            validationSchema={SymptomCreateSchema}
            initialValues={{
                name: symptom?.name
            }}
            onSubmit={async (values) => {
                if (router.query.id) {
                    updateSymptomMutation.mutate({
                        ...values,
                        symptomId: symptom.symptomId
                    })
                } else {
                    addSymptomMutation.mutate(values)
                }
            }}>
            {() => (
                <Form autoComplete='off' noValidate>
                    <InputField
                        required
                        name='name'
                        placeholder='Nom de symptôme'
                        label='Nom'/>
                    <hr className='mt-8'/>
                    <FormFooterButtons
                        updateMode={!!router.query.id}
                        createMode={createMode}
                        setCreateMode={setCreateMode}
                        onCancel={() => router.back()}
                        processing={addSymptomMutation != null ? addSymptomMutation.isLoading : updateSymptomMutation.isLoading}/>
                </Form>
            )}
        </Formik>
    )
}
