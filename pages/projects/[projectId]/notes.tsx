import { TextField } from "@mui/material";
import { Project } from "@prisma/client";
import axios from "axios";
import React from "react";
import { projectSSR, ProjectTemplate } from ".";
import { PrimaryButton } from "../../../components/Button";
import { useAuth } from "../../../providers/Auth";

const ProjectNotes = (project: Project) => {
    const { user } = useAuth();

    const [editing, setEditing] = React.useState(false);

    const [localNote, setLocalNote] = React.useState(project.note || "");

    const saveNote = () => {
        axios.put(`/api/projects/${project.id}`, { note: localNote })
            .then(_ => setEditing(false));
    }

    return (
        <ProjectTemplate 
            {...project}
        >
            <div className={"flex flex-col gap-6"}>
                {!editing && <>
                    {localNote && <p>
                        {localNote}    
                    </p>}

                    {!localNote && <em>Nothing here yet.</em>}

                    {(user && project.author_id == user.id) && (
                        <PrimaryButton onClick={() => setEditing(true)}>Edit Note</PrimaryButton>
                    )}
                </>}
                
                {editing && <>
                    <TextField 
                        multiline
                        placeholder={"Enter any information about your project, how to contribute and your language guidelines."}
                        minRows={3}
                        maxRows={8}
                        value={localNote}
                        autoFocus={true}
                        onChange={(e: any) => setLocalNote(e.target.value)}
                    />

                    {(user && project.author_id == user.id) && (
                        <PrimaryButton onClick={() => saveNote()}>Save Note</PrimaryButton>
                    )}
                </>}
            </div>
        </ProjectTemplate>
    );
}

export const getServerSideProps = projectSSR
  
export default ProjectNotes;