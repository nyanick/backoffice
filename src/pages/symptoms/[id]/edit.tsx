import {NextPage} from "next";
import {useRouter} from "next/router";
import {useEditSymptom, useSymptom} from "../../../hooks/symptom";
import React, {useEffect, useRef, useState} from "react";
import {appRoutes} from "../../../constants";
import {SymptomForm, SymptomFormSkeleton} from "../../../components";

const SymptomEdit: NextPage = () => {
    const router = useRouter()
    const updateSymptomMutation = useEditSymptom()
    const symptomQuery = useSymptom(router.query.id as any)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const [symptomUpdated, setSymptomUpdated] = useState(false)
    const formikRef = useRef(null)

    useEffect(() => {
        if (symptomUpdated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_SYMPTOMS).then()
            }
        }
    }, [symptomUpdated])

    return (
        <section className='py-8 space-y-4 max-w-xl mx-auto'>
            <h2 className='text-2xl font-medium'>Mettre à jour le symptôme</h2>
            {symptomQuery.isLoading && <SymptomFormSkeleton/>}
            {symptomQuery.data && (
                <SymptomForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setSymptomUpdated={setSymptomUpdated}
                    symptom={symptomQuery.data}
                    updateSymptomMutation={updateSymptomMutation}/>
            )}
        </section>
    )
}

export default SymptomEdit
