import React, {MutableRefObject, useEffect} from "react";
import {Form, Formik} from "formik";
import {InputField} from "./InputField";
import {FormFooterButtons} from "./FormFooterButtons";
import * as yup from "yup";
import {UseMutationResult} from "react-query";
import {useRouter} from "next/router";
import {ISpecialty, ISpecialtyCreate} from "../types/specialty";

interface Props {
    formikRef: MutableRefObject<any>
    createMode: 'single' | 'multiple'
    setCreateMode: (mode: 'single' | 'multiple') => void
    setSpecialtyCreated?: (created: boolean) => void
    setSpecialtyUpdated?: (updated: boolean) => void
    specialty?: ISpecialty
    addSpecialtyMutation?: UseMutationResult<ISpecialty, unknown, ISpecialtyCreate>
    updateSpecialtyMutation?: UseMutationResult<ISpecialty, unknown, ISpecialty>
}

export const SpecialtyForm: React.FC<Props> = (
    {
        formikRef,
        createMode,
        setCreateMode,
        setSpecialtyCreated,
        setSpecialtyUpdated,
        specialty,
        addSpecialtyMutation,
        updateSpecialtyMutation
    }
) => {
    const router = useRouter()

    const SpecialtyCreateSchema = yup.object().shape({
        label: yup.string().required('champs requis'),
        title: yup.string().required('champs requis'),
        description: yup.string().required('champs requis')
    });

    const {isSuccess: specialtyAddSuccess} = addSpecialtyMutation || {}
    const {isSuccess: specialtyUpdateSuccess} = updateSpecialtyMutation || {}

    useEffect(() => {
        if (specialtyAddSuccess) {
            setSpecialtyCreated(true)
        }
    }, [specialtyAddSuccess])

    useEffect(() => {
        if (specialtyUpdateSuccess) {
            setSpecialtyUpdated(true)
        }
    }, [specialtyUpdateSuccess])

    return (
        <Formik
            enableReinitialize
            innerRef={formikRef}
            validationSchema={SpecialtyCreateSchema}
            initialValues={{
                label: specialty?.label,
                title: specialty?.title,
                description: specialty?.description
            }}
            onSubmit={async (values) => {
                if (router.query.id) {
                    updateSpecialtyMutation.mutate({
                        ...values,
                        specialtyId: specialty.specialtyId
                    })
                } else {
                    addSpecialtyMutation.mutate(values)
                }
            }}>
            {() => (
                <Form autoComplete='off' noValidate>
                    <InputField
                        required
                        name='label'
                        placeholder='nom'
                        label='Nom'/>
                    <InputField
                        required
                        name='title'
                        placeholder='titre'
                        label='Titre'/>
                    <InputField
                        textarea
                        required
                        name='description'
                        placeholder='description'
                        label='Description'/>
                    <hr className='mt-8'/>
                    <FormFooterButtons
                        updateMode={!!router.query.id}
                        createMode={createMode}
                        setCreateMode={setCreateMode}
                        onCancel={() => router.back()}
                        processing={addSpecialtyMutation != null ? addSpecialtyMutation.isLoading : updateSpecialtyMutation.isLoading}/>
                </Form>
            )}
        </Formik>
    )
}
