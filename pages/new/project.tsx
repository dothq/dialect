import TextField from "@mui/material/TextField";
import axios from "axios";
import { NextSeo } from "next-seo";
import React from "react";
import { AlertCircle, Plus } from "react-feather";
import { PrimaryButton } from "../../components/Button";
import { Header } from "../../components/Header";
import { SidebarWMain } from "../../components/SidebarWMain";

const NewProject = () => {
    const [hint, setHint] = React.useState<boolean[]>([false, false]);

    const [name, setName] = React.useState("");
    const [slug, setSlug] = React.useState("");
    const [url, setUrl] = React.useState("");

    const [error, setError] = React.useState<any>("");
    const [inputError, setIError] = React.useState(false);

    const create = (e: any) => {
        e.preventDefault();

        setError(null);

        setTimeout(() => {
            axios.post("/api/projects/create", { name, slug })
                .then(res => {
                    window.location.href = `/projects/${slug}`
                }).catch(e => setError(e.message))
        }, 500);
    }

    return (
        <>
            <NextSeo title={"New Project – Dialect"} />

            <Header />

            <SidebarWMain hideSidebar={true}>
                <div className={"flex flex-col gap-4 py-12 justify-center items-center text-center"}>
                    <h1 className={"text-3xl font-semibold"}>
                        <Plus className={"w-12 flex h-12"} />
                    </h1>
                    
                    <h1 className={"text-3xl font-semibold"}>
                        Create a new project
                    </h1>
                    <p className={"text-gray-500"}>
                        A project holds all your languages and translations.
                    </p>

                    <div
                        className={"transition-all overflow-hidden flex"}
                        style={{
                            display: error ? "" : "none"
                        }}
                    >
                        <span 
                            className={"text-red-500 font-medium flex gap-2 overflow-hidden"}
                        >
                            <AlertCircle className={"stroke-current"} />
                            {error}
                        </span>
                    </div>

                    <form className={"mt-5 flex flex-col gap-8 w-full items-center"} onSubmit={create}>
                        <fieldset className={"flex flex-col gap-4 w-96"}>
                            <TextField 
                                fullWidth 
                                label="Project name" 
                                variant="standard"
                                error={inputError}
                                value={name}
                                className={"flex"}
                                onChange={(e) => {
                                    setHint([true, hint[1]])
                                    setName(e.target.value.substr(0, 64));

                                    let slug = e.target.value;
                                    slug = slug.toLowerCase();
                                    
                                    slug = slug.replace(/\//g, "-");
                                    slug = slug.replace(/ /g, "-");

                                    if(slug.endsWith("--")) {
                                        slug = slug.replace(/--/g, "-");
                                    }

                                    if(slug.length >= 64) {
                                        slug = slug.substr(0, 64);
                                    }

                                    setIError(
                                        slug.length <= 0 ||
                                        name.length > 63
                                    );

                                    setSlug(slug);
                                    setUrl(`${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}`: ``}/${slug}`)
                                }}
                            />
                            <span className={"text-sm text-gray-600"} style={{ opacity: Number(hint[0]) }}>
                                Your project URL will be: <strong className={"font-medium"}>
                                    {url}
                                </strong>
                            </span>
                        </fieldset>

                        <fieldset className={"flex justify-center"}>
                            <PrimaryButton type={"submit"}>
                                Create
                            </PrimaryButton>
                        </fieldset>
                    </form>
                </div>
            </SidebarWMain>
        </>
    )
}

export default NewProject;