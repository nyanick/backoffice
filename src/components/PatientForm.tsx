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
import {IPatientEdit, IPatientDetails} from "../types/patient";
import {useRouter} from "next/router";
import countryList from 'react-select-country-list'
import {AvatarPicker} from ".";
import {fileValidator} from "../utils/Utils";

interface Props {
    formikRef: MutableRefObject<any>
    createMode: 'single' | 'multiple'
    setCreateMode: (mode: 'single' | 'multiple') => void
    setPatientCreated?: (created: boolean) => void
    setPatientUpdated?: (updated: boolean) => void
    patientsDetails?: IPatientDetails
    addPatientMutation?: UseMutationResult<IPatientDetails, unknown, IPatientEdit>
    updateAvatarMutation?: UseMutationResult<string, unknown, { userId: string, avatar: File }>
    updatePatientMutation?: UseMutationResult<IPatientDetails, unknown, IPatientEdit>
}

export const PatientForm: React.FC<Props> = (
    {
        formikRef,
        createMode,
        setCreateMode,
        setPatientCreated,
        setPatientUpdated,
        patientsDetails,
        addPatientMutation,
        updateAvatarMutation,
        updatePatientMutation
    }
) => {
    const router = useRouter()
    const [avatar, setAvatar] = useState<File>(null)
    const [dialCode, setDialCode] = useState('+237')

    const PatientCreateSchema = yup.object().shape({
        firstName: yup.string().required('champs requis'),
        lastName: yup.string().required('champs requis'),
        bornOn: yup.date().required('champs requis'),
        placeOfBirth: yup.string().required('champs requis'),
        nationality: yup.string().required('champs requis'),
        email: yup.string().email().required('champs requis'),
        phoneNumber: yup.string().required('champs requis').min((dialCode.length + 1), "champs requis"),
        country: yup.string().required('champs requis'),
        address: yup.string().required('champs requis'),
        city: yup.string().required('champs requis'),
        gender: yup.string().required('champs requis'),
        bloodGroup: yup.string().required('champs requis'),
        rhesusFactor: yup.string().required('champs requis'),
    });

    const {isSuccess: patientAddSuccess} = addPatientMutation || {}
    const {isSuccess: patientUpdateSuccess} = updatePatientMutation || {}
    const {isSuccess: avatarUpdateSuccess} = updateAvatarMutation || {}

    const genderList = ["Homme", "Femme"];
    const bloodGroupList = ["A", "B","AB","O","Indéterminé"];
    const rhesusFactorList = ["-", "+","Indéterminé"];

    useEffect(() => {
        if(patientAddSuccess) {
            if (avatar) {
                updateAvatarMutation.mutate({userId: addPatientMutation.data.userId, avatar})
            } else {
                setPatientCreated(true)
            }
        }
    }, [patientAddSuccess])

    useEffect(() => {
        if(patientUpdateSuccess) {
            if (avatar) {
                updateAvatarMutation.mutate({userId: updatePatientMutation.data.userId, avatar})
            } else {
                setPatientUpdated(true)
            }
        }
    }, [patientUpdateSuccess])

    useEffect(() => {
        if(avatarUpdateSuccess) {
            if (patientsDetails) {
                setPatientUpdated(true)
            } else {
                setPatientCreated(true)
            }
        }
    }, [avatarUpdateSuccess])

    return (
        <Formik
            enableReinitialize
            innerRef={formikRef}
            validationSchema={PatientCreateSchema}
            initialValues={{
                firstName: patientsDetails?.firstName || '',
                lastName: patientsDetails?.lastName || '',
                bornOn: patientsDetails?.bornOn || '',
                placeOfBirth: patientsDetails?.placeOfBirth || '',
                nationality: patientsDetails?.nationality || '',
                email: patientsDetails?.email || '',
                phoneNumber: patientsDetails?.phoneNumber || '',
                country: patientsDetails?.country || '',
                address: patientsDetails?.address || '',
                city: patientsDetails?.city || '',
                gender: patientsDetails?.gender || '',
                bloodGroup: patientsDetails?.bloodGroup || '',
                rhesusFactor: patientsDetails?.rhesusFactor || '',
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
                    updatePatientMutation.mutate({
                        ...payload,
                        userId: patientsDetails.userId,
                        patientId: patientsDetails.patientId
                    })
                } else {
                    addPatientMutation.mutate(payload)
                }
            }}>
            {({setFieldValue, touched, errors}) => (
                <Form autoComplete='off' noValidate>
                    <div className='rounded-lg border-blue-300 border p-2 my-8 flex justify-center items-center'>
                        <Field
                            type='file'
                            avatarId={patientsDetails?.avatarId}
                            placeholder={patientsDetails ? `${patientsDetails?.firstName.charAt(0)} ${patientsDetails?.lastName.charAt(0)}` : null}
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
                                label='Lieu de naissance'
                            />
                            <DatePickerInput
                                label='Date de naissance'
                                name='bornOn'/>
                            <div>
                                <label
                                    className="!font-normal text-sm mb-1 text-gray-600 after:content-['*'] after:ml-0.5 after:text-red-500 after:inline-block"
                                    htmlFor='sexe'>Sexe</label>
                                <Select
                                    onChange={(newValue: any) => setFieldValue('gender', newValue?.value)}
                                    className="basic-single rounded-md"
                                    classNamePrefix="select"
                                    styles={{
                                        control: (base) => (errors.gender && touched.gender ? {
                                            ...base, ...{
                                                borderRadius: '0.375rem',
                                                borderColor: '#f00',
                                                borderWidth: '2px',
                                            }
                                        } : {...base})
                                    }}
                                    placeholder='Sélectionner le sexe'
                                    isSearchable={true}
                                    name='gender'
                                    inputId='gender'
                                    id='gender'
                                    instanceId='gender'
                                    defaultValue={genderList.find(gender => gender === patientsDetails?.gender)}
                                    options={genderList.map((gender) => ({
                                        label: gender,
                                        value: gender
                                    }))}/>
                                <label
                                    className={`!font-normal !mb-0 text-red-500 !transition-transform duration-500 ease-out overflow-hidden ${errors.gender && touched.gender ? 'visible' : 'hidden'}`}>{errors.gender}</label>
                            </div>
                            <div>
                                <label
                                    className="!font-normal text-sm mb-1 text-gray-600 after:content-['*'] after:ml-0.5 after:text-red-500 after:inline-block"
                                    htmlFor='bloodGroup'>Groupe Sanguin</label>
                                <Select
                                    onChange={(newValue: any) => setFieldValue('bloodGroup', newValue?.value)}
                                    className="basic-single rounded-md"
                                    classNamePrefix="select"
                                    styles={{
                                        control: (base) => (errors.bloodGroup && touched.bloodGroup ? {
                                            ...base, ...{
                                                borderRadius: '0.375rem',
                                                borderColor: '#f00',
                                                borderWidth: '2px',
                                            }
                                        } : {...base})
                                    }}
                                    placeholder='Sélectionner le Groupe Sanguin'
                                    isSearchable={true}
                                    name='bloodGroup'
                                    inputId='bloodGroup'
                                    id='bloodGroup'
                                    instanceId='bloodGroup'
                                    defaultValue={bloodGroupList.find(bloodGroup => bloodGroup === patientsDetails?.bloodGroup)}
                                    options={bloodGroupList.map((bloodGroup) => ({
                                        label: bloodGroup,
                                        value: bloodGroup
                                    }))}/>
                                <label
                                    className={`!font-normal !mb-0 text-red-500 !transition-transform duration-500 ease-out overflow-hidden ${errors.bloodGroup && touched.bloodGroup ? 'visible' : 'hidden'}`}>{errors.bloodGroup}</label>
                            </div>
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
                                    defaultValue={countryList().data.find(country => country.value === patientsDetails?.nationality)}
                                    options={countryList().data.map((country) => ({
                                        label: country.label,
                                        value: country.value
                                    }))}/>
                                <label
                                    className={`!font-normal !mb-0 text-red-500 !transition-transform duration-500 ease-out overflow-hidden ${errors.nationality && touched.nationality ? 'visible' : 'hidden'}`}>{errors.nationality}</label>
                            </div>
                        </div>
                        <div className='flex-1 space-y-4'>
                            <InputField
                                type={'email'}
                                required
                                label='Adresse email'
                                name='email'
                                placeholder='adresse email'/>
                            <PhoneNumberInput
                                label='Téléphone'
                                name='phoneNumber'
                                setDialCode={setDialCode}/>
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
                                    defaultValue={countryList().data.find(country => country.value === patientsDetails?.country)}
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
                                    htmlFor='rhesusFactor'>Rhesus</label>
                                <Select
                                    onChange={(newValue: any) => setFieldValue('rhesusFactor', newValue?.value)}
                                    className="basic-single rounded-md"
                                    classNamePrefix="select"
                                    styles={{
                                        control: (base) => (errors.rhesusFactor && touched.rhesusFactor ? {
                                            ...base, ...{
                                                borderRadius: '0.375rem',
                                                borderColor: '#f00',
                                                borderWidth: '2px',
                                            }
                                        } : {...base})
                                    }}
                                    placeholder='Sélectionner le Rhesus'
                                    isSearchable={true}
                                    name='rhesusFactor'
                                    inputId='rhesusFactor'
                                    id='rhesusFactor'
                                    instanceId='rhesusFactor'
                                    defaultValue={rhesusFactorList.find(rhesusFactor => rhesusFactor === patientsDetails?.rhesusFactor)}
                                    options={rhesusFactorList.map((rhesusFactor) => ({
                                        label: rhesusFactor,
                                        value: rhesusFactor
                                    }))}/>
                                <label
                                    className={`!font-normal !mb-0 text-red-500 !transition-transform duration-500 ease-out overflow-hidden ${errors.rhesusFactor && touched.rhesusFactor ? 'visible' : 'hidden'}`}>{errors.rhesusFactor}</label>
                            </div>
                        </div>
                    </div>
                    <hr className='mt-8'/>
                    <FormFooterButtons
                        updateMode={!!router.query.id}
                        createMode={createMode}
                        setCreateMode={setCreateMode}
                        onCancel={() => router.back()}
                        processing={addPatientMutation != null ? addPatientMutation.isLoading : updatePatientMutation.isLoading}/>
                </Form>
            )}
        </Formik>
    )
}
