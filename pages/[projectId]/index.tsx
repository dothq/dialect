import { Project } from "@prisma/client"
import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"
import React from "react"
import { Header } from "../../components/Header"
import { SidebarItem } from "../../components/SidebarItem"
import { SidebarSection } from "../../components/SidebarSection"
import { SidebarWMain } from "../../components/SidebarWMain"
import { db } from "../../db"

const Project = ({ name, slug, supported_languages }: any) => {
    return (
        <>
            <NextSeo title={`${name} – Dialect`} />

            <Header />

            <SidebarWMain sidebar={<>
                <SidebarSection initiallyOpen={true} name={"Languages"}>
                    {supported_languages && supported_languages.length
                        ? supported_languages.map((l: any) => (
                            <SidebarItem href={l.id}>
                                {l.name}
                            </SidebarItem>
                        ))
                        : (
                            <>
                                lol
                            </>
                        )}
                </SidebarSection>
            </>}>
                <div className={"flex flex-col gap-4 p-12"}>
                    <h1 className={"text-3xl font-semibold"}>
                        {name}
                    </h1>
                    <p className={"text-gray-500"}>
                        blah blah
                    </p>
                </div>
            </SidebarWMain>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let match = await db.project.findFirst({
        where: {
            slug: ctx.query.projectId?.toString()
        }
    });

    if(!match) return { notFound: true } 

    for(const [key, value] of Object.entries(match)) {
        if(value instanceof Date) {
            (match as any)[key] = value.toISOString()
        }
    }

    return {
        props: {
            ...match
        }
    }
}
  
export default Project;