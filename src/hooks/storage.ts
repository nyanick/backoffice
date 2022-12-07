import {useMutation} from "react-query";
import {updateAvatar} from "../api/storage";

export const useUpdateAvatar = () => {
    return useMutation((payload: { userId: string, avatar: File }) => updateAvatar(payload))
}
