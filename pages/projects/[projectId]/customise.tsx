import { IconButton, InputBase, Paper } from "@mui/material"
import React from "react"
import { Search } from "react-feather"
import Flickity from "react-flickity-component"
import { projectSSR, ProjectTemplate } from "."
import { PrimaryButton, SecondaryButton } from "../../../components/Button"
import { useAuth } from "../../../providers/Auth"
import { defaultLanguages } from "../../../util/languages"
import NotAuthorised from "../../403"

const ProjectCustomise = (project: any) => {
    const { user } = useAuth();

    const [q, setQ] = React.useState<any>(null);

    const [languages, setLanguages] = React.useState<any[]>(project.languages || []);

    const [selectedKeys, setSelectedKeys] = React.useState<any[]>([]);

    const [fltyRef, setFltyRef] = React.useState<Flickity | null>(null);

    const onChange = (e: any) => {
        if(!e.target.value.length) setQ(null);
        else setQ(e.target.value);
    }

    const update = () => {
        if(!q || !q.length) return setLanguages(defaultLanguages);

        const filteredRows = defaultLanguages.filter((row: any) => {
            return (
                row.name.toLowerCase().includes(q.toLowerCase()) ||
                row.code.toLowerCase().includes(q.toLowerCase())
            );
        });

        setLanguages(filteredRows);
    }

    const toggleSelection = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, 
        key: any
    ) => {
        if(e.shiftKey) {
            const latest = selectedKeys[selectedKeys.length-1] || defaultLanguages[0].code;
            const first = defaultLanguages.findIndex(i => i.code == latest);
            const pos = defaultLanguages.findIndex(i => i.code == key) + 1;
            const bounds = defaultLanguages.slice(first, pos);

            setSelectedKeys(bounds.map(i => i.code));
        } else {
            if(selectedKeys.includes(key)) {
                setSelectedKeys(selectedKeys.filter(i => i !== key))
            } else {
                setSelectedKeys(selectedKeys.concat([key]))
            }
        }
    }

    React.useEffect(() => {
        const mapped = defaultLanguages.map(l => l.code);

        document.body.style.userSelect = "none";

        const handler = (e: any) => {
            if(e.ctrlKey && e.key == "a") {
                e.preventDefault();
                e.stopPropagation();
                
                setSelectedKeys(mapped)
            }
        };

        document.addEventListener("keyup", handler);
    }, []);

    React.useEffect(() => update(), []);
    React.useEffect(() => update(), [q]);

    return user ? (
        <ProjectTemplate 
            {...project}
        >
            <div className={"flex justify-center gap-5 bg-white w-full left-0 z-50 bottom-0 fixed"} style={{ height: "min-content" }}>
                <div className={"max-w-7xl w-full flex lg:pl-64 border-t border-gray-200"}>
                    <div className={"p-12 flex w-full justify-between items-center"}>
                        <h1 className={"text-lg font-medium text-gray-800"}>{selectedKeys.length} language{selectedKeys.length !== 1 ? "s" : ""} selected</h1>
                    
                        <div className={"flex gap-3"}>
                            <SecondaryButton
                                onClick={() => setSelectedKeys([])}
                            >
                                Deselect All
                            </SecondaryButton>
                            <PrimaryButton 
                                onClick={() => fltyRef?.next()}
                                style={{ 
                                    opacity: selectedKeys.length >= 1 ? 1 : 0.5,
                                    pointerEvents: selectedKeys.length >= 1 ? "all" : "none" 
                                }}
                            >
                                Add {selectedKeys.length} languages
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>

            <Flickity
                className={"overflow-hidden"}
                static={true}
                flickityRef={c => setFltyRef(c)}
                options={{
                    pageDots: false,
                    prevNextButtons: false,
                    freeScroll: false,
                    accessibility: false,
                    draggable: false,
                    cellAlign: "left"
                }}
            >
                <div>
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
                            inputProps={{
                                autoComplete: "off",
                                autoCapitalize: "false",
                                autoCorrect: "false"
                            }}
                            placeholder={"Search Languages..."}
                        />
                    </Paper>

                    {languages.length ? <div className={"grid mt-12 grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-6 gap-7 flex-wrap overflow-hidden pb-32"}>
                        {languages.map(l => {
                            return (
                                <a 
                                    className={`flex flex-col select-none rounded-lg group relative overflow-hidden items-center px-3 py-4 bg-gray-50 transition-all ${selectedKeys.includes(l.code) ? `bg-blue-100 text-blue-600 border-2 border-solid border-blue-500` : `border-2 border-gray-300 border-dotted hover:border-blue-500`}`}
                                    onMouseUp={(e) => toggleSelection(e, l.code)}
                                >
                                    <div className={"flex flex-col gap-3 items-center transition-all"}>
                                        <span className={"text-4xl w-9 h-9 z-10"}>
                                            {l.flag || "🏴‍☠️"}
                                        </span>
                                        <span className={"text-sm text-center font-medium z-10"}>{l.name}</span>
                                    </div>
                                </a>
                            )
                        })}
                    </div> : <span className={"my-8 font-medium"}>
                        No results for <strong>{q}</strong>.
                    </span>}
                </div>

                <div>
                    <div className={"grid w-full grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-6 gap-7 flex-wrap overflow-hidden pb-32"}>
                        WIP
                    </div>
                </div>
            </Flickity>
        </ProjectTemplate>
    ) : <NotAuthorised />
}

export const getServerSideProps = projectSSR;
  
export default ProjectCustomise;