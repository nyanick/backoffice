import {NextPage} from "next";
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {LoginForm} from "../components/LoginForm";
import {useSignIn} from "../hooks/account";
import Cookies from 'js-cookie'
import {AUTH_TOKEN_KEY} from "../contexts/auth-reducer";
import Head from "next/head";

const UserLogin: NextPage = () => {
    const router = useRouter()
    const {mutate: signInMutation, data, error, isLoading, isSuccess} = useSignIn()

    useEffect(() => {
        if (isSuccess) {
            const authToken = data.authToken
            Cookies.set(AUTH_TOKEN_KEY, authToken)
            const next = router.query.next
            if (typeof next === 'string') {
                router.push(next).then()
            } else {
                router.push('/').then()
            }
        }
    }, [isSuccess])

    useEffect(() => {
        if (error) {
            console.log(error)
            // setAlertMessage(description)
        }
    }, [error])

    return (
        <>
            <Head>
                <title>Administration Nucleus :: Ouvrir une session</title>
                <meta name="description" content="Ouvrir une session"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
                <meta property="og:title" content="Ouvrir une session"/>
                <meta property="og:description" content="Ouvrir une session"/>
                <meta property="og:url" content="https://www.nucleusbiotechlabs.com/"/>
                <meta property="og:type" content="website"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className='login-page' style={{minHeight: '466px'}}>
                <div className="login-box">
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <a href="" className="text-2xl"><b>Administration </b>NBL</a>
                        </div>
                        <div className="card-body">
                            <p className="login-box-msg">Connectez-vous pour ouvrir une session</p>
                            <LoginForm signInMutation={signInMutation} isLoading={isLoading}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserLogin
