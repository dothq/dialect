import Head from "next/head"
import React from "react"

export const Layout = ({ title, children }: { title: string, children: any }) => {
    return (
        <div>
            <Head>
                <title>{title}  • Dialect</title>
            </Head>

            {children}
        </div>
    )
}
