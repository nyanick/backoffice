import {NextPage} from "next";
import {useRouter} from "next/router";
import {useEditGroup, useGroup} from "../../../hooks/group";
import React, {useEffect, useRef, useState} from "react";
import {appRoutes} from "../../../constants";
import {GroupForm, GroupFormSkeleton} from "../../../components";

const GroupEdit: NextPage = () => {
    const router = useRouter()
    const updateGroupMutation = useEditGroup()
    const groupQuery = useGroup(router.query.id as any)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const [groupUpdated, setGroupUpdated] = useState(false)
    const formikRef = useRef(null)

    useEffect(() => {
        if (groupUpdated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_GROUPS).then()
            }
        }
    }, [groupUpdated])

    return (
        <section className='py-8 space-y-4 max-w-xl mx-auto'>
            <h2 className='text-2xl font-medium'>Mettre à jour le groupe</h2>
            {groupQuery.isLoading && <GroupFormSkeleton/>}
            {groupQuery.data && (
                <GroupForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setGroupUpdated={setGroupUpdated}
                    group={groupQuery.data}
                    updateGroupMutation={updateGroupMutation}/>
            )}
        </section>
    )
}

export default GroupEdit
