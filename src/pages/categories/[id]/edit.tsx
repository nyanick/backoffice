import React, {useEffect, useRef, useState} from "react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import {useGroups} from "../../../hooks/group";
import {useCategory, useEditCategory} from "../../../hooks/category";
import {appRoutes} from "../../../constants";
import {CategoryForm} from "../../../components/CategoryForm";
import {CategoryFormSkeleton} from "../../../components";

const CategoryEdit: NextPage = () => {
    const router = useRouter()
    const groupsQuery = useGroups(null, null)
    const editCategoryMutation = useEditCategory()
    const categoryQuery = useCategory(router.query.id as any)
    const [createMode, setCreateMode] = useState<'single' | 'multiple'>(null)
    const [categoryUpdated, setCategoryUpdated] = useState(false)
    const formikRef = useRef(null)

    useEffect(() => {
        if (categoryUpdated) {
            if (createMode === 'multiple') {
                formikRef.current?.resetForm()
            } else {
                router.push(appRoutes.ROUTE_CATEGORIES).then()
            }
        }
    }, [categoryUpdated])

    return (
        <section className='py-8 space-y-4 max-w-xl mx-auto'>
            <h2 className='text-2xl font-medium'>Mettre à jour la catégorie</h2>
            {(categoryQuery.isLoading || groupsQuery.isLoading) && <CategoryFormSkeleton/>}
            {groupsQuery.data && categoryQuery.data && (
                <CategoryForm
                    formikRef={formikRef}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setCategoryUpdated={setCategoryUpdated}
                    groups={groupsQuery.data.groups}
                    category={categoryQuery.data}
                    updateCategoryMutation={editCategoryMutation}/>
            )}
        </section>
    )
}

export default CategoryEdit
