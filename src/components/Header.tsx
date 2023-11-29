import * as React from 'react';
import {FiLogOut} from "react-icons/fi";
import {useStateValue} from "../contexts/AuthProvider";
import {AuthPayload} from "../contexts/auth-reducer";
import {useRouter} from "next/router";
import {appRoutes} from "../constants";

type Props = {};
export const Header: React.FC<Props> = ({}) => {
    const [{authUser: user}, dispatch] = useStateValue();
    const router = useRouter()

    const logout = async () => {
        dispatch({
            authAction: 'LOGOUT'
        } as AuthPayload)
        await router.replace(appRoutes.ROUTE_LOGIN)
    }

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light sticky z-50 inset-0">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                        <i className="fas fa-bars">
                        </i>
                    </a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="" className="nav-link">Accueil</a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="#" className="nav-link">Support Technique</a>
                </li>
            </ul>
            {(user || 1 ) && (
                <ul
                    className="navbar-nav ml-auto flex items-center space-x-2 mr-2 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={logout}>
                    <FiLogOut/>
                    <p>Déconnexion</p>
                </ul>
            )}
        </nav>
    );
};