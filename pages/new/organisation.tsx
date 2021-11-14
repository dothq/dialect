import TextField from "@mui/material/TextField";
import axios from "axios";
import { NextSeo } from "next-seo";
import React from "react";
import { Header } from "../../components/Header";
import { SidebarWMain } from "../../components/SidebarWMain";

const NewOrganisation = () => {
    const [hint, setHint] = React.useState<boolean[]>([false, false]);

    const [name, setName] = React.useState("");
    const [slug, setSlug] = React.useState("");
    const [url, setUrl] = React.useState("");

    const [error, setError] = React.useState("");

    const create = () => {
        axios.post("/api/organisations/create", { name, slug })
            .then(res => {
                window.location.href = `/${slug}`
            }).catch(e => setError(e.message))
    }

    return (
        <>
            <NextSeo title={"New Organisation – Dialect"} />

            <Header />

            <SidebarWMain>
                <div className={"flex flex-col gap-4 p-12"}>
                    <h1 className={"text-3xl font-semibold"}>
                        Create a new organisation
                    </h1>
                    <p className={"text-gray-500"}>
                        An organisation holds all your projects and languages.
                    </p>

                    {error && <span>{error}</span>}

                    <form className={"mt-5 flex flex-col gap-8"}>
                        <fieldset className={"flex flex-row gap-4 w-1/2 items-center"}>
                            <TextField 
                                fullWidth 
                                label="Organisation name" 
                                variant="standard" 
                                onChange={(e) => {
                                    setHint([true, hint[1]])
                                    setName(e.target.value);
                                }}
                            />
                            <span style={{ opacity: Number(hint[0]) }}></span>
                        </fieldset>

                        <fieldset className={"flex flex-col gap-3 w-1/2"}>
                            <TextField 
                                fullWidth 
                                label="Organisation slug" 
                                variant="standard" 
                                value={slug}
                                onChange={(e) => {
                                    setHint([hint[0], true]);

                                    let slug = e.target.value;
                                    slug = slug.replace(/\//g, "-");
                                    slug = slug.replace(/ /g, "-");

                                    if(slug.endsWith("--")) {
                                        slug = slug.replace(/--/g, "-");
                                    }

                                    if(slug.length >= 16) {
                                        slug = slug.substr(0, 16);
                                    }

                                    setSlug(slug);
                                    setUrl(`${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}`: ``}/${slug}`)
                                }}
                            />
                            <span className={"text-sm text-gray-600"} style={{ opacity: Number(hint[1]) }}>
                                Your organisation URL will be: <strong className={"font-medium"}>
                                    {url}
                                </strong>
                            </span>
                        </fieldset>

                        <fieldset>
                            <a onClick={() => create()} className={"rounded-xl w-max group px-4 py-2 bg-gray-900 hover:bg-gray-700 transition-all text-white font-semibold flex text-base relative items-center gap-2"}>
                                Create
                            </a>
                        </fieldset>
                    </form>
                </div>
            </SidebarWMain>
        </>
    )
}

export default NewOrganisation;