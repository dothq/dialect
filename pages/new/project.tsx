import TextField from "@mui/material/TextField";
import axios from "axios";
import { useFormik } from "formik";
import absoluteUrl from "next-absolute-url";
import { NextSeo } from "next-seo";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { Plus } from "react-feather";
import slugify from "slugify";
import * as yup from "yup";
import { PrimaryButton } from "../../components/Button";
import { Header } from "../../components/Header";
import { SidebarWMain } from "../../components/SidebarWMain";

const newProjectSchema = yup.object({
    slug: yup
        .string()
        .min(2, "Slug must be longer than 2 characters")
        .max(64, "Slug must be less than 64 characters")
        .required("Slug is required"),
    name: yup
        .string()
        .min(2, "Name must be longer than 2 characters")
        .max(100, "Name must be less than 100 characters")
        .required("Name is required"),
})

const NewProject = () => {
    const router = useRouter();

    const [hint, setHint] = React.useState<boolean[]>([false, false]);

    const [url, setUrl] = React.useState<any>();

    const formik = useFormik({
        initialValues: {
            name: "",
            slug: ""
        },
        validationSchema: newProjectSchema,
        onSubmit: (data: any) => {
            axios.post("/api/projects/create", data)
                .then(res => {
                    router.push(`/projects/${res.data.slug}`)
                })
        }
    })

    React.useEffect(() => {
        const slugged = slugify(formik.values.name || "").toLowerCase();
        
        setUrl(slugged);
    }, [formik.values.name])

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

                    <form 
                        onSubmit={formik.handleSubmit} 
                        className={"mt-5 flex flex-col gap-8 w-full items-center"}
                    >
                        <fieldset className={"hidden"}>
                            <TextField 
                                id={"slug"}
                                fullWidth 
                                variant="standard"
                                value={formik.values.slug}
                                onChange={formik.handleChange}
                                error={formik.touched.slug && Boolean(formik.errors.slug)}
                                helperText={formik.touched.slug && formik.errors.slug}
                                className={"flex"}
                            />
                        </fieldset>
                        
                        <fieldset className={"flex flex-col gap-4 w-96"}>
                            <TextField 
                                id={"name"}
                                fullWidth 
                                label="Project name" 
                                variant="standard"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                type={"gfsdgfhg"}
                                InputProps={{
                                    autoComplete: "off",
                                    autoCapitalize: "false",
                                    autoCorrect: "false"
                                }}
                                className={"flex"}
                                onBlur={() => formik.setFieldValue("slug", url)}
                            />
                            <span className={"text-gray-600 text-left transition-all select-none"} style={{ fontSize: "12px", opacity: Number(url && url.length) }}>
                                Your project URL will be:{" "}
                                <strong className={"font-medium"}>
                                    {absoluteUrl().origin}/projects/{url}
                                </strong>
                            </span>
                        </fieldset>

                        <fieldset className={"flex justify-center"}>
                            <PrimaryButton type={"submit"} style={{ opacity: url ? 1 : 0.5, pointerEvents: url ? "all" : "none" }}>
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