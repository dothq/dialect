import { TextField } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/dist/client/router"
import React from "react"
import { projectSSR, ProjectTemplate } from "."
import { DangerButton, PrimaryButton } from "../../../components/Button"
import { useAuth } from "../../../providers/Auth"
import NotAuthorised from "../../403"

const ProjectSettings = (project: any) => {
    const queued: any = {};
    const router = useRouter();
    
    const { user } = useAuth();

    const [done, setDone] = React.useState(false);

    const update = (key: string, value: string) => {
        queued[key] = value;
    }

    React.useEffect(() => {
        setTimeout(() => {
            setDone(false);
        }, 1000);
    }, [done])

    return user ? (
        <ProjectTemplate 
            {...project}
        >
            <div className={"max-w-7xl flex flex-col gap-16 divide-y divide-gray-200"}>
                <div className={"flex flex-col gap-8 max-w-md"}>
                    <h3 className={"text-2xl font-semibold text-gray-800"}>General</h3>
    
                    <TextField 
                        label={"Name"} 
                        variant={"standard"} 
                        defaultValue={project.name}
                        onKeyUp={(e: any) => update("name", e.target.value)}
                    />
                    <TextField 
                        label={"Description"} 
                        multiline
                        variant={"standard"} 
                        defaultValue={project.description}
                        onKeyUp={(e: any) => update("description", e.target.value)}
                    />
                
                    <PrimaryButton onClick={() => {
                        axios.put(`/api/projects/${project.slug}`, queued).then(() => {
                            setDone(true);
                            router.push(`/projects/${project.slug}/settings`)
                        })
                        
                    }}>Save{done ? `d!`: ``}</PrimaryButton>
                </div>

                <div className={"flex flex-col gap-8 max-w-md pt-16"}>
                    <h3 className={"text-2xl font-semibold text-red-500"}>Danger Zone</h3>
    
                    <DangerButton>Transfer Ownership</DangerButton>
                    <DangerButton>Delete Project</DangerButton>
                    
                </div>
            </div>
        </ProjectTemplate>
    ) : <NotAuthorised />;
}

export const getServerSideProps = projectSSR
  
export default ProjectSettings;