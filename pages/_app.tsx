import { createTheme, ThemeProvider } from "@mui/material";
import { IdProvider } from "@radix-ui/react-id";
import type { AppProps } from "next/app";
import React from "react";
import { SWRConfig } from "swr";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../providers/Auth";
import "../styles/application.scss";
const Twemoji = require("react-twemoji").default;

const Application = ({ Component, pageProps, authed, user }: AppProps & { authed: any, user: any }) => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#000000',
                main: '#000000',
                dark: '#000000',
                contrastText: '#fff',
            },
        },
        zIndex: {
            modal: 2147483647
        },
        typography: {
            fontFamily: `inherit`,
        },
    });

    return (
        <IdProvider>
            <Twemoji options={{ ext: ".svg", size: "svg" }}>
                <ThemeProvider theme={theme}>
                    <SWRConfig value={{ provider: () => new Map() }}>
                        <AuthProvider authed={authed} user={user}>
                            <Component {...pageProps} />
                        </AuthProvider>
                    </SWRConfig>
                </ThemeProvider>
            </Twemoji>
        </IdProvider>
    )
}

Application.getInitialProps = async ({ ctx }: any) => {
    const { getUserSelf } = await import("../util/auth");

    let user: any = undefined;

    try {
        user = await getUserSelf({ req: ctx.req as any, res: ctx.res as any });
    } catch(e) {}

    return { authed: !!user, user };
}

export default Application;
