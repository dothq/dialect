import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import { ChevronDown, Home, LogOut, Plus, Settings } from "react-feather";
import { useAuth, useIsAuthenticated } from "../../providers/Auth";
import { PrimaryButton } from "../Button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "../DropdownMenu";

export const Header = () => {
    const authed = useIsAuthenticated();

    const [searchActive, setSActive] = React.useState(false);

    const inputRef = React.createRef<HTMLInputElement>();

    const router = useRouter();

    const { user } = useAuth();

    React.useEffect(() => {
        if(searchActive) inputRef.current?.focus();
    }, [searchActive])
    
    return (
        <header className={"w-full h-16 px-4 md:px-8 xl:px-0 flex justify-center sticky top-0 bg-white z-50"}>
            <div className={"w-full h-full max-w-7xl flex items-center relative justify-between border-b border-gray-200"}>
                <div className={"flex items-center gap-8"}>
                    <Link href={"/"}>
                        <a className={"flex gap-4 items-center flex-1"}>
                            <img src={"/assets/images/logo.svg"}></img>
                        </a>
                    </Link>

                    <div className={"flex gap-10"}>
                        <Link href={"/"}>
                            <a className={"font-medium text-gray-600 hover:text-gray-900 transition-all"}>
                                Explore
                            </a>
                        </Link>

                        <Link href={"/languages"}>
                            <a className={"font-medium text-gray-600 hover:text-gray-900 transition-all"}>
                                Languages
                            </a>
                        </Link>

                        <Link href={"/engine"}>
                            <a className={"font-medium text-gray-600 hover:text-gray-900 transition-all"}>
                                Engine
                            </a>
                        </Link>
                    </div>
                </div>

                <div className={"flex gap-4 items-center flex-1 justify-end"}>
                    {!authed && <PrimaryButton onClick={() => router.push(`/accounts/sign-in?to=${router.asPath}`)}>
                        Sign In
                    </PrimaryButton>}

                    {user && authed && <>
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
                                    <span className={"font-medium"}>{user.name}</span>
                                    <ChevronDown className={"w-6 h-6 stroke-current"} />
                                </div>
                            </button>}>
                                <DropdownMenuItem onClick={() => router.push("/")}>
                                    <Home className={"w-4 h-4 mr-3"} /> Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/accounts/settings")}>
                                    <Settings className={"w-4 h-4 mr-3"} /> Settings
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