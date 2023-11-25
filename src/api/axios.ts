import axios from 'axios';
import {clearAuthToken, currentAuthToken} from "../services/account";
import {verifyToken} from "../utils/Utils";
import {appRoutes} from "../constants";

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-type": "application/json"
    },
    httpsAgent: {
        rejectUnauthorized: false
    }
});

http.interceptors.request.use(request => {
    const authToken = currentAuthToken()
    if (authToken != null) {
        if (verifyToken(authToken)) {
            request.headers = {
                ...request.headers,
                Authorization: `Bearer ${authToken}`
            }
        } else {
            clearAuthToken()
            const next = window.location.pathname
            window.location.href = `${appRoutes.ROUTE_LOGIN}?next=${next}`
        }
    } else {
        if (!window.location.pathname.includes(appRoutes.ROUTE_LOGIN)) {
            const next = window.location.pathname
            if (next !== appRoutes.ROUTE_LOGIN)
                window.location.href = `${appRoutes.ROUTE_LOGIN}?next=${next}`
        }
    }
    return request
})

http.interceptors.response.use(
    res => res,
    error => {
        if (error?.response?.status === 401) {
            clearAuthToken()
            const next = window.location.pathname
            if (next !== appRoutes.ROUTE_LOGIN)
                window.location.href = `${appRoutes.ROUTE_LOGIN}?next=${next}`
        }
        return Promise.reject(error)
    }
)

export default http
