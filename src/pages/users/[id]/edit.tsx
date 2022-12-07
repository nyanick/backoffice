import {NextPage} from "next";
import {useRouter} from "next/router";
import {useEditUser, useUser} from "../../../hooks/user";
import {useUpdateAvatar} from "../../../hooks/storage";
import React, {useEffect, useRef, useState} from "react";
import {appRoutes} from "../../../constants";
import {UserEditSkeleton, UserForm} from "../../../components";

const UserEdit: NextPage = () => {
    const router = useRouter()
    const userQuery = useUser(router.query.id as any)
    const updateAvatarMutation = useUpdateAvatar()
    const updateUserMutation = useEditUser()
    const [userUpdated, setUserUpdated] = useState(false)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const formikRef = useRef(null)

    useEffect(() => {
        if (userUpdated) {
            router.push(appRoutes.ROUTE_USERS).then()
        }
    }, [userUpdated])

    return (
        <section className='py-8 space-y-4 mx-16'>
            <h2 className='text-2xl font-medium'>Mettre à jour l&#39;utilisateur</h2>
            {userQuery.isLoading && <UserEditSkeleton/>}
            {userQuery.data && (
                <UserForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setUserUpdated={setUserUpdated}
                    updateUserMutation={updateUserMutation}
                    updateAvatarMutation={updateAvatarMutation}
                    user={userQuery.data}/>
            )}
        </section>
    )
}

export default UserEdit
