import { TextField } from "@mui/material"
import { Project } from "@prisma/client"
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTrigger } from "@radix-ui/react-dialog"
import axios from "axios"
import { useFormik } from "formik"
import { useRouter } from "next/dist/client/router"
import React from "react"
import slugify from "slugify"
import * as yup from "yup"
import { projectSSR, ProjectTemplate } from "."
import { DangerButton, PrimaryButton, SecondaryButton } from "../../../components/Button"
import { useAuth } from "../../../providers/Auth"
import { diff } from "../../../util/diff"
import NotAuthorised from "../../403"

const settingsSchema = yup.object({
    slug: yup
        .string()
        .min(2, "Slug must be longer than 2 characters")
        .max(100, "Slug must be less than 100 characters")
        .required("Slug is required"),
    name: yup
        .string()
        .min(1, "Name must be longer than 1 character")
        .max(100, "Name must be less than 100 characters")
        .required("Name is required"),
    description: yup
        .string()
        .nullable()
});

const DeleteProjectDialog = ({ id, name }: Project) => {
    const [satisfied, setSatisfied] = React.useState(false);

    const deleteProject = () => {
        axios.delete(`/api/projects/${id}`).then(() => {
            window.location.href = "/";
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DangerButton>Delete Project</DangerButton>
            </DialogTrigger>
            <div>
                <DialogOverlay className={"bg-black bg-opacity-50 flex w-full h-screen fixed top-0 left-0 animate-overlay-dialog-open"} />
                <DialogContent className={"p-8 bg-white rounded-xl flex flex-col gap-2 fixed top-1/2 left-1/2 animate-overlay-dialog-open"} style={{ transform: "translate(-50%, -50%)" }}>
                    <h1 className={"text-xl font-semibold"}>Delete Project</h1>
                    <p className={"text-gray-600"}>
                        Type <strong>I understand what I am doing</strong> below to permanently delete <strong>{name}</strong>.<br /><br />
                        All data from this project will be unrecoverable after<br /> this process.
                    </p>
                
                    <form className={"mt-4 flex flex-col gap-5 w-full"} onSubmit={(e) => {
                        e.preventDefault();

                        if(satisfied) {
                            deleteProject();
                        }
                    }}>                    
                        <fieldset className={"flex flex-col gap-4 w-full"}>
                            <TextField 
                                fullWidth 
                                label="Confirm" 
                                variant="standard"
                                className={"flex"}
                                required
                                error={!satisfied}
                                onChange={(e) => setSatisfied(e.target.value.toLowerCase() == "i understand what i am doing")}
                            />
                        </fieldset>

                        <fieldset className={"w-full flex gap-2 justify-end mt-8"}>
                            <DialogClose>
                                <SecondaryButton type={"reset"}>
                                    Cancel
                                </SecondaryButton>
                            </DialogClose>
                            
                            <DangerButton 
                                type={"submit"}
                                style={{ 
                                    opacity: satisfied ? 1 : 0.2, 
                                    pointerEvents: satisfied ? "all" : "none" 
                                }}
                            >
                                Delete Account
                            </DangerButton>
                        </fieldset>
                    </form>
                </DialogContent>
            </div>
        </Dialog>
    )
}

const ProjectSettings = (project: any) => {
    const router = useRouter();

    const { user } = useAuth();

    const formik = useFormik({
        initialValues: {
            slug: project.slug,
            name: project.name,
            description: project.description
        },
        validationSchema: settingsSchema,
        
        onSubmit: async (data: any) => {
            const res = await axios.put(`/api/projects/${project.id}`, diff(project, data));

            router.push(`/projects/${res.data.slug}/settings`);
        }
    })

    return user ? (
        <ProjectTemplate 
            {...project}
        >
            <div className={"max-w-7xl flex flex-col gap-16 divide-y divide-gray-200"}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={"flex flex-col gap-8 max-w-md"}>
                        <h3 className={"text-2xl font-semibold text-gray-800"}>General</h3>
        
                        <TextField 
                            id={"slug"}
                            label={"Slug"} 
                            variant={"standard"}
                            value={formik.values.slug.toLowerCase()}
                            onChange={formik.handleChange}
                            error={formik.touched.slug && Boolean(formik.errors.slug)}
                            helperText={formik.touched.slug && formik.errors.slug}
                            onBlur={() => formik.setFieldValue("slug", slugify(formik.values.slug))}
                        />

                        <TextField 
                            id={"name"}
                            label={"Name"} 
                            variant={"standard"}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />

                        <TextField 
                            id={"description"}
                            label={"Description"} 
                            multiline
                            variant={"standard"} 
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    
                        <PrimaryButton type={"submit"}>Save</PrimaryButton>
                    </div>
                </form>

                <div className={"flex flex-col gap-8 max-w-md pt-16"}>
                    <h3 className={"text-2xl font-semibold text-red-500"}>Danger Zone</h3>
    
                    <DangerButton>Transfer Ownership</DangerButton>
                    <DeleteProjectDialog {...project} />
                </div>
            </div>
        </ProjectTemplate>
    ) : <NotAuthorised />;
}

export const getServerSideProps = projectSSR
  
export default ProjectSettings;