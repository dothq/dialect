import { NextSeo } from "next-seo";
import React from "react";
import { Header } from "../components/Header";
import { SidebarWMain } from "../components/SidebarWMain";

const NotFound = () => {
    return (
        <>
            <NextSeo title={"404 – Dialect"} />

            <Header />

            <SidebarWMain>
                <div className={"flex flex-col gap-4 p-12 my-6"}>
                    <h1 className={"text-3xl font-semibold"}>
                        404
                    </h1>
                    <p className={"text-gray-500"}>
                        We were unable to locate that page or resource.
                    </p>
                </div>
            </SidebarWMain>
        </>
    )
}

export default NotFound;