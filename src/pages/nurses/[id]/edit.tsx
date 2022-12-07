import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {NurseEditSkeleton, NurseForm} from "../../../components";
import {useRouter} from "next/router";
import {useSpecialties} from "../../../hooks/specialty";
import {useEditNurse, useGetNurseDetailsByUserId} from "../../../hooks/nurse";
import {appRoutes} from "../../../constants";
import {useUpdateAvatar} from "../../../hooks/storage";
import {useHospitals} from "../../../hooks/hospital";

const NurseEdit: NextPage = () => {
    const router = useRouter()
    const specialtiesQuery = useSpecialties(null, null)
    const hospitalsQuery = useHospitals(null, null)
    const nursesDetailsQuery = useGetNurseDetailsByUserId(router.query.id as any)
    const updateAvatarMutation = useUpdateAvatar()
    const updateNurseMutation = useEditNurse()
    const [nurseUpdated, setNurseUpdated] = useState(false)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const formikRef = useRef(null)

    useEffect(() => {
        if (nurseUpdated) {
            router.push(appRoutes.ROUTE_NURSES).then()
        }
    }, [nurseUpdated])

    return (
        <section className='py-8 space-y-4 mx-16'>
            <h2 className='text-2xl font-medium'>Mettre à jour l&apos;infirmier</h2>
            {(nursesDetailsQuery.isLoading || specialtiesQuery.isLoading) && <NurseEditSkeleton/>}
            {(nursesDetailsQuery.data && specialtiesQuery.data && hospitalsQuery.data) && (
                <NurseForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setNurseUpdated={setNurseUpdated}
                    updateNurseMutation={updateNurseMutation}
                    updateAvatarMutation={updateAvatarMutation}
                    nurseDetails={nursesDetailsQuery.data}
                    hospitals={hospitalsQuery.data.hospitals}/>
            )}
        </section>
    )
}

export default NurseEdit
