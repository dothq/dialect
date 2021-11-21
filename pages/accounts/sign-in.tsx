import { Github } from "@icons-pack/react-simple-icons";
import { NextSeo } from "next-seo";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { PrimaryButton } from "../../components/Button";
import { Header } from "../../components/Header";
import { SidebarWMain } from "../../components/SidebarWMain";

const SignIn = () => {
    const router = useRouter();

    const open = (provider: string) => {
        let url = router.query.to?.toString() || "/";

        router.push(`/api/auth/sign-in?id=${provider}&to=${url}`);
    }

    return (
        <>
            <NextSeo title={"Sign In – Dialect"} />

            <Header />

            <SidebarWMain hideSidebar={true}>
                <div className={"flex flex-col gap-8 py-96 h-full my-6 justify-center items-center"}>
                    <h1 className={"text-4xl font-semibold text-center leading-tight"}>
                        Sign In to Dialect
                    </h1>
                    <PrimaryButton onClick={() => open("github")} style={{ transform: "scale(1.15)", fontSize: "14px" }}>
                        <Github className={"w-5 h-5"} /> Continue with GitHub
                    </PrimaryButton>
                </div>
            </SidebarWMain>
        </>
    )
}

export default SignIn;