import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {UserEditSkeleton, PatientForm} from "../../../components";
import {useRouter} from "next/router";
import {useEditPatient, useGetPatientDetailsByUserId} from "../../../hooks/patient";
import {appRoutes} from "../../../constants";
import {useUpdateAvatar} from "../../../hooks/storage";

const PatientEdit: NextPage = () => {
    const router = useRouter()
    const patientsDetailsQuery = useGetPatientDetailsByUserId(router.query.id as any)
    const updateAvatarMutation = useUpdateAvatar()
    const updatePatientMutation = useEditPatient()
    const [patientUpdated, setPatientUpdated] = useState(false)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const formikRef = useRef(null)

    useEffect(() => {
        if (patientUpdated) {
            router.push(appRoutes.ROUTE_PATIENTS).then()
        }
    }, [patientUpdated])

    return (
        <section className='py-8 space-y-4 mx-16'>
            <h2 className='text-2xl font-medium'>Mettre à jour le patient</h2>
            {patientsDetailsQuery.isLoading && <UserEditSkeleton/>}
            {patientsDetailsQuery.data && (
                <PatientForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setPatientUpdated={setPatientUpdated}
                    updatePatientMutation={updatePatientMutation}
                    updateAvatarMutation={updateAvatarMutation}
                    patientsDetails={patientsDetailsQuery.data}/>
            )}
        </section>
    )
}

export default PatientEdit
