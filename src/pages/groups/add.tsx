import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {GroupForm} from "../../components";
import {useRouter} from "next/router";
import {appRoutes} from "../../constants";
import {useAddGroup} from "../../hooks/group";

const GroupCreate: NextPage = () => {
    const router = useRouter()
    const addGroupMutation = useAddGroup()
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const [groupCreated, setGroupCreated] = useState(false)
    const formikRef = useRef(null)

    useEffect(() => {
        if (groupCreated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_GROUPS).then()
            }
        }
    }, [groupCreated])

    return (
        <section className='py-8 space-y-4 max-w-xl mx-auto'>
            <h2 className='text-2xl font-medium'>Nouveau Groupe</h2>
            <GroupForm
                formikRef={formikRef}
                createMode={createMode}
                setCreateMode={setCreateMode}
                setGroupCreated={setGroupCreated}
                addGroupMutation={addGroupMutation}/>
        </section>
    )
}

export default GroupCreate
