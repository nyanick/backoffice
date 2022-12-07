import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {SpecialtyForm} from "../../components";
import {appRoutes} from "../../constants";
import {useRouter} from "next/router";
import {useAddSpecialty} from "../../hooks/specialty";

const SpecialtyCreate: NextPage = () => {
    const router = useRouter()
    const addSpecialtyMutation = useAddSpecialty()
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const [specialtyCreated, setSpecialtyCreated] = useState(false)
    const formikRef = useRef(null)

    useEffect(() => {
        if (specialtyCreated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_SPECIALTIES).then()
            }
        }
    }, [specialtyCreated])

    return (
        <section className='max-w-xl mx-auto'>
            <h2 className='text-2xl my-4 font-medium'>Nouvelle Spécialité</h2>
            <SpecialtyForm
                formikRef={formikRef}
                createMode={createMode}
                setCreateMode={setCreateMode}
                setSpecialtyCreated={setSpecialtyCreated}
                addSpecialtyMutation={addSpecialtyMutation}/>
        </section>
    )
}

export default SpecialtyCreate
