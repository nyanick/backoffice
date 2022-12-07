import Cookies from 'js-cookie'
import {AUTH_TOKEN_KEY} from "../contexts/auth-reducer";

export const currentAuthToken = () => Cookies.get(AUTH_TOKEN_KEY) || null

export const clearAuthToken = () => Cookies.remove(AUTH_TOKEN_KEY)
