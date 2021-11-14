import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import nookies from "nookies";
import React from "react";
import { SWRConfig } from "swr";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../providers/Auth";
import "../styles/application.scss";

class Application extends React.Component<AppProps & { authed: boolean }> {
    static getInitialProps({ ctx }: any) {
        const authed = !!nookies.get(ctx).session;
        
        return { authed };
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
            typography: {
                fontFamily: `inherit`,
            },
        });
          
        return (
            <ThemeProvider theme={theme}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <AuthProvider authed={this.props.authed}>
                        <Component {...pageProps} />
                    </AuthProvider>
                </SWRConfig>
            </ThemeProvider>
        )
    }
}

export default Application;
