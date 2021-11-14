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

        return (
            <SWRConfig value={{ provider: () => new Map() }}>
                <AuthProvider authed={this.props.authed}>
                    <Component {...pageProps} />
                </AuthProvider>
            </SWRConfig>
        )
    }
}

export default Application;
