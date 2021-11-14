import { NextSeo } from "next-seo"
import React from "react"
import { ArrowRight } from "react-feather"
import { Header } from "../components/Header"

declare global {
    namespace JSX {
        interface IntrinsicElements {
            browser: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
        }
    }
}

class Home extends React.Component {
    public render() {
        return (
            <>
                <NextSeo title={"Crowdsourced translation made easy-peasy."} />

                <Header />

                <div className={"w-full h-full flex justify-center py-40 px-4 md:px-8 xl:px-0"}>
                    <div className={"max-w-7xl w-full flex justify-center flex-col gap-14"}>
                        <h1 className={"text-8xl font-extrabold max-w-10xl"}>
                            Crowdsourced translation made <span className={"text-yellow-500"}>
                                easy-peasy
                            </span>.
                        </h1>

                        <p className={"text-3xl text-gray-600 max-w-xl leading-snug"}>
                            <b>Finally,</b> an open-source translation platform without all the fuss.
                        </p>

                        <div className={"flex gap-3 mt-6"}>
                            <a href={"/api/auth/sign-in"} className={"rounded-2xl group px-8 py-4 bg-gray-900 hover:bg-gray-700 transition-all text-white font-semibold text-lg flex relative items-center gap-2"}>
                                Join today
                            </a>

                            <a href={"https://github.com/dothq/dialect"} target={"_blank"} className={"rounded-2xl group px-8 py-4 bg-transparent text-gray-600 font-semibold hover:text-blue-500 transition-all text-lg flex relative items-center gap-2"}>
                                GitHub <ArrowRight />
                            </a>

                            <browser></browser>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Home
