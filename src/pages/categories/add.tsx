import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {appRoutes} from "../../constants";
import {useRouter} from "next/router";
import {useGroups} from "../../hooks/group";
import {useAddCategory} from "../../hooks/category";
import {CategoryForm} from "../../components/CategoryForm";
import {CategoryFormSkeleton} from "../../components";

const CategoryCreate: NextPage = () => {
    const router = useRouter()
    const groupsQuery = useGroups(null, null)
    const addCategoryMutation = useAddCategory()
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const [categoryCreated, setCategoryCreated] = useState(false)
    const formikRef = useRef(null)

    useEffect(() => {
        if (categoryCreated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_CATEGORIES).then()
            }
        }
    }, [categoryCreated])

    return (
        <section className='py-8 space-y-4 max-w-xl mx-auto'>
            <h2 className='text-2xl font-medium'>Nouvelle Catégorie</h2>
            {(groupsQuery.isLoading) && (
                <CategoryFormSkeleton/>
            )}
            {groupsQuery.data && (
                <CategoryForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setCategoryCreated={setCategoryCreated}
                    groups={groupsQuery.data.groups}
                    addCategoryMutation={addCategoryMutation}/>
            )}
        </section>
    )
}

export default CategoryCreate
