import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import { CheckCircle, ChevronDown, Globe, Home, LogOut, Plus } from "react-feather";
import useSWR from "swr";
import { useIsAuthenticated } from "../../providers/Auth";
import { fetcher } from "../../util/fetcher";
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "../DropdownMenu";

export const Header = () => {
    const authed = useIsAuthenticated();

    const [searchActive, setSActive] = React.useState(false);

    const inputRef = React.createRef<HTMLInputElement>();

    const router = useRouter();

    const { data, error } = useSWR("/api/auth/profile", fetcher)

    React.useEffect(() => {
        if(searchActive) inputRef.current?.focus();
    }, [searchActive])
    
    return (
        <header className={"w-full h-16 px-4 md:px-8 xl:px-0 flex justify-center sticky top-0 bg-white"}>
            <div className={"w-full h-full max-w-7xl flex items-center relative justify-between border-b border-gray-200"}>
                <div>
                    <Link href={"/"}>
                        <a className={"flex gap-4 items-center flex-1"}>
                            <img src={"/assets/images/logo.svg"}></img>
                        </a>
                    </Link>
                </div>

                <div className={"flex gap-4 items-center flex-1 justify-end"}>
                    {!authed && <a href={"/api/auth/sign-in"} className={"rounded-xl group px-4 py-2 bg-gray-900 hover:bg-gray-700 transition-all text-white font-semibold flex text-base relative items-center gap-2"}>
                        Sign In
                    </a>}

                    {data && authed && <>
                        <div className={"flex items-center"}>
                            <DropdownMenu trigger={<button className={"w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50"}>
                                <Plus className={"w-5 h-5"} />
                            </button>}>
                                <DropdownMenuItem onClick={() => router.push("/new/project")}>
                                    New project
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/new/language")}>
                                    New language
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/new/organisation")}>
                                    New organisation
                                </DropdownMenuItem>
                            </DropdownMenu>
                        </div>

                        <div className={"flex items-center"}>
                            <DropdownMenu trigger={<button className={"flex gap-4 items-center flex-1 justify-end group h-full"}>
                                <img className={"w-8 h-8 rounded-full border border-gray-200"} src={"/api/auth/avatar"}></img>
                                <div className={"flex gap-2 group-hover:text-blue-600"}>
                                    <span className={"font-medium"}>{data.name}</span>
                                    <ChevronDown className={"w-6 h-6 stroke-current"} />
                                </div>
                            </button>}>
                                <DropdownMenuItem onClick={() => router.push("/")}>
                                    <Home className={"w-4 h-4 mr-3"} /> Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => router.push("/")}>
                                    <CheckCircle className={"w-4 h-4 mr-3"} /> Validate
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/")}>
                                    <Globe className={"w-4 h-4 mr-3"} /> Translate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => window.location.href = "/api/auth/sign-out"}>
                                    <LogOut className={"w-4 h-4 mr-3"} /> Log Out
                                </DropdownMenuItem>
                            </DropdownMenu>
                        </div>
                    </>}
                </div>
            </div>
        </header> 
    )
}