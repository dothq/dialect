import { IconButton, InputBase, Paper, TextField } from "@mui/material"
import { Project } from "@prisma/client"
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTrigger } from "@radix-ui/react-dialog"
import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"
import { useRouter } from "next/dist/client/router"
import Link from "next/link"
import React from "react"
import { Camera, Home, Paperclip, Plus, Search, Settings, Users } from "react-feather"
import title from "title"
import { PrimaryButton, SecondaryButton } from "../../../components/Button"
import { Header } from "../../../components/Header"
import { SidebarItem } from "../../../components/SidebarItem"
import { SidebarSection } from "../../../components/SidebarSection"
import { SidebarWMain } from "../../../components/SidebarWMain"
import { db } from "../../../db"
import { useAuth } from "../../../providers/Auth"
import { defaultLanguages } from "../../../util/languages"

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
                
                    <form className={"mt-4 flex flex-col gap-5 w-full"}>                    
                        <fieldset className={"flex flex-col gap-4 w-full"}>
                            <TextField 
                                fullWidth 
                                label="Name" 
                                variant="standard"
                                className={"flex"}
                                required
                                value={name}
                                onChange={(e) => setName(title(e.target.value))}
                            />
                        </fieldset>

                        <fieldset className={"flex flex-col gap-3 w-full"}>
                            <TextField 
                                fullWidth 
                                label="Locale code"
                                variant="standard"
                                className={"flex"}
                                required
                                error={codeError}
                                value={code}
                                inputProps={{
                                    pattern: "^([a-z]{2})(-[A-Z]{2})?"
                                }}
                                onChange={(e) => {
                                    const regex = /^([a-z]{2})(-[A-Z]{2})?/;
                                    const value = e.target.value.replace(/ /g, "") as any || "";

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

                        <fieldset className={"flex flex-col gap-3 w-full"}>
                            <TextField 
                                fullWidth 
                                label="Native Name"
                                variant="standard"
                                className={"flex"}
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
                                <SecondaryButton type={"reset"}>
                                    Cancel
                                </SecondaryButton>
                            </DialogClose>
                            
                            <PrimaryButton type={"submit"}>
                                Create
                            </PrimaryButton>
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

export const ProjectSidebar = ({ name, slug, path, supported_languages, author_id }: { name: string, slug: string, path: string, supported_languages: any, author_id: any }) => {
    const { user } = useAuth();
    
    return (
        <>
            <div>
                <Link href={`/projects/${slug}`}>
                    <SidebarItem className={path == `/projects/${slug}` && `bg-gray-100`}>
                        Home <Home className={"ml-auto w-4 h-4"} />
                    </SidebarItem>
                </Link>

                <Link href={`/projects/${slug}/contributors`}>
                    <SidebarItem className={path == `/projects/${slug}/contributors` && `bg-gray-100`}>
                        Contributors <Users className={"ml-auto w-4 h-4"} />
                    </SidebarItem>
                </Link>

                <Link href={`/projects/${slug}/memories`}>
                    <SidebarItem className={path == `/projects/${slug}/memories` && `bg-gray-100`}>
                        Memories <Camera className={"ml-auto w-4 h-4"} />
                    </SidebarItem>
                </Link>

                <Link href={`/projects/${slug}/notes`}>
                    <SidebarItem className={path == `/projects/${slug}/notes` && `bg-gray-100`}>
                        Notes <Paperclip className={"ml-auto w-4 h-4"} />
                    </SidebarItem>
                </Link>

                {(user && author_id == user.id) && <Link href={`/projects/${slug}/settings`}>
                    <SidebarItem className={path == `/projects/${slug}/settings` && `bg-gray-100`}>
                        Settings <Settings className={"ml-auto w-4 h-4"} />
                    </SidebarItem>
                </Link>}

                <hr className={"my-3"} />

                <NewLanguageDialog projectName={name} />

                <hr className={"my-3"} />
            </div>

            <SidebarSection initiallyOpen={true} name={"Languages"}>
                {supported_languages && supported_languages.map((l: any) => (
                    <SidebarItem href={l.id}>
                        {l.name}
                    </SidebarItem>
                ))}

                {(!supported_languages || !supported_languages.length) && <SidebarItem className={"pointer-events-none opacity-75"}>
                    No languages yet
                </SidebarItem>}
            </SidebarSection>
        </>
    )
};

export const ProjectTemplate = (project: any) => {
    const router = useRouter();
    
    const queryExcludedPath = router.asPath.split("?")[0];

    return (
        <>
            <NextSeo title={`${project.name} – Dialect`} />

            <Header />

            <SidebarWMain sidebar={<ProjectSidebar 
                name={project.name} 
                slug={project.slug} 
                path={queryExcludedPath}  
                supported_languages={[]}
                author_id={project.author_id}
            />}>
                <div className={"flex flex-col gap-4 p-12 sticky top-16 bg-white border-b border-gray-200 z-30"}>
                    <h1 className={"text-3xl font-semibold"}>
                        {project.name}
                    </h1>
                    {project.description && <p className={"text-gray-500"}>
                        {project.description}
                    </p>}

                    <div className={"flex gap-4 items-center"}>
                        {/* <img 
                            src={`/api/auth/avatar/${project.author_id}`}
                            className={"w-8 h-8 border border-gray-200 rounded-full"}
                        ></img>

                        <span className={"font-medium"}>{project.author.name}</span> */}
                    </div>
                </div>

                <div className={"p-12"}>
                    {project.children}
                </div>
            </SidebarWMain>
        </>
    )
}

const Project = (project: any) => {
    const router = useRouter();

    const [languages, setLanguages] = React.useState<any[]>(defaultLanguages);
    const [sort, setSort] = React.useState("name");

    const onChange = (e: any) => {
        if(!e.target.value.length) delete router.query.q;
        else router.query.q = e.target.value;
        
        router.push(router);
    }

    const update = () => {
        const searchEl = document.getElementById("search") as any;

        const q = router.query.q?.toString() || "";
        searchEl.value = q;

        if(!q || !q.length) return setLanguages(defaultLanguages);

        const filteredRows = defaultLanguages.filter((row) => {
            return (
                row.name.toLowerCase().includes(q.toLowerCase()) ||
                row.code.toLowerCase().includes(q.toLowerCase())
            );
        });

        setLanguages(filteredRows);
    }

    React.useEffect(() => update(), []);
    React.useEffect(() => update(), [router]);

    return (
        <ProjectTemplate 
            {...project}
        >
            <div className={"pb-12 flex gap-5 w-full"} style={{ height: "min-content" }}>
                <Paper 
                    sx={{ p: "2px 4px", display: "flex", alignItems: "center", flex: 1 }}
                    elevation={0}
                    variant={"outlined"}
                >
                    <IconButton>
                        <Search width={16} height={16} />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1, pb: 0 }}
                        id={"search"}
                        onChange={onChange}
                        autoComplete={"false"}
                        componentsProps={{
                            input: {
                                style: { padding: "6px 0" }
                            }
                        }}
                        placeholder={"Search Languages..."}
                    />
                </Paper>
            </div>

            {languages.length ? <div className={"grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-6 gap-7 flex-wrap overflow-hidden"}>
                {languages.map(l => {
                    const percent = `${Math.round(Math.random()*100)}%`;

                    return (
                        <Link href={`/projects/${project.slug}/${l.code}`}>
                            <a 
                                className={"flex flex-col rounded-lg group relative overflow-hidden items-center px-3 py-4 bg-gray-50 transition-all"}
                            >
                                <div style={{ width: percent }} className={"absolute top-0 left-0 h-full bg-green-100 bg-opacity-50"}></div>
                                <div className={"flex flex-col gap-3 items-center filter group-hover:blur-sm group-hover:opacity-50 transition-all"}>
                                    <span className={"text-4xl w-9 h-9 z-10"}>
                                        {l.flag || "🏴‍☠️"}
                                    </span>
                                    <span className={"text-sm text-center text-gray-800 font-medium z-10"}>{l.name}</span>
                                </div>
                                <div className={"flex flex-col absolute top-0 left-0 h-full w-full justify-center gap-3 items-center opacity-0 group-hover:opacity-100 transition-all z-20"}>
                                    <strong className={"text-green-800 font-semibold text-2xl"}>{percent}</strong>
                                </div>
                            </a>
                        </Link>
                    )
                })}
            </div> : <span className={"mx-12 my-8"}>
                No results for <strong>{router.query.q}</strong>.
            </span>}
        </ProjectTemplate>
    )
}

export const projectSSR: GetServerSideProps = async (ctx) => {
    let match: any = await db.project.findFirst({
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

    // const { origin } = absoluteUrl(ctx.req)
    // match.author = await (await axios.get(`${origin}/api/auth/profile/${match.author_id}`, { ...(ctx.req as any) })).data;

    return {
        props: {
            ...match
        }
    }
}

export const getServerSideProps = projectSSR;
  
export default Project;