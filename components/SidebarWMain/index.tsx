import React from "react"
import { SidebarItem } from "../SidebarItem"
import { SidebarSection } from "../SidebarSection"

export const SidebarWMain = ({ children, sidebar, hideSidebar }: { children: any, sidebar?: any, hideSidebar?: boolean }) => {
    return (
        <div className={"w-full px-4 md:px-8 xl:px-0 flex justify-center h-full"}>
            <div className={"divide-gray-200 flex max-w-7xl w-full border-b border-gray-200 h-full flex-col divide-y lg:divide-y-0 lg:divide-x lg:flex-row"}>
                {!hideSidebar && <aside className={"w-full lg:w-64 py-5 flex flex-col gap-4 lg:sticky top-16 h-0"}>
                    {sidebar ? sidebar : <>
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
                    </>}

                    <span className={"text-gray-400 text-xs px-4"}>
                        © {new Date().getFullYear()} Dot HQ
                    </span>
                </aside>}
                <div className={"flex w-full flex-1 flex-col"}>
                    {children}
                </div>
            </div>
        </div>
    )
}