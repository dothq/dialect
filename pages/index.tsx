import { NextSeo } from "next-seo";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useSWRConfig } from "swr";
import { Header } from "../components/Header";
import { SidebarWMain } from "../components/SidebarWMain";
import { useIsAuthenticated } from "../providers/Auth";

const Dashboard = () => {
    const { cache, mutate, ...extraConfig } = useSWRConfig()
    const authed = useIsAuthenticated();

    const router = useRouter();

    return (
        <>
            <NextSeo title={"Dialect"} />

            <Header />

            <SidebarWMain>
                <div className={"flex flex-col gap-4 p-12 my-96"}>
                    <h1 className={"text-3xl font-semibold"}>
                        Welcome to Dialect.
                    </h1>
                    <p className={"text-gray-500"}>
                        Dialect is a translation platform focused around ease-of-use for your team and translators.
                    </p>
                </div>
            </SidebarWMain>
        </>
    )
}

export default Dashboard;