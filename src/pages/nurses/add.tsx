import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {NurseEditSkeleton, NurseForm} from "../../components";
import {useRouter} from "next/router";
import {useAddNurse} from "../../hooks/nurse";
import {appRoutes} from "../../constants";
import {useUpdateAvatar} from "../../hooks/storage";
import {useHospitals} from "../../hooks/hospital";

const NurseCreate: NextPage = () => {
    const router = useRouter()
    const hospitalsQuery = useHospitals(null, null)
    const addNurseMutation = useAddNurse()
    const updateAvatarMutation = useUpdateAvatar()
    const [nurseCreated, setNurseCreated] = useState(false)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const formikRef = useRef(null)

    useEffect(() => {
        if (nurseCreated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_NURSES).then()
            }
        }
    }, [nurseCreated])

    return (
        <section className='py-8 space-y-4 mx-16'>
            <h2 className='text-2xl font-medium'>Nouvel Infirmier</h2>
            {hospitalsQuery.data && (
                <NurseForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setNurseCreated={setNurseCreated}
                    addNurseMutation={addNurseMutation}
                    updateAvatarMutation={updateAvatarMutation}
                    hospitals={hospitalsQuery.data.hospitals}/>
            )}
            {hospitalsQuery.isLoading && <NurseEditSkeleton/>}
        </section>
    )
}

export default NurseCreate
