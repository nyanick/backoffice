import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {SymptomForm} from "../../components";
import {appRoutes} from "../../constants";
import {useRouter} from "next/router";
import {useAddSymptom} from "../../hooks/symptom";

const SymptomCreate: NextPage = () => {
    const router = useRouter()
    const addSymptomMutation = useAddSymptom()
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const [symptomCreated, setSymptomCreated] = useState(false)
    const formikRef = useRef(null)

    useEffect(() => {
        if (symptomCreated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_SYMPTOMS).then()
            }
        }
    }, [symptomCreated])

    return (
        <section className='py-8 space-y-4 max-w-xl mx-auto'>
            <h2 className='text-2xl font-medium'>Nouveau Symptôme</h2>
            <SymptomForm
                formikRef={formikRef}
                createMode={createMode}
                setCreateMode={setCreateMode}
                setSymptomCreated={setSymptomCreated}
                addSymptomMutation={addSymptomMutation}/>
        </section>
    )
}

export default SymptomCreate
