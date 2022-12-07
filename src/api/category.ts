import axios from "./axios";
import {apiRoutes} from "../constants";
import {ICategory, ICategoryCreate} from "../types/category";

export const fetchCategories = async ({queryKey}) => {
    const params = {
        page: queryKey[1].page,
        size: queryKey[1].size,
    }
    const {data, headers} = await axios.get<ICategory[]>(apiRoutes.CATEGORIES, {params});
    return {
        categories: data,
        itemsCount: headers['x-total-count'] as number
    };
}

export const getCategory = async ({queryKey}) => {
    const {data} = await axios.get<ICategory>(`${apiRoutes.CATEGORIES}/${queryKey[1]}`);
    return data;
}

export const newCategory = async (category: ICategoryCreate) => {
    const {data} = await axios.post<ICategory>(apiRoutes.CATEGORIES, category);
    return data;
}

export const editCategory = async (category: ICategory) => {
    const {data} = await axios.put<ICategory>(apiRoutes.CATEGORIES, category);
    return data;
}
