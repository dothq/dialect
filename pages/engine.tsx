import { Box, IconButton, Paper, Tab, Tabs, TextField } from "@mui/material";
import { Project } from "@prisma/client";
import axios from "axios";
import { NextSeo } from "next-seo";
import React from "react";
import { ArrowRight } from "react-feather";
import { useSWRConfig } from "swr";
import { Header } from "../components/Header";
import { SidebarWMain } from "../components/SidebarWMain";
import { useIsAuthenticated } from "../providers/Auth";

const Engine = ({ projects }: { projects: Project[] }) => {
    const { cache, mutate, ...extraConfig } = useSWRConfig()
    const authed = useIsAuthenticated();

    const [result, setResult] = React.useState("");

    let stoppedTypingInt: any;

    const maybeStartTranslating = (value: string) => {
        clearTimeout(stoppedTypingInt);

        stoppedTypingInt = setTimeout(() => {
            setResult("Translating...");

            axios.get(
                `/api/engine/translate?q=${value}&from=english&to=spanish`
            ).then(r => {
                console.log(r.data);
                setResult(r.data.translated);
            })
        }, 300);
    }

    return (
        <>
            <NextSeo title={"Translate – Dialect"} />

            <Header />

            {authed && <SidebarWMain hideSidebar={true}>
                <div className={"flex flex-col gap-4 py-12"}>
                    <h1 className={"text-3xl font-semibold"}>
                        Translate
                    </h1>
                    <p className={"text-gray-500"}>
                        Search from translation sources to convert text from one language to another.
                    </p>

                    <Paper className={"mt-10"}>
                        <Box className={"flex justify-between"} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Box>
                                <Tabs value={"auto"}>
                                    <Tab value={"auto"} label={"Detect Language"} />
                                    <Tab value={"en"} label={"English"} />
                                    <Tab value={"fr"} label={"French"} />
                                    <Tab value={"de"} label={"German"} />
                                    <Tab value={"it"} label={"Italian"} />
                                    <Tab value={"es"} label={"Spanish"} />
                                </Tabs>
                            </Box>
                            <IconButton className={"pointer-events-none"}>
                                <ArrowRight />
                            </IconButton>
                            <Box>
                                <Tabs value={"en"}>
                                    <Tab value={"auto"} label={"Detect Language"} />
                                    <Tab value={"en"} label={"English"} />
                                    <Tab value={"fr"} label={"French"} />
                                    <Tab value={"de"} label={"German"} />
                                    <Tab value={"it"} label={"Italian"} />
                                    <Tab value={"es"} label={"Spanish"} />
                                </Tabs>
                            </Box>
                        </Box>

                        <div className={"flex justify-between"}>
                            <TextField 
                                rows={6}
                                fullWidth 
                                multiline
                                onKeyUp={(e: any) => maybeStartTranslating(e.target.value)}
                                sx={{ 
                                    borderRight: 1, 
                                    borderColor: 'divider',
                                    "*": { 
                                        border: "none !important",
                                        fontSize: "24px"
                                    },
                                    "* > textarea": {
                                        padding: "1rem"
                                    }
                                }} />
                            <TextField 
                                fullWidth 
                                inputProps={{
                                    readOnly: true
                                }}
                                multiline
                                value={result}
                                placeholder={"Translation"}
                                sx={{ 
                                    "*": { 
                                        border: "none !important",
                                        fontSize: "24px"
                                    },
                                    "* > textarea": {
                                        padding: "1rem"
                                    }
                                }} 
                            />
                        </div>
                    </Paper>
                </div>
            </SidebarWMain>}
        </>
    )
}

export default Engine;