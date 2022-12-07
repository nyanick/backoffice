import '../styles/globals.css'
import type {AppProps} from 'next/app'
import React from 'react'
import reducer, {initialState} from "../contexts/auth-reducer";
import {AuthProvider} from '../contexts/AuthProvider'
import {ChakraProvider} from "@chakra-ui/react"
import theme from "../theme";
import {Layout} from "../components";
import {useRouter} from "next/router";
import {appRoutes} from "../constants";
import Script from "next/script";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

function NBLApp({Component, pageProps}: AppProps) {
    const router = useRouter()
    const queryClient = new QueryClient()

    return (
        <>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
                    integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
                    crossOrigin="anonymous" referrerPolicy="no-referrer" />
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ"
                    crossOrigin="anonymous" />
            <Script src="https://cdn.jsdelivr.net/npm/admin-lte@3.1/dist/js/adminlte.min.js" />
            <ChakraProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider initialState={initialState} reducer={reducer}>
                        {router.pathname === appRoutes.ROUTE_LOGIN ? <Component {...pageProps} /> : (
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        )
                        }
                    </AuthProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ChakraProvider>
        </>
    )
}

export default NBLApp
