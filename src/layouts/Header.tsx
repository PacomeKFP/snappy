/* eslint-disable @next/next/no-document-import-in-page */
import { Head } from "next/document";
import React from "react"

const Header = () => {

    return (
        <header>
            <Head>
                <title>SNAPY</title>
                <meta name="description" content={`Achetez au meilleur prix.`} />
            </Head>
    
        </header>
    )
}

export default Header
