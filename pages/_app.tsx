import { createTheme, ThemeProvider } from "@mui/material";
import { IdProvider } from "@radix-ui/react-id";
import axios from "axios";
import absoluteUrl from "next-absolute-url";
import type { AppProps } from "next/app";
import nookies from "nookies";
import React from "react";
import { SWRConfig } from "swr";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../providers/Auth";
import "../styles/application.scss";
const Twemoji = require("react-twemoji").default;

class Application extends React.Component<AppProps & { authed: boolean, user: any }> {
    static async getInitialProps({ ctx }: any) {
        const { origin } = absoluteUrl(ctx.req);

        let user: any = undefined;

        try {
            const { data } = await axios.get(`${origin}/api/auth/profile`, { ...(ctx.req as any) });

            user = data;
        } catch(e) {}

        const authed = !!nookies.get(ctx).session && user !== undefined;

        return { authed, user };
    }

    public render() {
        const { Component, pageProps } = this.props;

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
                            <AuthProvider authed={this.props.authed} user={this.props.user}>
                                <Component {...pageProps} />
                            </AuthProvider>
                        </SWRConfig>
                    </ThemeProvider>
                </Twemoji>
            </IdProvider>
        )
    }
}

export default Application;
