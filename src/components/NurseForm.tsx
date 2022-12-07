import React, {MutableRefObject, useEffect, useState} from "react";
import moment from "moment";
import {Form, Formik, Field} from "formik";
import {InputField} from "./InputField";
import Select from "react-select";
import {DatePickerInput} from "./DatePickerInput";
import {PhoneNumberInput} from "./PhoneNumberInput";
import {FormFooterButtons} from "./FormFooterButtons";
import * as yup from "yup";
import {UseMutationResult} from "react-query";
import {INurseCreate, INurseDetails} from "../types/nurse";
import {useRouter} from "next/router";
import countryList from 'react-select-country-list'
import {AvatarPicker} from ".";
import {fileValidator} from "../utils/Utils";
import {IHospital} from "../types/hospital";

interface Props {
    formikRef: MutableRefObject<any>
    createMode: 'single' | 'multiple'
    setCreateMode: (mode: 'single' | 'multiple') => void
    setNurseCreated?: (created: boolean) => void
    setNurseUpdated?: (updated: boolean) => void
    hospitals: IHospital[]
    nurseDetails?: INurseDetails
    addNurseMutation?: UseMutationResult<INurseDetails, unknown, INurseCreate>
    updateAvatarMutation?: UseMutationResult<string, unknown, any>
    updateNurseMutation?: UseMutationResult<INurseDetails, unknown, INurseCreate>
}

export const NurseForm: React.FC<Props> = (
    {
        formikRef,
        createMode,
        setCreateMode,
        setNurseCreated,
        setNurseUpdated,
        hospitals,
        nurseDetails,
        addNurseMutation,
        updateAvatarMutation,
        updateNurseMutation
    }
) => {
    const router = useRouter()
    const [avatar, setAvatar] = useState<File>(null)
    const [dialCode, setDialCode] = useState('+237')

    const NurseCreateSchema = yup.object().shape({
        firstName: yup.string().required('champs requis'),
        lastName: yup.string().required('champs requis'),
        bornOn: yup.date().required('champs requis'),
        placeOfBirth: yup.string().required('champs requis'),
        nationality: yup.string().required('champs requis'),
        email: yup.string().email().required('champs requis'),
        phoneNumber: yup.string().required('champs requis').min((dialCode.length + 1), "champs requis"),
        country: yup.string().required('champs requis'),
        address: yup.string().required('champs requis'),
        hospitalId: yup.string().required('champs requis'),
        city: yup.string().required('champs requis'),
        biography: yup.string().required('champs requis')
    });

    const {isSuccess: nurseAddSuccess} = addNurseMutation || {}
    const {isSuccess: nurseUpdateSuccess} = updateNurseMutation || {}
    const {isSuccess: avatarUpdateSuccess} = updateAvatarMutation || {}

    useEffect(() => {
        if (nurseAddSuccess) {
            if (avatar) {
                updateAvatarMutation.mutate({userId: addNurseMutation.data.userId, avatar})
            } else {
                setNurseCreated(true)
            }
        }
    }, [nurseAddSuccess])

    useEffect(() => {
        if (nurseUpdateSuccess) {
            if (avatar) {
                updateAvatarMutation.mutate({userId: updateNurseMutation.data.userId, avatar})
            } else {
                setNurseUpdated(true)
            }
        }
    }, [nurseUpdateSuccess])

    useEffect(() => {
        if (avatarUpdateSuccess) {
            if (nurseDetails) {
                setNurseUpdated(true)
            } else {
                setNurseCreated(true)
            }
        }
    }, [avatarUpdateSuccess])

    return (
        <Formik
            enableReinitialize
            innerRef={formikRef}
            validationSchema={NurseCreateSchema}
            initialValues={{
                firstName: nurseDetails?.firstName || '',
                lastName: nurseDetails?.lastName || '',
                bornOn: nurseDetails?.bornOn || '',
                placeOfBirth: nurseDetails?.placeOfBirth || '',
                nationality: nurseDetails?.nationality || '',
                email: nurseDetails?.email || '',
                phoneNumber: nurseDetails?.phoneNumber || '',
                country: nurseDetails?.country || '',
                address: nurseDetails?.address || '',
                hospitalId: '',
                city: nurseDetails?.city || '',
                biography: nurseDetails?.biography || '',
                avatar: '' as any
            }}
            onSubmit={async (values) => {
                const payload = {
                    ...values,
                    bornOn: moment(values.bornOn).format("yyyy-MM-DD")
                }
                if (router.query.id) {
                    if (values.avatar.name) {
                        setAvatar(values.avatar as File)
                    }
                    updateNurseMutation.mutate({
                        ...payload,
                        userId: nurseDetails.userId,
                        nurseId: nurseDetails.nurseId
                    })
                } else {
                    addNurseMutation.mutate(payload)
                }
            }}>
            {({setFieldValue, touched, errors}) => (
                <Form autoComplete='off' noValidate>
                    <div className='rounded-lg border-blue-300 border p-2 my-8 flex justify-center items-center'>
                        <Field
                            type='file'
                            avatarId={nurseDetails?.avatarId}
                            placeholder={nurseDetails ? `${nurseDetails?.firstName.charAt(0)} ${nurseDetails?.lastName.charAt(0)}` : null}
                            name='avatar'
                            accept='image/*'
                            validate={(file) => fileValidator(file, false, true)}
                            component={AvatarPicker}
                        />
                    </div>
                    <div className='flex space-x-4'>
                        <div className='flex-1 space-y-4'>
                            <InputField
                                required
                                name='firstName'
                                placeholder='prénoms'
                                label='Prénoms'/>
                            <InputField
                                required
                                name='lastName'
                                placeholder='noms'
                                label='Noms'/>
                            <InputField
                                required
                                name='placeOfBirth'
                                placeholder='lieu de naissance'
                                label='Lieu de naissance'/>
                            <DatePickerInput
                                label='Date de naissance'
                                name='bornOn'/>
                            <div>
                                <label
                                    className="!font-normal text-sm mb-1 text-gray-600 after:content-['*'] after:ml-0.5 after:text-red-500 after:inline-block"
                                    htmlFor='nationality'>Nationalité</label>
                                <Select
                                    onChange={(newValue: any) => {
                                        console.log(newValue)
                                        setFieldValue('nationality', newValue?.value)
                                    }}
                                    className="basic-single rounded-md"
                                    classNamePrefix="select"
                                    styles={{
                                        control: (base) => (errors.nationality && touched.nationality ? {
                                            ...base, ...{
                                                borderRadius: '0.375rem',
                                                borderColor: '#f00',
                                                borderWidth: '2px',
                                            }
                                        } : {...base})
                                    }}
                                    placeholder='Sélectionner une nationalité'
                                    isSearchable={true}
                                    name='nationality'
                                    inputId='nationality'
                                    id='nationality'
                                    instanceId='nationality'
                                    defaultValue={countryList().data.find(country => country.value === nurseDetails?.nationality)}
                                    options={countryList().data.map((country) => ({
                                        label: country.label,
                                        value: country.value
                                    }))}/>
                                <label
                                    className={`!font-normal !mb-0 text-red-500 !transition-transform duration-500 ease-out overflow-hidden ${errors.nationality && touched.nationality ? 'visible' : 'hidden'}`}>{errors.nationality}</label>
                            </div>
                            <InputField
                                type={'email'}
                                required
                                label='Adresse email'
                                name='email'
                                placeholder='adresse email'/>
                        </div>
                        <div className='flex-1 space-y-4'>
                            <PhoneNumberInput
                                setDialCode={setDialCode}
                                label='Téléphone'
                                name='phoneNumber'/>
                            <div>
                                <label
                                    className="!font-normal text-sm mb-1 text-gray-600 after:content-['*'] after:ml-0.5 after:text-red-500 after:inline-block"
                                    htmlFor='country'>Pays de résidence</label>
                                <Select
                                    onChange={(newValue: any) => setFieldValue('country', newValue?.value)}
                                    className="basic-single rounded-md"
                                    classNamePrefix="select"
                                    styles={{
                                        control: (base) => (errors.country && touched.country ? {
                                            ...base, ...{
                                                borderRadius: '0.375rem',
                                                borderColor: '#f00',
                                                borderWidth: '2px',
                                            }
                                        } : {...base})
                                    }}
                                    placeholder='Sélectionner un pays'
                                    isSearchable={true}
                                    name='country'
                                    inputId='country'
                                    id='country'
                                    instanceId='country'
                                    defaultValue={countryList().data.find(country => country.value === nurseDetails?.country)}
                                    options={countryList().data.map((country) => ({
                                        label: country.label,
                                        value: country.value
                                    }))}/>
                                <label
                                    className={`!font-normal !mb-0 text-red-500 !transition-transform duration-500 ease-out overflow-hidden ${errors.country && touched.country ? 'visible' : 'hidden'}`}>{errors.country}</label>
                            </div>
                            <InputField
                                type={'text'}
                                required
                                label='Ville de résidence'
                                name='city'
                                placeholder='ville de résidence'/>
                            <InputField
                                type={'text'}
                                required
                                label='Adresse'
                                name='address'
                                placeholder='adresse'/>
                            <div>
                                <label
                                    className="!font-normal text-sm mb-1 text-gray-600 after:content-['*'] after:ml-0.5 after:text-red-500 after:inline-block"
                                    htmlFor='hospitalId'>Hôpital d&apos;exercice</label>
                                <Select
                                    onChange={(newValue: any) => setFieldValue('hospitalId', newValue?.value)}
                                    className="basic-single rounded-md"
                                    classNamePrefix="select"
                                    styles={{
                                        control: (base) => (errors.hospitalId && touched.hospitalId ? {
                                            ...base, ...{
                                                borderRadius: '0.375rem',
                                                borderColor: '#f00',
                                                borderWidth: '2px',
                                            }
                                        } : {...base})
                                    }}
                                    placeholder='Sélectionner un hôpital'
                                    isSearchable={true}
                                    name='hospitalId'
                                    inputId='hospitalId'
                                    id='hospitalId'
                                    instanceId='hospitalId'
                                    defaultValue={hospitals.filter(hospital => hospital.hospitalId === nurseDetails?.hospitalId).map(hospital => ({
                                        label: hospital.name,
                                        value: hospital.hospitalId
                                    }))[0]}
                                    options={hospitals.map(hospital => ({
                                        label: hospital.name,
                                        value: hospital.hospitalId
                                    }))}/>
                                <label
                                    className={`!font-normal !mb-0 text-red-500 !transition-transform duration-500 ease-out overflow-hidden ${errors.hospitalId && touched.hospitalId ? 'visible' : 'hidden'}`}>{errors.hospitalId}</label>
                            </div>
                            <InputField
                                textarea
                                required
                                label='Biographie'
                                name='biography'
                                placeholder='biographie'/>
                        </div>
                    </div>
                    <hr className='mt-8'/>
                    <FormFooterButtons
                        updateMode={!!router.query.id}
                        createMode={createMode}
                        setCreateMode={setCreateMode}
                        onCancel={() => router.back()}
                        processing={addNurseMutation != null ? addNurseMutation.isLoading : updateNurseMutation.isLoading}/>
                </Form>
            )}
        </Formik>
    )
}
