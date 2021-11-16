import {
    IconButton,
    InputBase,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { Project } from "@prisma/client";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { Search, Star } from "react-feather";
import ago from "s-ago";
import { useSWRConfig } from "swr";
import { Header } from "../components/Header";
import { SidebarWMain } from "../components/SidebarWMain";
import { db } from "../db";
import { useIsAuthenticated } from "../providers/Auth";

export const A = (props: any) => React.createElement("a", props, ...props.children);

const Explore = ({ projects }: { projects: Project[] }) => {
    const { cache, mutate, ...extraConfig } = useSWRConfig()
    const authed = useIsAuthenticated();

    const router = useRouter();

    const [rows, setRows] = React.useState<Project[]>(projects);

    const onChange = (e: any) => {
        if(!e.target.value.length) return setRows(projects);

        const filteredRows = projects.filter((row) => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase());
        });

        setRows(filteredRows);
    }

    return (
        <>
            <NextSeo title={"Explore – Dialect"} />

            <Header />

            <SidebarWMain hideSidebar={true}>
                <div className={"flex flex-col gap-6 py-12"}>
                    <h1 className={"text-3xl font-semibold"}>
                        Explore
                    </h1>
                    <Paper 
                        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
                        elevation={0}
                        variant={"outlined"}
                    >
                        <IconButton>
                            <Search width={16} height={16} />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1, pb: 0 }}
                            onChange={onChange}
                            componentsProps={{
                                input: {
                                    style: { padding: "6px 0" }
                                }
                            }}
                            placeholder={"Search Projects..."}
                        />
                    </Paper>

                    <TableContainer component={Paper} variant={"outlined"} elevation={0} className={"mt-4 w-full"}>
                        <Table sx={{ "*": { fontSize: "15px" } }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Project</TableCell>
                                    <TableCell>Deadline</TableCell>
                                    <TableCell>Priority</TableCell>
                                    <TableCell>Last Activity</TableCell>
                                    <TableCell>Progress</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((project) => (
                                    <TableRow
                                        key={project.id}
                                        component={A}
                                        href={`/projects/${project.slug}`}
                                        className={"group"}
                                        sx={{ 
                                            "&:last-child td, &:last-child th": { border: 0 }
                                        }}
                                    >
                                        <TableCell component="th" scope="row" className={"group-hover:text-blue-500 font-medium transition-all"}>
                                            {project.name}
                                        </TableCell>
                                        <TableCell scope="row">
                                            {project.deadline || "–"}
                                        </TableCell>
                                        <TableCell scope="row" sx={{ display: "flex" }}>
                                            {[...new Array(5)].map((_, i) => (
                                                <Star 
                                                    key={"star" + i}
                                                    className={`fill-current ${i <= (project.priority || 0) 
                                                        ? `text-blue-500` 
                                                        : `text-gray-300`
                                                }`} />
                                            ))}
                                        </TableCell>
                                        <TableCell scope="row" title={new Date(project.date_updated || project.date_created).toString()}>
                                            {ago(new Date(project.date_updated || project.date_created))}
                                        </TableCell>
                                        <TableCell scope="row">
                                            <div className={"flex gap-2"}>
                                                <progress 
                                                    className={"w-full rounded-full appearance-none overflow-hidden text-blue-500 progress-fill-current"} 
                                                    value={45} 
                                                    max={100}
                                                />
                                                <span className={"font-medium"}>
                                                    45%
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </SidebarWMain>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let all = await db.project.findMany();

    all.forEach((project, index) => {
        for(const [key, value] of Object.entries(project)) {
            if(value instanceof Date) {
                (all as any)[index][key] = value.toISOString()
            }
        }
    })

    return {
        props: {
            projects: all
        }
    }
}

export default Explore;