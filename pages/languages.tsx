import { NextSeo } from "next-seo";
import React from "react";
import { Header } from "../components/Header";
import { SidebarWMain } from "../components/SidebarWMain";
import { defaultLanguages } from "../util/languages";

const Languages = () => {
    return (
        <>
            <NextSeo title={"Languages – Dialect"} />

            <Header />

            <SidebarWMain hideSidebar={true}>
                <div className={"flex flex-col gap-4 py-12 sticky top-16 bg-white border-b border-gray-200 z-30"}>
                    <h1 className={"text-3xl font-semibold"}>
                        Languages
                    </h1>
                    <p className={"text-gray-500"}>
                        All supported languages.
                    </p>
                </div>
                
                <div className={"grid py-12 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-7 flex-wrap overflow-hidden"}>
                    {defaultLanguages.map(l => {
                        return (
                            <a 
                                className={"flex flex-col select-none rounded-lg group relative overflow-hidden items-center px-3 py-4 bg-gray-50 hover:bg-gray-100 transition-all"}
                            >
                                <div className={"flex flex-col gap-3 items-center transition-all"}>
                                    <span className={"text-4xl w-9 h-9 z-10"}>
                                        {l.flag || "🏴‍☠️"}
                                    </span>
                                    <span className={"text-sm text-center text-gray-800 font-medium z-10"}>{l.name}</span>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </SidebarWMain>
        </>
    )
}

export default Languages;