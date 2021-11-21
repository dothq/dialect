import { NextSeo } from "next-seo";
import React from "react";
import { Error } from "../components/Error";
import { Header } from "../components/Header";
import { SidebarWMain } from "../components/SidebarWMain";

const NotAuthorised = () => {
    return (
        <>
            <NextSeo title={"403 – Dialect"} />

            <Header />

            <SidebarWMain hideSidebar={true}>
                <Error code={403} message={"You do not have the right authorisation to view this page or resource."} />
            </SidebarWMain>
        </>
    )
}

export default NotAuthorised;