import { TextField } from "@mui/material"
import { Project } from "@prisma/client"
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTrigger } from "@radix-ui/react-dialog"
import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"
import { useRouter } from "next/dist/client/router"
import React from "react"
import { Plus } from "react-feather"
import title from "title"
import { Header } from "../../components/Header"
import { SidebarItem } from "../../components/SidebarItem"
import { SidebarSection } from "../../components/SidebarSection"
import { SidebarWMain } from "../../components/SidebarWMain"
import { db } from "../../db"

const NewLanguageDialog = ({ projectName }: { projectName: string }) => {
    const [name, setName] = React.useState("");
    const [code, setCode] = React.useState("");
    const [nativeName, setNativeName] = React.useState("");
    const [speakers, setSpeakers] = React.useState<any>();

    const [codeError, setCodeError] = React.useState(false);

    const reset = () => {
        setName("");
        setCode("");
        setNativeName("");
        setSpeakers(undefined);
    }

    const [lang, setLang] = React.useState('');

    const handleLangChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (
        <Dialog onOpenChange={reset}>
            <DialogTrigger asChild>
                <SidebarItem>
                    Add Language <Plus className={"ml-auto w-5 h-5"} />
                </SidebarItem>
            </DialogTrigger>
            <div>
                <DialogOverlay className={"bg-black bg-opacity-50 flex w-full h-screen fixed top-0 left-0 animate-overlay-dialog-open"} />
                <DialogContent className={"p-8 bg-white rounded-xl flex flex-col gap-2 fixed top-1/2 left-1/2 animate-overlay-dialog-open"} style={{ transform: "translate(-50%, -50%)" }}>
                    <h1 className={"text-xl font-semibold"}>Add Language</h1>
                    <p className={"text-gray-600"}>Request the addition of a new language to <b>{projectName}</b>.</p>
                
                    <form className={"mt-4 flex flex-col gap-5"}>                    
                        <fieldset className={"flex flex-col gap-4"}>
                            <TextField 
                                fullWidth 
                                label="Name" 
                                variant="standard"
                                className={"w-1/2 flex"}
                                required
                                value={name}
                                onChange={(e) => setName(title(e.target.value))}
                            />
                        </fieldset>

                        <fieldset className={"flex flex-col gap-3"}>
                            <TextField 
                                fullWidth 
                                label="Locale code"
                                variant="standard"
                                className={"w-1/2 flex"}
                                required
                                error={codeError}
                                value={code}
                                inputProps={{
                                    pattern: "^([a-z]{2})(-[A-Z]{2})?"
                                }}
                                onChange={(e) => {
                                    const regex = /^([a-z]{2})(-[A-Z]{2})?/;
                                    const value = e.target.value.replace(/ /g, "") as any || "";

                                    console.log(e.target.value);

                                    setCode(value);

                                    const match = value.match(regex);

                                    if(
                                        (
                                            match && 
                                            match[0] &&
                                            match[0] == value
                                        )
                                    ) {
                                        setCodeError(false)
                                    } else {
                                        setCodeError(!!value.length)
                                    }
                                }}
                            />
                            <span className={"text-sm text-gray-600"}>
                                Must be a valid language code. For example, <b>en-US</b> or <b>fr-FR</b>.
                            </span>
                        </fieldset>

                        <fieldset className={"flex flex-col gap-3"}>
                            <TextField 
                                fullWidth 
                                label="Native Name"
                                variant="standard"
                                className={"w-1/2 flex"}
                                required
                                value={nativeName}
                                onChange={(e) => setNativeName(title(e.target.value))}
                            />
                            <span className={"text-sm text-gray-600"}>
                                Native name of your language. For example, <b>Français</b>.
                            </span>
                        </fieldset>

                        <fieldset className={"flex flex-col gap-3 w-44"}>
                            <TextField 
                                fullWidth 
                                label="Average Speakers"
                                variant="standard"
                                className={"flex w-44"}
                                type={"number"}
                                required
                                value={speakers}
                                onChange={(e) => {
                                    let value = e.target.value;

                                    if(!value.length) setSpeakers("");

                                    if(!isNaN(parseInt(value))) {
                                        if(parseInt(value) >= 0) {
                                            setSpeakers(parseInt(value))
                                        }
                                    }
                                }}
                            />
                        </fieldset>

                        <fieldset className={"w-full flex gap-2 justify-end mt-8"}>
                            <DialogClose>
                                <button type={"reset"} className={"rounded-xl w-max group px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-all text-gray-900 font-semibold flex text-base relative items-center gap-2"}>
                                    Cancel
                                </button>
                            </DialogClose>
                            
                            <button type={"submit"} className={"rounded-xl w-max group px-4 py-2 bg-gray-900 hover:bg-gray-700 transition-all text-white font-semibold flex text-base relative items-center gap-2"}>
                                Create
                            </button>
                        </fieldset>
                    </form>

                    <DialogClose asChild>
                        g
                    </DialogClose>
                </DialogContent>
            </div>
        </Dialog>
    )
}

const Project = ({ name, slug, supported_languages }: any) => {
    const router = useRouter();

    return (
        <>
            <NextSeo title={`${name} – Dialect`} />

            <Header />

            <SidebarWMain sidebar={<>
                <SidebarSection initiallyOpen={true} name={"Languages"}>
                    {supported_languages && supported_languages.map((l: any) => (
                        <SidebarItem href={l.id}>
                            {l.name}
                        </SidebarItem>
                    ))}

                    {(!supported_languages || !supported_languages.length) && <SidebarItem className={"pointer-events-none opacity-75"}>
                        No languages yet
                    </SidebarItem>}

                    <hr className={"my-3"} />

                    <NewLanguageDialog projectName={name} />
                </SidebarSection>
            </>}>
                <div className={"flex flex-col gap-4 p-12"}>
                    <h1 className={"text-3xl font-semibold"}>
                        {name}
                    </h1>
                    <p className={"text-gray-500"}>
                        blah blah
                    </p>
                </div>
            </SidebarWMain>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let match = await db.project.findFirst({
        where: {
            slug: ctx.query.projectId?.toString()
        }
    });

    if(!match) return { notFound: true } 

    for(const [key, value] of Object.entries(match)) {
        if(value instanceof Date) {
            (match as any)[key] = value.toISOString()
        }
    }

    return {
        props: {
            ...match
        }
    }
}
  
export default Project;