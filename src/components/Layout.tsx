import * as React from 'react';
import {Header, Footer, SideBar} from ".";
import {useGetCurrentUser} from "../hooks/account";
import {useStateValue} from "../contexts/AuthProvider";
import {AuthPayload} from "../contexts/auth-reducer";
import {useEffect, useState} from "react";
import {BiLoaderAlt} from "react-icons/bi";
import {useRouter} from "next/router";
import Head from "next/head";
import {extractPageTitle} from "../utils/Utils";

interface Props {
}

export const Layout: React.FC<Props> = ({children}) => {
    const {data: user, isLoading} = useGetCurrentUser()
    const [{}, dispatch] = useStateValue();
    const [title, setTitle] = useState(null)

    const router = useRouter()

    useEffect(() => {
        setTitle(extractPageTitle(router.asPath))
    }, [router.asPath])

    useEffect(() => {
        if (user) {
            dispatch({
                authAction: 'AUTH_USER',
                authUser: user
            } as AuthPayload)
        }
    }, [user])


    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={title}/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={title}/>
                <meta property="og:url" content="https://www.nucleusbiotechlabs.com/"/>
                <meta property="og:type" content="website"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className='wrapper'>
                <Header/>
                <SideBar/>
                <main className='content-wrapper bg-white overflow-auto relative'>
                    {isLoading ? (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <BiLoaderAlt className='animate-spin relative w-12 h-12 text-sky-700'/>
                        </div>
                    ) : children}
                </main>
                <Footer/>
                <div id="sidebar-overlay"/>
            </div>
        </>
    );
};
