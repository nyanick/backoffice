import React, {MutableRefObject, useEffect} from "react";
import {Form, Formik} from "formik";
import {InputField} from "./InputField";
import {FormFooterButtons} from "./FormFooterButtons";
import * as yup from "yup";
import {UseMutationResult} from "react-query";
import {useRouter} from "next/router";
import {IGroup, IGroupCreate} from "../types/group";

interface Props {
    formikRef: MutableRefObject<any>
    createMode: 'single' | 'multiple'
    setCreateMode: (mode: 'single' | 'multiple') => void
    setGroupCreated?: (created: boolean) => void
    setGroupUpdated?: (updated: boolean) => void
    group?: IGroup
    addGroupMutation?: UseMutationResult<IGroup, unknown, IGroupCreate>
    updateGroupMutation?: UseMutationResult<IGroup, unknown, IGroup>
}

export const GroupForm: React.FC<Props> = (
    {
        formikRef,
        createMode,
        setCreateMode,
        setGroupCreated,
        setGroupUpdated,
        group,
        addGroupMutation,
        updateGroupMutation
    }
) => {
    const router = useRouter()

    const GroupCreateSchema = yup.object().shape({
        name: yup.string().required('champs requis')
    });

    const {isSuccess: groupAddSuccess} = addGroupMutation || {}
    const {isSuccess: groupUpdateSuccess} = updateGroupMutation || {}

    useEffect(() => {
        if (groupAddSuccess) {
            setGroupCreated(true)
        }
    }, [groupAddSuccess])

    useEffect(() => {
        if (groupUpdateSuccess) {
            setGroupUpdated(true)
        }
    }, [groupUpdateSuccess])

    return (
        <Formik
            enableReinitialize
            innerRef={formikRef}
            validationSchema={GroupCreateSchema}
            initialValues={{
                name: group?.name
            }}
            onSubmit={async (values) => {
                if (router.query.id) {
                    updateGroupMutation.mutate({
                        ...values,
                        groupId: group.groupId
                    })
                } else {
                    addGroupMutation.mutate(values)
                }
            }}>
            {() => (
                <Form autoComplete='off' noValidate>
                    <InputField
                        required
                        name='name'
                        placeholder='Nom de groupe'
                        label='Nom'/>
                    <hr className='mt-8'/>
                    <FormFooterButtons
                        updateMode={!!router.query.id}
                        createMode={createMode}
                        setCreateMode={setCreateMode}
                        onCancel={() => router.back()}
                        processing={addGroupMutation != null ? addGroupMutation.isLoading : updateGroupMutation.isLoading}/>
                </Form>
            )}
        </Formik>
    )
}
