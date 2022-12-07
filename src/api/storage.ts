import axios from "./axios";
import {apiRoutes} from "../constants";

export const updateAvatar = async (payload: { userId: string, avatar: File }) => {
    let formData: any = new FormData();
    formData.append('file', payload.avatar, payload.avatar.name);
    const {data} = await axios.put<string>(
        `${apiRoutes.USERS}/${payload.userId}/avatar`,
        formData,
        {headers: {'Content-Type': `multipart/form-data; boundary=${formData._boundary}`}}
    );
    return data;
}
