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
import {IUser} from "../types/user";
import {useRouter} from "next/router";
import countryList from 'react-select-country-list'
import {AvatarPicker} from ".";
import {fileValidator} from "../utils/Utils";

interface Props {
    formikRef: MutableRefObject<any>
    createMode: 'single' | 'multiple'
    setCreateMode: (mode: 'single' | 'multiple') => void
    setUserUpdated?: (updated: boolean) => void
    user: IUser
    addUserMutation?: UseMutationResult<IUser, unknown, IUser>
    updateAvatarMutation?: UseMutationResult<string, unknown, { userId: string, avatar: File }>
    updateUserMutation?: UseMutationResult<IUser, unknown, IUser>
}

export const UserForm: React.FC<Props> = (
    {
        formikRef,
        createMode,
        setCreateMode,
        setUserUpdated,
        user,
        updateAvatarMutation,
        updateUserMutation
    }
) => {
    const router = useRouter()
    const [avatar, setAvatar] = useState<File>(null)
    const [dialCode, setDialCode] = useState('+237')

    const UserCreateSchema = yup.object().shape({
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
    });

    const {isSuccess: userUpdateSuccess} = updateUserMutation || {}
    const {isSuccess: avatarUpdateSuccess} = updateAvatarMutation || {}

    useEffect(() => {
        if(userUpdateSuccess) {
            if (avatar) {
                updateAvatarMutation.mutate({userId: updateUserMutation.data.userId, avatar})
            } else {
                setUserUpdated(true)
            }
        }
    }, [userUpdateSuccess])

    useEffect(() => {
        if(avatarUpdateSuccess) {
            setUserUpdated(true)
        }
    }, [avatarUpdateSuccess])

    return (
        <Formik
            enableReinitialize
            innerRef={formikRef}
            validationSchema={UserCreateSchema}
            initialValues={{
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                bornOn: user?.bornOn || '',
                placeOfBirth: user?.placeOfBirth || '',
                nationality: user?.nationality || '',
                email: user?.email || '',
                phoneNumber: user?.phoneNumber || '',
                country: user?.country || '',
                address: user?.address || '',
                city: user?.city || '',
                avatar: '' as any
            }}
            onSubmit={async (values) => {
                const payload = {
                    ...values,
                    bornOn: moment(values.bornOn).format("yyyy-MM-DD")
                }
                if (values.avatar.name) {
                    setAvatar(values.avatar as File)
                }
                updateUserMutation.mutate({
                    ...payload,
                    userId: user.userId,
                    authorities: user.authorities
                })
            }}>
            {({setFieldValue, touched, errors}) => (
                <Form autoComplete='off' noValidate>
                    <div className='rounded-lg border-blue-300 border p-2 my-8 flex justify-center items-center'>
                        <Field
                            type='file'
                            avatarId={user?.avatarId}
                            placeholder={user ? `${user?.firstName.charAt(0)} ${user?.lastName.charAt(0)}` : null}
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
                                    defaultValue={countryList().data.find(country => country.value === user?.nationality)}
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
                                    defaultValue={countryList().data.find(country => country.value === user?.country)}
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
                        </div>
                    </div>
                    <hr className='mt-8'/>
                    <FormFooterButtons
                        updateMode={!!router.query.id}
                        createMode={createMode}
                        setCreateMode={setCreateMode}
                        onCancel={() => router.back()}
                        processing={updateUserMutation.isLoading}/>
                </Form>
            )}
        </Formik>
    )
}
