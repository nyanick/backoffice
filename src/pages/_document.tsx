import Document, {DocumentContext, Head, Html, Main, NextScript} from 'next/document'
import React from "react";

class NBLDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        return await Document.getInitialProps(ctx)
    }

    render() {
        return (
            <Html lang={'en'}>
                <Head>
                    <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
                    <link rel="manifest" href="/manifest.json"/>
                    <link rel="stylesheet"
                          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&amp;display=fallback"/>
                    <link rel="stylesheet"
                          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
                          crossOrigin="anonymous" referrerPolicy="no-referrer"/>
                    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"/>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.1/dist/css/adminlte.min.css"/>
                </Head>
                <body className='sidebar-mini layout-fixed h-auto'>
                    <Main/>
                </body>
                <NextScript/>
            </Html>
        )
    }
}

export default NBLDocument