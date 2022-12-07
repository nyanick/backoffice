import React, {MutableRefObject, useEffect} from "react";
import {Form, Formik} from "formik";
import {InputField} from "./InputField";
import {FormFooterButtons} from "./FormFooterButtons";
import * as yup from "yup";
import {UseMutationResult} from "react-query";
import {useRouter} from "next/router";
import {IHospital, IHospitalCreate} from "../types/hospital";
import Select from "react-select";
import {IUser} from "../types/user";

interface Props {
    formikRef: MutableRefObject<any>
    createMode: 'single' | 'multiple'
    setCreateMode: (mode: 'single' | 'multiple') => void
    setHospitalCreated?: (created: boolean) => void
    setHospitalUpdated?: (updated: boolean) => void
    users: IUser[]
    hospital?: IHospital
    addHospitalMutation?: UseMutationResult<IHospital, unknown, IHospitalCreate>
    updateHospitalMutation?: UseMutationResult<IHospital, unknown, IHospital>
}

export const HospitalForm: React.FC<Props> = (
    {
        formikRef,
        createMode,
        setCreateMode,
        setHospitalCreated,
        setHospitalUpdated,
        users,
        hospital,
        addHospitalMutation,
        updateHospitalMutation
    }
) => {
    const router = useRouter()

    const HospitalCreateSchema = yup.object().shape({
        name: yup.string().required('champs requis'),
        address: yup.string().required('champs requis'),
        city: yup.string().required('champs requis'),
        managerUserId: yup.string().required('champs requis')
    });

    const {isSuccess: hospitalAddSuccess} = addHospitalMutation || {}
    const {isSuccess: hospitalUpdateSuccess} = updateHospitalMutation || {}

    useEffect(() => {
        if (hospitalAddSuccess) {
            setHospitalCreated(true)
        }
    }, [hospitalAddSuccess])

    useEffect(() => {
        if (hospitalUpdateSuccess) {
            setHospitalUpdated(true)
        }
    }, [hospitalUpdateSuccess])

    return (
        <Formik
            enableReinitialize
            innerRef={formikRef}
            validationSchema={HospitalCreateSchema}
            initialValues={{
                name: hospital?.name,
                address: hospital?.address,
                city: hospital?.city,
                managerUserId: hospital?.managerUserId || ''
            }}
            onSubmit={async (values) => {
                if (router.query.id) {
                    updateHospitalMutation.mutate({
                        ...values,
                        hospitalId: hospital.hospitalId,
                        shortCode: hospital.shortCode
                    })
                } else {
                    addHospitalMutation.mutate(values)
                }
            }}>
            {({setFieldValue, touched, errors}) => (
                <Form autoComplete='off' noValidate className='space-y-2'>
                    <InputField
                        required
                        name='name'
                        placeholder='nom'
                        label='Nom'/>
                    <InputField
                        required
                        name='address'
                        placeholder='Adresse'
                        label='Adresse'/>
                    <InputField
                        required
                        name='city'
                        placeholder='Ville'
                        label='Ville'/>
                    <div>
                        <label
                            className="!font-normal text-sm mb-1 text-gray-600 after:content-['*'] after:ml-0.5 after:text-red-500 after:inline-block"
                            htmlFor='managerUserId'>Administrateur</label>
                        <Select
                            onChange={(newValue: any) => setFieldValue('managerUserId', newValue?.value)}
                            className="basic-single rounded-md"
                            classNamePrefix="select"
                            styles={{
                                control: (base) => (errors.managerUserId && touched.managerUserId ? {
                                    ...base, ...{
                                        borderRadius: '0.375rem',
                                        borderColor: '#f00',
                                        borderWidth: '2px',
                                    }
                                } : {...base})
                            }}
                            placeholder='Sélectionner un administrateur'
                            isSearchable={true}
                            name='managerUserId'
                            inputId='managerUserId'
                            id='managerUserId'
                            instanceId='managerUserId'
                            defaultValue={users.filter(user => user.userId === hospital?.managerUserId).map(user => ({
                                label: `${user.firstName} ${user.lastName}`,
                                value: user.userId
                            }))[0]}
                            options={users.map(user => ({
                                label: `${user.firstName} ${user.lastName}`,
                                value: user.userId
                            }))}/>
                        <label
                            className={`!font-normal !mb-0 text-red-500 !transition-transform duration-500 ease-out overflow-hidden ${errors.managerUserId && touched.managerUserId ? 'visible' : 'hidden'}`}>{errors.managerUserId}</label>
                    </div>
                    <hr className='mt-8'/>
                    <FormFooterButtons
                        updateMode={!!router.query.id}
                        createMode={createMode}
                        setCreateMode={setCreateMode}
                        onCancel={() => router.back()}
                        processing={addHospitalMutation != null ? addHospitalMutation.isLoading : updateHospitalMutation.isLoading}/>
                </Form>
            )}
        </Formik>
    )
}
