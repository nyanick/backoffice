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
import {ISpecialty} from "../types/specialty";
import {IDoctorCreate, IDoctorDetails} from "../types/doctor";
import {useRouter} from "next/router";
import countryList from 'react-select-country-list'
import {AvatarPicker} from ".";
import {fileValidator} from "../utils/Utils";
import {IHospital} from "../types/hospital";

interface Props {
    formikRef: MutableRefObject<any>
    createMode: 'single' | 'multiple'
    setCreateMode: (mode: 'single' | 'multiple') => void
    setDoctorCreated?: (created: boolean) => void
    setDoctorUpdated?: (updated: boolean) => void
    specialties: ISpecialty[]
    hospitals: IHospital[]
    doctorsDetails?: IDoctorDetails
    addDoctorMutation?: UseMutationResult<IDoctorDetails, unknown, IDoctorCreate>
    updateAvatarMutation?: UseMutationResult<string, unknown, any>
    updateDoctorMutation?: UseMutationResult<IDoctorDetails, unknown, IDoctorCreate>
}

export const DoctorForm: React.FC<Props> = (
    {
        formikRef,
        createMode,
        setCreateMode,
        setDoctorCreated,
        setDoctorUpdated,
        specialties,
        hospitals,
        doctorsDetails,
        addDoctorMutation,
        updateAvatarMutation,
        updateDoctorMutation
    }
) => {
    const router = useRouter()
    const [avatar, setAvatar] = useState<File>(null)
    const [dialCode, setDialCode] = useState('+237')

    const DoctorCreateSchema = yup.object().shape({
        firstName: yup.string().required('champs requis'),
        lastName: yup.string().required('champs requis'),
        bornOn: yup.date().required('champs requis'),
        placeOfBirth: yup.string().required('champs requis'),
        nationality: yup.string().required('champs requis'),
        email: yup.string().email().required('champs requis'),
        phoneNumber: yup.string().required('champs requis').min((dialCode.length + 1), "champs requis"),
        country: yup.string().required('champs requis'),
        address: yup.string().required('champs requis'),
        specialtyId: yup.string().required('champs requis'),
        hospitalIds: yup.array().min(1, 'champs requis'),
        nationalOrderId: yup.string().required('champs requis'),
        city: yup.string().required('champs requis'),
        biography: yup.string().required('champs requis')
    });

    const {isSuccess: doctorAddSuccess} = addDoctorMutation || {}
    const {isSuccess: doctorUpdateSuccess} = updateDoctorMutation || {}
    const {isSuccess: avatarUpdateSuccess} = updateAvatarMutation || {}

    useEffect(() => {
        if (doctorAddSuccess) {
            if (avatar) {
                updateAvatarMutation.mutate({userId: addDoctorMutation.data.userId, avatar})
            } else {
                setDoctorCreated(true)
            }
        }
    }, [doctorAddSuccess])

    useEffect(() => {
        if (doctorUpdateSuccess) {
            if (avatar) {
                updateAvatarMutation.mutate({userId: updateDoctorMutation.data.userId, avatar})
            } else {
                setDoctorUpdated(true)
            }
        }
    }, [doctorUpdateSuccess])

    useEffect(() => {
        if (avatarUpdateSuccess) {
            if (doctorsDetails) {
                setDoctorUpdated(true)
            } else {
                setDoctorCreated(true)
            }
        }
    }, [avatarUpdateSuccess])

    return (
        <Formik
            enableReinitialize
            innerRef={formikRef}
            validationSchema={DoctorCreateSchema}
            initialValues={{
                firstName: doctorsDetails?.firstName || '',
                lastName: doctorsDetails?.lastName || '',
                bornOn: doctorsDetails?.bornOn || '',
                placeOfBirth: doctorsDetails?.placeOfBirth || '',
                nationality: doctorsDetails?.nationality || '',
                email: doctorsDetails?.email || '',
                phoneNumber: doctorsDetails?.phoneNumber || '',
                country: doctorsDetails?.country || '',
                address: doctorsDetails?.address || '',
                specialtyId: doctorsDetails?.specialtyId || '',
                hospitalIds: doctorsDetails?.hospitalIds || [],
                nationalOrderId: doctorsDetails?.nationalOrderId || '',
                city: doctorsDetails?.city || '',
                biography: doctorsDetails?.biography || '',
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
                    updateDoctorMutation.mutate({
                        ...payload,
                        userId: doctorsDetails.userId,
                        doctorId: doctorsDetails.doctorId
                    })
                } else {
                    addDoctorMutation.mutate(payload)
                }
            }}>
            {({setFieldValue, touched, errors}) => (
                <Form autoComplete='off' noValidate>
                    <div className='rounded-lg border-blue-300 border p-2 my-8 flex justify-center items-center'>
                        <Field
                            type='file'
                            avatarId={doctorsDetails?.avatarId}
                            placeholder={doctorsDetails ? `${doctorsDetails?.firstName.charAt(0)} ${doctorsDetails?.lastName.charAt(0)}` : null}
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
                            <div>
                                <label
                                    className="!font-normal text-sm mb-1 text-gray-600 after:content-['*'] after:ml-0.5 after:text-red-500 after:inline-block"
                                    htmlFor='specialtyId'>Spécialité</label>
                                <Select
                                    onChange={(newValue: any) => setFieldValue('specialtyId', newValue?.value)}
                                    className="basic-single rounded-md"
                                    classNamePrefix="select"
                                    styles={{
                                        control: (base) => (errors.specialtyId && touched.specialtyId ? {
                                            ...base, ...{
                                                borderRadius: '0.375rem',
                                                borderColor: '#f00',
                                                borderWidth: '2px',
                                            }
                                        } : {...base})
                                    }}
                                    placeholder='Sélectionner une spécialité'
                                    isSearchable={true}
                                    name='specialtyId'
                                    inputId='specialtyId'
                                    id='specialtyId'
                                    instanceId='specialtyId'
                                    defaultValue={specialties.filter(specialty => specialty.specialtyId === doctorsDetails?.specialtyId).map(item => ({
                                        label: item.label,
                                        value: item.specialtyId
                                    }))[0]}
                                    options={specialties.map(specialty => ({
                                        label: specialty.label,
                                        value: specialty.specialtyId
                                    }))}/>
                                <label
                                    className={`!font-normal !mb-0 text-red-500 !transition-transform duration-500 ease-out overflow-hidden ${errors.specialtyId && touched.specialtyId ? 'visible' : 'hidden'}`}>{errors.specialtyId}</label>
                            </div>
                            <InputField
                                required
                                name='placeOfBirth'
                                placeholder='lieu de naissance'
                                label='Lieu de naissance'
                            />
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
                                    defaultValue={countryList().data.find(country => country.value === doctorsDetails?.nationality)}
                                    options={countryList().data.map((country) => ({
                                        label: country.label,
                                        value: country.value
                                    }))}/>
                                <label
                                    className={`!font-normal !mb-0 text-red-500 !transition-transform duration-500 ease-out overflow-hidden ${errors.nationality && touched.nationality ? 'visible' : 'hidden'}`}>{errors.nationality}</label>
                            </div>
                            <InputField
                                required
                                name='nationalOrderId'
                                placeholder="numéro d'ordre"
                                label="Numéro d'ordre national"/>
                        </div>
                        <div className='flex-1 space-y-4'>
                            <InputField
                                type={'email'}
                                required
                                label='Adresse email'
                                name='email'
                                placeholder='adresse email'/>
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
                                    defaultValue={countryList().data.find(country => country.value === doctorsDetails?.country)}
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
                                    htmlFor='hospitalIds'>Hôpitaux d&apos;exercice</label>
                                <Select
                                    onChange={(items: any) => setFieldValue('hospitalIds', items.map(item => item.value))}
                                    className="basic-multi-select rounded-md"
                                    classNamePrefix="select"
                                    isMulti
                                    styles={{
                                        control: (base) => (errors.hospitalIds && touched.hospitalIds ? {
                                            ...base, ...{
                                                borderRadius: '0.375rem',
                                                borderColor: '#f00',
                                                borderWidth: '2px',
                                            }
                                        } : {...base})
                                    }}
                                    placeholder='Sélectionner des hôpitaux'
                                    isSearchable={true}
                                    name='hospitalIds'
                                    inputId='hospitalIds'
                                    id='hospitalIds'
                                    instanceId='hospitalIds'
                                    defaultValue={hospitals.filter(hospital => doctorsDetails?.hospitalIds.includes(hospital.hospitalId)).map(hospital => ({
                                        label: hospital.name,
                                        value: hospital.hospitalId
                                    }))}
                                    options={hospitals.map(hospital => ({
                                        label: hospital.name,
                                        value: hospital.hospitalId
                                    }))}/>
                                <label
                                    className={`!font-normal !mb-0 text-red-500 !transition-transform duration-500 ease-out overflow-hidden ${errors.hospitalIds && touched.hospitalIds ? 'visible' : 'hidden'}`}>{errors.hospitalIds}</label>
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
                        processing={addDoctorMutation != null ? addDoctorMutation.isLoading : updateDoctorMutation.isLoading}/>
                </Form>
            )}
        </Formik>
    )
}
