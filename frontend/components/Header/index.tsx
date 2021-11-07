import React from "react"

export const Header = () => {
    return (
        <header className={"h-20 w-full px-4 md:px-8 xl:px-0 flex justify-center"}>
            <div className={"w-full h-full max-w-7xl flex items-center"}>
                <div className={"flex gap-4 items-center flex-1"}>
                    <img src={"/favicon.png"}></img>
                </div>

                <div className={"flex gap-4 items-center flex-1 justify-end"}>
                    <a href={"/auth/sign-in"} className={"rounded-xl group px-4 py-2 bg-gray-900 hover:bg-gray-700 transition-all text-white font-semibold flex text-base relative items-center gap-2"}>
                        Sign In
                    </a>
                </div>
            </div>
        </header> 
    )
}