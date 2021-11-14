import axios from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { ArrowLeft, CheckCircle, MoreHorizontal } from "react-feather";
import { useIsAuthenticated } from "../../providers/Auth";

const Validate = () => {
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false);

    const [cards, setCards] = React.useState<any>([]);

    const router = useRouter();

    const authed = useIsAuthenticated();

    const loadCards = async () => {
        if(!authed) return router.replace("/");

        const res = await axios.get("/api/translations/staged");
        setCards(res.data);

        let totalMemories = 0;
        let totalLoaded = 0;

        let loadedCheck: any;

        res.data.forEach((card: any) => {
            if(card.memories && card.memories.length) {
                card.memories.forEach((mem: any) => {
                    ++totalMemories;

                    const img = new Image()
                    img.src = `/memories/${mem.id}.png`;

                    console.log("Loading", `/memories/${mem.id}.png`)

                    img.onload = () => {
                        ++totalLoaded;
                        console.log("Loaded", `/memories/${mem.id}.png`)
                    }
                })
            }
        })

        loadedCheck = setInterval(() => {
            if(totalMemories == totalLoaded) {
                clearInterval(loadedCheck);
                setLoaded(true);
            }
        }, 100)
    }

    React.useEffect(() => {
        loadCards();

        setTimeout(() => {
            if(loaded !== true) {
                setError(true);
            }
        }, 3000);
    }, []);

    return (
        <>
            <NextSeo title={"Validate – Dialect"} />

            <div className={"w-full h-screen pointer-events-none absolute flex justify-between overflow-hidden"}>
                <div className={"h-screen flex justify-end bg-red-500 bg-opacity-5 rounded-full absolute -left-1/3"} style={{ width: "100vh" }}>
                    <h1 className={"w-1/2 px-20 flex items-center text-red-500 font-semibold text-7xl"}>No</h1>
                </div>

                <div className={"h-screen flex justify-start bg-green-500 bg-opacity-5 rounded-full absolute -right-1/3"} style={{ width: "100vh" }}>
                <h1 className={"w-1/2 px-20 flex justify-end items-center text-green-500 font-semibold text-7xl"}>Yes</h1>
                </div>
            </div>

            <div className={"w-full h-screen flex justify-center bg-gray-100"}>
                <div className={"max-w-7xl flex flex-col w-full max-h-full my-0 xl:my-14 justify-between z-10"}>
                    <header className={"xl:h-14 h-20 px-4 w-full flex items-center bg-white shadow-md xl:rounded-full xl:px-2"}>
                        <div className={"flex justify-start"}>
                            <a onClick={() => window.location.href = "/"} className={"w-10 h-10 flex items-center justify-center rounded-full transition-all hover:bg-gray-100 active:bg-gray-200"}>
                                <ArrowLeft />
                            </a>
                        </div>

                        <div className={"flex justify-center flex-1"}>
                            <span className={"text-xl font-medium text-gray-900 flex items-center gap-3"}>
                                <CheckCircle />
                                Validate
                            </span>
                        </div>

                        <div className={"flex justify-start"}>
                            <a className={"w-10 h-10 flex items-center justify-center rounded-full transition-all hover:bg-gray-100 active:bg-gray-200"}>
                                <MoreHorizontal />
                            </a>
                        </div>
                    </header>

                    <main className={"w-full h-full items-center flex justify-center"}>
                        {!loaded && <div className={"flex flex-col gap-8 justify-center items-center"} style={{ width: "22rem" }}>
                            <div className={"w-12 h-12 rounded-full border-gray-900 animate-spin"} style={{ borderWidth: "6px", borderLeft: "6px solid transparent", animationDuration: "0.8s" }}></div>
                        
                            <span 
                                className={`transition-opacity flex-col font-medium justify-center gap-6 flex items-center text-center text-gray-700 duration-1000 ${error ? `opacity-100` : `opacity-0`}`}
                            >
                                We're having some trouble loading the page. Maybe try refreshing?

                                <a onClick={() => router.reload()} className={"rounded-xl w-max group px-4 py-2 bg-gray-900 hover:bg-gray-700 transition-all text-white font-semibold flex text-base relative items-center gap-2"}>
                                    Reload
                                </a>
                            </span>
                        </div>}
                        
                        {loaded && <div>
                            {cards.length
                                ? cards.map((card: any) => {
                                    return (
                                        <div key={card.id} className={"rounded-xl max-w-3xl w-full flex gap-8 p-8 bg-white shadow-md"}>
                                            <div className={"border border-gray-200 rounded-md w-1/2 h-1/2 relative"}>
                                                <img className={"w-full h-full rounded-md absolute top-0 left-0 z-10 transition-all transform hover:scale-150"} style={{ clipPath: `inset(112px 19px 293px 86px)`, transformOrigin: `center 112px` }} src={`/memories/${card.memories[0].id}.png`}></img>
                                                <img className={"w-full h-full rounded-md absolute top-0 left-0 filter brightness-50"} src={`/memories/${card.memories[0].id}.png`}></img>
                                                <img className={"w-full h-full rounded-md opacity-0"} src={`/memories/${card.memories[0].id}.png`}></img>
                                            </div>
                                            <h1>{card.string}</h1>
                                        </div>
                                    )
                                })
                                : <span>You're all done!</span>}
                        </div>}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Validate;