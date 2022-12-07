import {NextPage} from "next";
import {useRouter} from "next/router";
import {useEditUser, useGetAuthorities, useUser} from "../../../hooks/user";
import {useUpdateAvatar} from "../../../hooks/storage";
import React, {useEffect, useRef, useState} from "react";
import {appRoutes} from "../../../constants";
import {AdminForm, UserEditSkeleton} from "../../../components";

const AdminEdit: NextPage = () => {
    const router = useRouter()
    const adminQuery = useUser(router.query.id as any)
    const updateUserMutation = useEditUser()
    const updateAvatarMutation = useUpdateAvatar()
    const authoritiesQuery = useGetAuthorities()
    const [adminUpdated, setAdminUpdated] = useState(false)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const formikRef = useRef(null)

    useEffect(() => {
        if (adminUpdated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_ADMINS).then()
            }
        }
    }, [adminUpdated])

    return (
        <section className='py-8 space-y-4 mx-16'>
            <h2 className='text-2xl font-medium'>Mettre à jour l&#39;administrateur</h2>
            {(authoritiesQuery.isLoading || adminQuery.isLoading) && <UserEditSkeleton/>}
            {(authoritiesQuery.data && adminQuery.data) && (
                <AdminForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setAdminUpdated={setAdminUpdated}
                    authorities={authoritiesQuery.data}
                    admin={adminQuery.data}
                    updateUserMutation={updateUserMutation}
                    updateAvatarMutation={updateAvatarMutation}/>
            )}
        </section>
    )
}

export default AdminEdit