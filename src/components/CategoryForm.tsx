import React, {MutableRefObject, useEffect} from "react";
import {Form, Formik} from "formik";
import {InputField} from "./InputField";
import {FormFooterButtons} from "./FormFooterButtons";
import * as yup from "yup";
import {UseMutationResult} from "react-query";
import {useRouter} from "next/router";
import {ICategory, ICategoryCreate} from "../types/category";
import {IGroup} from "../types/group";
import Select from "react-select";

interface Props {
    formikRef: MutableRefObject<any>
    createMode: 'single' | 'multiple'
    setCreateMode: (mode: 'single' | 'multiple') => void
    setCategoryCreated?: (created: boolean) => void
    setCategoryUpdated?: (updated: boolean) => void
    groups: IGroup[]
    category?: ICategory
    addCategoryMutation?: UseMutationResult<ICategory, unknown, ICategoryCreate>
    updateCategoryMutation?: UseMutationResult<ICategory, unknown, ICategory>
}

export const CategoryForm: React.FC<Props> = (
    {
        formikRef,
        createMode,
        setCreateMode,
        setCategoryCreated,
        setCategoryUpdated,
        groups,
        category,
        addCategoryMutation,
        updateCategoryMutation
    }
) => {
    const router = useRouter()

    const CategoryCreateSchema = yup.object().shape({
        name: yup.string().required('champs requis'),
        groupId: yup.string().required('champs requis')
    });

    const {isSuccess: categoryAddSuccess} = addCategoryMutation || {}
    const {isSuccess: categoryUpdateSuccess} = updateCategoryMutation || {}

    useEffect(() => {
        if (categoryAddSuccess) {
            setCategoryCreated(true)
        }
    }, [categoryAddSuccess])

    useEffect(() => {
        if (categoryUpdateSuccess) {
            setCategoryUpdated(true)
        }
    }, [categoryUpdateSuccess])

    return (
        <Formik
            enableReinitialize
            innerRef={formikRef}
            validationSchema={CategoryCreateSchema}
            initialValues={{
                name: category?.name,
                groupId: category?.groupId || ''
            }}
            onSubmit={async (values) => {
                if (router.query.id) {
                    updateCategoryMutation.mutate({
                        ...values,
                        categoryId: category.categoryId
                    })
                } else {
                    addCategoryMutation.mutate(values)
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
                            htmlFor='groupId'>Groupe</label>
                        <Select
                            onChange={(newValue: any) => setFieldValue('groupId', newValue?.value)}
                            className="basic-single rounded-md"
                            classNamePrefix="select"
                            styles={{
                                control: (base) => (errors.groupId && touched.groupId ? {
                                    ...base, ...{
                                        borderRadius: '0.375rem',
                                        borderColor: '#f00',
                                        borderWidth: '2px',
                                    }
                                } : {...base})
                            }}
                            placeholder='Sélectionner un groupe'
                            isSearchable={true}
                            name='groupId'
                            inputId='groupId'
                            id='groupId'
                            instanceId='groupId'
                            defaultValue={groups.filter(group => group.groupId === category?.groupId).map(item => ({
                                label: item.name,
                                value: item.groupId
                            }))[0]}
                            options={groups.map(group => ({
                                label: group.name,
                                value: group.groupId
                            }))}/>
                        <label
                            className={`!font-normal !mb-0 text-red-500 !transition-transform duration-500 ease-out overflow-hidden ${errors.groupId && touched.groupId ? 'visible' : 'hidden'}`}>{errors.groupId}</label>
                    </div>
                    <hr className='mt-8'/>
                    <FormFooterButtons
                        updateMode={!!router.query.id}
                        createMode={createMode}
                        setCreateMode={setCreateMode}
                        onCancel={() => router.back()}
                        processing={addCategoryMutation != null ? addCategoryMutation.isLoading : updateCategoryMutation.isLoading}/>
                </Form>
            )}
        </Formik>
    )
}
