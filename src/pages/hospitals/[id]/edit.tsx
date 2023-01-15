import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import {useUsers} from "../../../hooks/user";
import {useHospital, useEditHospital} from "../../../hooks/hospital";
import {appRoutes} from "../../../constants";
import {HospitalForm} from "../../../components";
import {HospitalFormSkeleton} from "../../../components";

const HospitalEdit: NextPage = () => {
    const router = useRouter()
    const usersQuery = useUsers(null, null, "admin_hospital")
    const editHospitalMutation = useEditHospital()
    const hospitalQuery = useHospital(router.query.id as any)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const [hospitalUpdated, setHospitalUpdated] = useState(false)
    const formikRef = useRef(null)

    useEffect(() => {
        if (hospitalUpdated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_HOSPITALS).then()
            }
        }
    }, [hospitalUpdated])

    return (
        <section className='py-8 space-y-4 max-w-xl mx-auto'>
            <h2 className='text-2xl font-medium'>Mettre à jour l&apos;hôpital</h2>
            {(hospitalQuery.isLoading || usersQuery.isLoading) && <HospitalFormSkeleton/>}
            {usersQuery.data && hospitalQuery.data && (
                <HospitalForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setHospitalUpdated={setHospitalUpdated}
                    users={usersQuery.data.users}
                    hospital={hospitalQuery.data}
                    updateHospitalMutation={editHospitalMutation}/>
            )}
        </section>
    )
}

export default HospitalEdit
