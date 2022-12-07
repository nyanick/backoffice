import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {HospitalForm} from "../../components";
import {appRoutes} from "../../constants";
import {useRouter} from "next/router";
import {useAddHospital} from "../../hooks/hospital";
import {useUsers} from "../../hooks/user";

const HospitalCreate: NextPage = () => {
    const router = useRouter()
    const addHospitalMutation = useAddHospital()
    const usersQuery = useUsers(null, null, null)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const [hospitalCreated, setHospitalCreated] = useState(false)
    const formikRef = useRef(null)


    useEffect(() => {
        if (hospitalCreated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_HOSPITALS).then()
            }
        }
    }, [hospitalCreated])

    return (
        <section className='max-w-xl mx-auto'>
            <h2 className='text-2xl my-4 font-medium'>Nouvel Hôpital</h2>
            {usersQuery.data && (
                <HospitalForm
                    formikRef={formikRef}
                    createMode={createMode}
                    users={usersQuery.data.users}
                    setCreateMode={setCreateMode}
                    setHospitalCreated={setHospitalCreated}
                    addHospitalMutation={addHospitalMutation}/>
            )}
        </section>
    )
}

export default HospitalCreate
