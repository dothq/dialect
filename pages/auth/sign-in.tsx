import { Github, Google } from "@icons-pack/react-simple-icons";
import React from "react";
import { ArrowLeft, Twitter } from "react-feather";
import { Header } from "../../components/Header";
import { Layout } from "../../components/Layout";

const SignIn = () => {
    const [y, setY] = React.useState(0);
    const [blockAnimate, setBlockAnimate] = React.useState(false);

    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setBlockAnimate(false);

            const index = (y / 36);

            if(index >= 12) {
                setBlockAnimate(true);

                return setTimeout(() => {
                    setY(0);
                }, 1);
            }

            setY(36 * (index + 1));
        }, 4000)
    }, [y])

    React.useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, Math.floor(Math.random() * 500 + 200));
    }, [])

    return (
        <Layout title={"Sign In"}>
            <div className={"w-full h-screen flex justify-center items-center bg-gray-100"}>
                <div className={"bg-white shadow-md rounded-xl relative"} style={{ width: "32rem" }}>
                    <div style={{ opacity: Number(!loaded) }} className={`transition-all duration-500 z-${loaded ? 0 : 40} bg-white rounded-xl flex justify-center items-center w-full h-full absolute`}>
                        <img className={`w-10 h-10 animate-spin`} src={"data:image/png;base64,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"}></img>
                    </div>
                    
                    <div className={`p-12 flex flex-col gap-4 justify-center items-center`}>
                        <a href={"/"} onClick={(e) => {
                            e.preventDefault();
                            window.history.back();
                        }} className={"rounded-2xl group px-8 py-4 bg-transparent text-gray-600 font-semibold hover:text-blue-500 transition-all text-lg flex relative items-center gap-2 -ml-2"}>
                            <ArrowLeft /> Back
                        </a>
                        
                        <h1 className={"font-semibold text-3xl flex flex-col overflow-hidden max-h-9 text-center"}>
                            <div className={`flex select-none flex-col ${blockAnimate ? `transition-none` : `transition-all`} duration-200`} style={{ transform: `translateY(-${y}px)` }}>
                                <span>Hello</span>
                                <span>Hola</span>
                                <span className={"-mt-1"}>Bonjour</span>
                                <span>Hallo</span>
                                <span>Ciao</span>
                                <span>Cześć</span>
                                <span className={"mt-1"}>Hello</span>
                                <span>Hola</span>
                                <span className={"-mt-1"}>Bonjour</span>
                                <span>Hallo</span>
                                <span>Ciao</span>
                                <span>Cześć</span>
                                <span className={"mt-1"}>Hello</span>
                            </div>
                        </h1>

                        <p className={"text-lg text-gray-600 mb-12"}>Sign in to continue.</p>

                        <a href={"/api/auth/github"} className={"rounded-2xl text-center w-max group px-8 py-4 bg-gray-900 hover:bg-gray-700 transition-all text-white font-semibold text-lg flex relative items-center gap-2"}>
                            <Github className={"mr-2"} /> Sign in with GitHub
                        </a>

                        <a href={"/api/auth/twitter"} className={"rounded-2xl text-center w-max group px-8 py-4 hover:opacity-80 transition-all text-white font-semibold text-lg flex relative items-center gap-2"} style={{ backgroundColor: "#1da1f2" }}>
                            <Twitter className={"mr-2 fill-current"} /> Sign in with Twitter
                        </a>

                        <a href={"/api/auth/google"} className={"rounded-2xl text-center w-max group px-8 py-4 bg-gray-100 hover:bg-gray-200 transition-all text-black font-semibold text-lg flex relative items-center gap-2"}>
                            <Google className={"mr-2"} /> Sign in with Google
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SignIn;