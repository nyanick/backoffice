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
import {useRouter} from "next/router";
import countryList from 'react-select-country-list'
import {AvatarPicker} from ".";
import {fileValidator} from "../utils/Utils";
import {IAuthority, IUser, IUserCreate} from "../types/user";

interface Props {
    formikRef: MutableRefObject<any>
    createMode: 'single' | 'multiple'
    setCreateMode: (mode: 'single' | 'multiple') => void
    setAdminCreated?: (created: boolean) => void
    setAdminUpdated?: (updated: boolean) => void
    admin?: IUser
    authorities: IAuthority[]
    addUserMutation?: UseMutationResult<IUser, unknown, IUserCreate>
    updateAvatarMutation?: UseMutationResult<string, unknown, { userId: string, avatar: File }>
    updateUserMutation?: UseMutationResult<IUser, unknown, IUser>
}

export const AdminForm: React.FC<Props> = (
    {
        formikRef,
        createMode,
        setCreateMode,
        setAdminCreated,
        setAdminUpdated,
        admin,
        authorities,
        addUserMutation,
        updateAvatarMutation,
        updateUserMutation
    }
) => {
    const router = useRouter()
    const [avatar, setAvatar] = useState<File>(null)
    const [dialCode, setDialCode] = useState('+237')

    const AdminCreateSchema = yup.object().shape({
        firstName: yup.string().required('champs requis'),
        lastName: yup.string().required('champs requis'),
        bornOn: yup.date().required('champs requis'),
        placeOfBirth: yup.string().required('champs requis'),
        nationality: yup.string().required('champs requis'),
        authority: yup.string().required('champs requis'),
        email: yup.string().email().required('champs requis'),
        phoneNumber: yup.string().required('champs requis')
            .min((dialCode.length + 1), "champs requis"),
        country: yup.string().required('champs requis'),
        address: yup.string().required('champs requis'),
        city: yup.string().required('champs requis'),
    });

    const {isSuccess: adminAddSuccess} = addUserMutation || {}
    const {isSuccess: adminUpdateSuccess} = updateUserMutation || {}
    const {isSuccess: avatarUpdateSuccess} = updateAvatarMutation || {}

    useEffect(() => {
        if (adminAddSuccess) {
            if (avatar) {
                updateAvatarMutation.mutate({userId: addUserMutation.data.userId, avatar})
            } else {
                setAdminCreated(true)
            }
        }
    }, [adminAddSuccess])

    useEffect(() => {
        if (adminUpdateSuccess) {
            if (avatar) {
                updateAvatarMutation.mutate({userId: updateUserMutation.data.userId, avatar})
            } else {
                setAdminUpdated(true)
            }
        }
    }, [adminUpdateSuccess])

    useEffect(() => {
        if (avatarUpdateSuccess) {
            if (admin) {
                setAdminUpdated(true)
            } else {
                setAdminCreated(true)
            }
        }
    }, [avatarUpdateSuccess])

    return (
        <Formik
            enableReinitialize
            innerRef={formikRef}
            validationSchema={AdminCreateSchema}
            initialValues={{
                firstName: admin?.firstName || '',
                lastName: admin?.lastName || '',
                bornOn: admin?.bornOn || '',
                placeOfBirth: admin?.placeOfBirth || '',
                nationality: admin?.nationality || '',
                authority: admin?.authorities[0] || '',
                email: admin?.email || '',
                phoneNumber: admin?.phoneNumber || '',
                country: admin?.country || '',
                address: admin?.address || '',
                city: admin?.city || '',
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
                    const authorities = [payload.authority]
                    delete payload.authority
                    updateUserMutation.mutate({
                        ...payload,
                        authorities,
                        userId: admin.userId
                    })
                } else {
                    const authorities = [payload.authority]
                    delete payload.authority
                    addUserMutation.mutate({...payload, authorities})
                }
            }}>
            {({setFieldValue, touched, errors}) => (
                <Form autoComplete='off' noValidate>
                    <div className='rounded-lg border-blue-300 border p-2 my-8 flex justify-center items-center'>
                        <Field
                            type='file'
                            avatarId={admin?.avatarId}
                            placeholder={admin ? `${admin?.firstName.charAt(0)} ${admin?.lastName.charAt(0)}` : null}
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
                            <div>
                                <label
                                    className="!font-normal text-sm mb-1 text-gray-600 after:content-['*'] after:ml-0.5 after:text-red-500 after:inline-block"
                                    htmlFor='authority'>Rôles</label>
                                <Select
                                    onChange={(newValue: any) => {
                                        setFieldValue('authority', newValue?.value)
                                    }}
                                    className="basic-single rounded-md"
                                    classNamePrefix="select"
                                    styles={{
                                        control: (base) => (errors.authority && touched.authority ? {
                                            ...base, ...{
                                                borderRadius: '0.375rem',
                                                borderColor: '#f00',
                                                borderWidth: '2px',
                                            }
                                        } : {...base})
                                    }}
                                    placeholder='Sélectionner un rôle'
                                    isSearchable={true}
                                    name='authority'
                                    inputId='authority'
                                    id='authority'
                                    instanceId='authority'
                                    defaultValue={authorities.find(authority => authority.value === admin?.authorities[0])}
                                    options={authorities}/>
                                <label
                                    className={`!font-normal !mb-0 text-red-500 !transition-transform duration-500 ease-out overflow-hidden ${errors.authority && touched.authority ? 'visible' : 'hidden'}`}>{errors.authority}</label>
                            </div>
                            <DatePickerInput
                                label='Date de naissance'
                                name='bornOn'/>
                            <div>
                                <label
                                    className="!font-normal text-sm mb-1 text-gray-600 after:content-['*'] after:ml-0.5 after:text-red-500 after:inline-block"
                                    htmlFor='nationality'>Nationalité</label>
                                <Select
                                    onChange={(newValue: any) => {
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
                                    defaultValue={countryList().data.find(country => country.value === admin?.nationality)}
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
                                    defaultValue={countryList().data.find(country => country.value === admin?.country)}
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
                        processing={addUserMutation != null ? addUserMutation.isLoading : updateUserMutation.isLoading}/>
                </Form>
            )}
        </Formik>
    )
}
