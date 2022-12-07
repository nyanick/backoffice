import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {DoctorEditSkeleton, DoctorForm} from "../../components";
import {useRouter} from "next/router";
import {useSpecialties} from "../../hooks/specialty";
import {useAddDoctor} from "../../hooks/doctor";
import {appRoutes} from "../../constants";
import {useUpdateAvatar} from "../../hooks/storage";
import {useHospitals} from "../../hooks/hospital";

const DoctorCreate: NextPage = () => {
    const router = useRouter()
    const specialtiesQuery = useSpecialties(null, null)
    const hospitalsQuery = useHospitals(null, null)
    const addDoctorMutation = useAddDoctor()
    const updateAvatarMutation = useUpdateAvatar()
    const [doctorCreated, setDoctorCreated] = useState(false)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const formikRef = useRef(null)

    useEffect(() => {
        if (doctorCreated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_DOCTORS).then()
            }
        }
    }, [doctorCreated])

    return (
        <section className='py-8 space-y-4 mx-16'>
            <h2 className='text-2xl font-medium'>Nouveau Médecin</h2>
            {specialtiesQuery.data && hospitalsQuery.data && (
                <DoctorForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setDoctorCreated={setDoctorCreated}
                    addDoctorMutation={addDoctorMutation}
                    updateAvatarMutation={updateAvatarMutation}
                    hospitals={hospitalsQuery.data.hospitals}
                    specialties={specialtiesQuery.data.specialties}/>
            )}
            {specialtiesQuery.isLoading && <DoctorEditSkeleton/>}
        </section>
    )
}

export default DoctorCreate
