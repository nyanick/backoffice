import {NextPage} from "next";
import {useRouter} from "next/router";
import {useEditSpecialty, useSpecialty} from "../../../hooks/specialty";
import React, {useEffect, useRef, useState} from "react";
import {appRoutes} from "../../../constants";
import {SpecialtyForm, SpecialtyFormSkeleton} from "../../../components";

const SpecialtyEdit: NextPage = () => {
    const router = useRouter()
    const updateSpecialtyMutation = useEditSpecialty()
    const specialtyQuery = useSpecialty(router.query.id as any)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const [specialtyUpdated, setSpecialtyUpdated] = useState(false)
    const formikRef = useRef(null)

    useEffect(() => {
        if (specialtyUpdated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_SPECIALTIES).then()
            }
        }
    }, [specialtyUpdated])

    return (
        <section className='py-8 space-y-4 max-w-xl mx-auto'>
            <h2 className='text-2xl font-medium'>Mettre à jour la spécialité</h2>
            {specialtyQuery.isLoading && <SpecialtyFormSkeleton/>}
            {specialtyQuery.data && (
                <SpecialtyForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setSpecialtyUpdated={setSpecialtyUpdated}
                    specialty={specialtyQuery.data}
                    updateSpecialtyMutation={updateSpecialtyMutation}/>
            )}
        </section>
    )
}


export default SpecialtyEdit
