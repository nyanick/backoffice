import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {PatientForm} from "../../components";
import {useRouter} from "next/router";
import {useAddPatient} from "../../hooks/patient";
import {appRoutes} from "../../constants";
import {useUpdateAvatar} from "../../hooks/storage";

const PatientCreate: NextPage = () => {
    const router = useRouter()
    const addPatientMutation = useAddPatient()
    const updateAvatarMutation = useUpdateAvatar()
    const [patientCreated, setPatientCreated] = useState(false)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const formikRef = useRef(null)

    useEffect(() => {
        if (patientCreated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_PATIENTS).then()
            }
        }
    }, [patientCreated])

    return (
        <section className='py-8 space-y-4 mx-16'>
            <h2 className='text-2xl font-medium'>Nouveau Patient</h2>
            <PatientForm
                formikRef={formikRef}
                createMode={createMode}
                setCreateMode={setCreateMode}
                setPatientCreated={setPatientCreated}
                addPatientMutation={addPatientMutation}
                updateAvatarMutation={updateAvatarMutation}/>
        </section>
    )
}

export default PatientCreate
