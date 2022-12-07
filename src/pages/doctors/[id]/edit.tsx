import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {DoctorEditSkeleton, DoctorForm} from "../../../components";
import {useRouter} from "next/router";
import {useSpecialties} from "../../../hooks/specialty";
import {useEditDoctor, useGetDoctorDetailsByUserId} from "../../../hooks/doctor";
import {appRoutes} from "../../../constants";
import {useUpdateAvatar} from "../../../hooks/storage";
import {useHospitals} from "../../../hooks/hospital";

const DoctorEdit: NextPage = () => {
    const router = useRouter()
    const specialtiesQuery = useSpecialties(null, null)
    const hospitalsQuery = useHospitals(null, null)
    const doctorsDetailsQuery = useGetDoctorDetailsByUserId(router.query.id as any)
    const updateAvatarMutation = useUpdateAvatar()
    const updateDoctorMutation = useEditDoctor()
    const [doctorUpdated, setDoctorUpdated] = useState(false)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const formikRef = useRef(null)

    useEffect(() => {
        if (doctorUpdated) {
            router.push(appRoutes.ROUTE_DOCTORS).then()
        }
    }, [doctorUpdated])

    return (
        <section className='py-8 space-y-4 mx-16'>
            <h2 className='text-2xl font-medium'>Mettre à jour le médecin</h2>
            {(doctorsDetailsQuery.isLoading || specialtiesQuery.isLoading) && <DoctorEditSkeleton/>}
            {(doctorsDetailsQuery.data && specialtiesQuery.data && hospitalsQuery.data) && (
                <DoctorForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setDoctorUpdated={setDoctorUpdated}
                    updateDoctorMutation={updateDoctorMutation}
                    updateAvatarMutation={updateAvatarMutation}
                    doctorsDetails={doctorsDetailsQuery.data}
                    hospitals={hospitalsQuery.data.hospitals}
                    specialties={specialtiesQuery.data.specialties}/>
            )}
        </section>
    )
}

export default DoctorEdit
