import Cookies from 'js-cookie'
import {IUser} from "../types/user";

export const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY'
export const initialState = {
    authToken: typeof window !== 'undefined' ? Cookies.get(AUTH_TOKEN_KEY) || null : null,
    authUser: null
}

export interface AuthPayload {
    authAction: AuthAction
    authToken?: string
    authUser?: IUser
}

export type AuthAction = 'LOGIN' | 'LOGOUT' | 'AUTH_USER'

const reducer = (state, action: AuthPayload) => {
    switch (action.authAction) {
        case 'LOGIN':
            const authToken = action.authToken
            Cookies.set(AUTH_TOKEN_KEY, authToken)
            return {
                ...state,
                authToken: authToken
            }
        case 'AUTH_USER':
            const authUser = action.authUser
            return {
                ...state,
                authUser: authUser
            }
        case 'LOGOUT':
            Cookies.remove(AUTH_TOKEN_KEY)
            return {
                ...state,
                authToken: null,
                authUser: null
            }
        default:
            return state
    }
}
export default reducer