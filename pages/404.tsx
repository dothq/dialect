import { NextSeo } from "next-seo";
import React from "react";
import { Error } from "../components/Error";
import { Header } from "../components/Header";
import { SidebarWMain } from "../components/SidebarWMain";

const NotFound = () => {
    return (
        <>
            <NextSeo title={"404 – Dialect"} />

            <Header />

            <SidebarWMain hideSidebar={true}>
                <Error code={404} message={"We were unable to find this page or resource."} />
            </SidebarWMain>
        </>
    )
}

export default NotFound;