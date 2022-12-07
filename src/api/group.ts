import axios from "./axios";
import {IGroup, IGroupCreate} from "../types/group";
import {apiRoutes} from "../constants";

export const fetchGroups = async ({queryKey}) => {
    const params = {
        page: queryKey[1].page,
        size: queryKey[1].size,
    }
    const {data, headers} = await axios.get<IGroup[]>(apiRoutes.GROUPS, {params});
    return {
        groups: data,
        itemsCount: headers['x-total-count'] as number
    };
}

export const getGroup = async ({queryKey}) => {
    const {data} = await axios.get<IGroup>(`${apiRoutes.GROUPS}/${queryKey[1]}`);
    return data;
}

export const newGroup = async (group: IGroupCreate) => {
    const {data} = await axios.post<IGroup>(apiRoutes.GROUPS, group);
    return data;
}

export const editGroup = async (group: IGroup) => {
    const {data} = await axios.put<IGroup>(apiRoutes.GROUPS, group);
    return data;
}
