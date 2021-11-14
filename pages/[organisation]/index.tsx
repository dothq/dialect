import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"
import React from "react"
import { Header } from "../../components/Header"
import { SidebarWMain } from "../../components/SidebarWMain"

const Organisation = () => {
    return (
        <>
            <NextSeo title={"Dashboard – Dialect"} />

            <Header />

            <SidebarWMain>
                <div className={"flex flex-col gap-4 p-12 my-96"}>
                    <h1 className={"text-3xl font-semibold"}>
                        Org Name
                    </h1>
                    <p className={"text-gray-500"}>
                        blah blah
                    </p>
                </div>
            </SidebarWMain>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {}
    }
  }
  