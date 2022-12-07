import {useMutation, useQuery} from "react-query";
import {editCategory, fetchCategories, getCategory, newCategory} from "../api/category";
import {ICategory, ICategoryCreate} from "../types/category";

export const useCategories = (size, page) => {
    return useQuery(["categories", {size, page}], fetchCategories)
}

export const useCategory = (id: string) => {
    return useQuery(["categories", id], getCategory, {
        enabled: !!id
    })
}

export const useAddCategory = () => {
    return useMutation((category: ICategoryCreate) => newCategory(category))
}

export const useEditCategory = () => {
    return useMutation((category: ICategory) => editCategory(category))
}
