import * as React from 'react';
import {useRouter} from "next/router";
import {apiRoutes, appRoutes} from '../constants'
import {Avatar} from "@chakra-ui/react";
import {AiOutlinePicCenter, AiOutlineTeam} from "react-icons/ai";
import Link from 'next/link'
import {useStateValue} from "../contexts/AuthProvider";

type Props = {};
export const SideBar: React.FC<Props> = ({}) => {
    const router = useRouter()

    const [{authUser: user}] = useStateValue()

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link href={appRoutes.ROUTE_HOME}>
                <a href={appRoutes.ROUTE_HOME}
                   className='brand-link'>
                    <span className="brand-text font-weight-light">NBL Administration</span>
                </a>
            </Link>
            <div className="sidebar">
                {user ? (
                    <div className="user-panel items-center mt-3 pb-3 mb-3 flex">
                        <Avatar
                            size='sm'
                            bgColor='blue.600'
                            className='bg-blue-500 text-white'
                            name={`${user.firstName.charAt(0)} ${user.lastName.charAt(0)}`}
                            src={`${user.avatarId ? apiRoutes.GET_AVATAR(user.avatarId) : ''}`}/>
                        <div className="info">
                            <a href="#" className="d-block">
                                {`${user.firstName} ${user.lastName.charAt(0)}.`}
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className='animate-pulse'>
                        <div className="user-panel items-center space-x-4 mt-3 pb-3 mb-3 flex">
                            <div className="w-10 h-10 bg-slate-300 rounded-full"/>
                            <div className="h-3 flex-1 bg-slate-300 rounded-lg"/>
                        </div>
                    </div>
                )}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        <li className="nav-item">
                            <Link href={appRoutes.ROUTE_USERS}>
                                <a className={`flex items-center space-x-2 nav-link${router.asPath.split("/")[1] === appRoutes.ROUTE_USERS.substring(1) ? " active" : ""}`}>
                                    <AiOutlineTeam className='w-6 h-6'/>
                                    <p>Utilisateurs</p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={appRoutes.ROUTE_ADMINS}>
                                <a className={`flex items-center space-x-2 nav-link${router.asPath.split("/")[1] === appRoutes.ROUTE_ADMINS.substring(1) ? " active" : ""}`}>
                                    <AiOutlineTeam className='w-6 h-6'/>
                                    <p>Administrateurs</p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={appRoutes.ROUTE_DOCTORS}>
                                <a className={`flex items-center space-x-2 nav-link${router.asPath.split("/")[1] === appRoutes.ROUTE_DOCTORS.substring(1) ? " active" : ""}`}>
                                    <AiOutlineTeam className='w-6 h-6'/>
                                    <p>Médecins</p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={appRoutes.ROUTE_ANALYSTS}>
                                <a className={`flex items-center space-x-2 nav-link${router.asPath.split("/")[1] === appRoutes.ROUTE_ANALYSTS.substring(1) ? " active" : ""}`}>
                                    <AiOutlineTeam className='w-6 h-6'/>
                                    <p>Laborantins</p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={appRoutes.ROUTE_NURSES}>
                                <a className={`flex items-center space-x-2 nav-link${router.asPath.split("/")[1] === appRoutes.ROUTE_NURSES.substring(1) ? " active" : ""}`}>
                                    <AiOutlineTeam className='w-6 h-6'/>
                                    <p>Infirmiers</p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={appRoutes.ROUTE_PATIENTS}>
                                <a className={`flex items-center space-x-2 nav-link${router.asPath.split("/")[1] === appRoutes.ROUTE_PATIENTS.substring(1) ? " active" : ""}`}>
                                    <AiOutlineTeam className='w-6 h-6'/>
                                    <p>Patients</p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={appRoutes.ROUTE_SPECIALTIES}>
                                <a
                                    className={`flex items-center space-x-2 nav-link${router.asPath.split("/")[1] === appRoutes.ROUTE_SPECIALTIES.substring(1) ? " active" : ""}`}>
                                    <AiOutlinePicCenter className='w-6 h-6'/>
                                    <p>Spécialités</p>
                                </a>
                            </Link>
                        </li>
                        <hr className='bg-gray-500 my-2'/>
                        <li className="nav-item">
                            <Link href={appRoutes.ROUTE_SYMPTOMS}>
                                <a className={`flex items-center space-x-2 nav-link${(router.asPath === appRoutes.ROUTE_SYMPTOMS || router.asPath === appRoutes.ROUTE_ADD_SYMPTOM) ? " active" : ""}`}>
                                    <AiOutlinePicCenter className='w-6 h-6'/>
                                    <p>Symptômes</p>
                                </a>
                            </Link>
                        </li>
                        <hr className='bg-gray-500 my-2'/>
                        <li className="nav-item">
                            <Link href={appRoutes.ROUTE_GROUPS}>
                                <a className={`flex items-center space-x-2 nav-link${(router.asPath === appRoutes.ROUTE_GROUPS || router.asPath === appRoutes.ROUTE_ADD_GROUP) ? " active" : ""}`}>
                                    <AiOutlinePicCenter className='w-6 h-6'/>
                                    <p>Groupes</p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={appRoutes.ROUTE_CATEGORIES}>
                                <a className={`flex items-center space-x-2 nav-link${(router.asPath === appRoutes.ROUTE_CATEGORIES || router.asPath === appRoutes.ROUTE_ADD_CATEGORY) ? " active" : ""}`}>
                                    <AiOutlinePicCenter className='w-6 h-6'/>
                                    <p>Catégories</p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={appRoutes.ROUTE_EXAMS}>
                                <a className={`flex items-center space-x-2 nav-link${(router.asPath === appRoutes.ROUTE_EXAMS || (router.asPath === appRoutes.ROUTE_ADD_EXAM)) ? " active" : ""}`}>
                                    <AiOutlinePicCenter className='w-6 h-6'/>
                                    <p>Examens</p>
                                </a>
                            </Link>
                        </li>
                        <hr className='bg-gray-500 my-2'/>
                        <li className="nav-item">
                            <Link href={appRoutes.ROUTE_HOSPITALS}>
                                <a className={`flex items-center space-x-2 nav-link${(router.asPath === appRoutes.ROUTE_HOSPITALS || router.asPath === appRoutes.ROUTE_ADD_HOSPITAL) ? " active" : ""}`}>
                                    <AiOutlinePicCenter className='w-6 h-6'/>
                                    <p>Hôpitaux</p>
                                </a>
                            </Link>
                        </li>
                        <hr className='bg-gray-500 my-2'/>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};