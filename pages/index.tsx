import { NextSeo } from "next-seo";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { CheckCircle, Globe } from "react-feather";
import { useSWRConfig } from "swr";
import { Header } from "../components/Header";
import { SidebarItem } from "../components/SidebarItem";
import { SidebarSection } from "../components/SidebarSection";
import { useIsAuthenticated } from "../providers/Auth";

const Dashboard = () => {
    const { cache, mutate, ...extraConfig } = useSWRConfig()
    const authed = useIsAuthenticated();

    const router = useRouter();

    return (
        <>
            <NextSeo title={"Dialect"} />

            <Header />

            <div className={"w-full px-4 md:px-8 xl:px-0 flex justify-center"}>
                <div className={"divide-gray-200 flex max-w-7xl w-full border-b border-gray-200 flex-col divide-y lg:divide-y-0 lg:divide-x lg:flex-row"}>
                    <aside className={"w-full lg:w-64 py-5 flex flex-col gap-4"}>
                        <SidebarSection initiallyOpen={true} name={"Languages"}>
                            <SidebarItem>
                                English
                            </SidebarItem>

                            <SidebarItem>
                                Español
                            </SidebarItem>
                        </SidebarSection>
                        <SidebarSection initiallyOpen={true} name={"Projects"}>
                            <SidebarItem>
                                Desktop
                            </SidebarItem>

                            <SidebarItem>
                                Android
                            </SidebarItem>

                            <SidebarItem>
                                dothq.co
                            </SidebarItem>
                        </SidebarSection>

                        <span className={"text-gray-400 text-xs px-4"}>
                            © {new Date().getFullYear()} Dot HQ
                        </span>
                    </aside>
                    <div className={"flex w-full flex-1 flex-col"}>
                        <div className={"flex flex-col gap-4 p-12"}>
                            <h1 className={"text-3xl font-semibold"}>Welcome{cache.get("/api/auth/profile") ? `, ${cache.get("/api/auth/profile").name}` : ""}</h1>
                            <p className={"text-gray-500"}>{authed ? `What would you like to do?` : `Please sign-in to continue.`}</p>
                        </div>

                        <div className={"flex gap-1 border-t border-gray-200 p-12"}>
                            <div className={"w-full rounded-xl h-full pt-20 flex justify-center items-center gap-3 flex-col transition-all hover:bg-gray-100"}>
                                <CheckCircle className={"w-10 h-10 mb-2"} />
                                <h1 className={"text-3xl font-semibold"}>Validate</h1>
                                <p className={"text-gray-500 mb-4 text-center max-w-sm"}>Review other people's translations and contributions.</p>
                                <img src={"/assets/images/validate-banner.svg"}></img>
                            </div>
                            <div className={"w-full rounded-xl h-full pt-20 flex justify-center items-center gap-3 flex-col transition-all hover:bg-gray-100"}>
                                <Globe className={"w-10 h-10 mb-2"} />
                                <h1 className={"text-3xl font-semibold"}>Translate</h1>
                                <p className={"text-gray-500 mb-4 text-center max-w-sm"}>Write your own translations.</p>
                                <img src={"/assets/images/translate-banner.svg"}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;