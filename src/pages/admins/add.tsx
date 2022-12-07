import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import {appRoutes} from "../../constants";
import {AdminForm, UserEditSkeleton} from "../../components";
import {useAddUser, useGetAuthorities} from "../../hooks/user";
import {useUpdateAvatar} from "../../hooks/storage";

const AdminCreate: NextPage = () => {
    const router = useRouter()
    const addUserMutation = useAddUser()
    const updateAvatarMutation = useUpdateAvatar()
    const authoritiesQuery = useGetAuthorities()
    const [adminCreated, setPatientCreated] = useState(false)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const formikRef = useRef(null)

    useEffect(() => {
        if (adminCreated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_ADMINS).then()
            }
        }
    }, [adminCreated])

    return (
        <section className='py-8 space-y-4 mx-16'>
            <h2 className='text-2xl font-medium'>Nouvel Administrateur</h2>
            {authoritiesQuery.data && (
                <AdminForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setAdminCreated={setPatientCreated}
                    authorities={authoritiesQuery.data}
                    addUserMutation={addUserMutation}
                    updateAvatarMutation={updateAvatarMutation}/>
            )}
            {authoritiesQuery.isLoading && <UserEditSkeleton/>}
        </section>
    )
}

export default AdminCreate