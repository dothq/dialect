import { TextField } from "@mui/material";
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { DangerButton, PrimaryButton, SecondaryButton } from "../../components/Button";
import { Header } from "../../components/Header";
import { SidebarWMain } from "../../components/SidebarWMain";
import { useAuth } from "../../providers/Auth";
import NotFound from "../404";

const DeleteAccountDialog = () => {
    const [satisfied, setSatisfied] = React.useState(false);

    const deleteAccount = () => {
        axios.get("/api/auth/gtfo").then(() => {
            window.location.href = "/";
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DangerButton>Delete Account</DangerButton>
            </DialogTrigger>
            <div>
                <DialogOverlay className={"bg-black bg-opacity-50 flex w-full h-screen fixed top-0 left-0 animate-overlay-dialog-open"} />
                <DialogContent className={"p-8 bg-white rounded-xl flex flex-col gap-2 fixed top-1/2 left-1/2 animate-overlay-dialog-open"} style={{ transform: "translate(-50%, -50%)" }}>
                    <h1 className={"text-xl font-semibold"}>Delete Account</h1>
                    <p className={"text-gray-600"}>
                        Type <strong>I understand what I am doing</strong> below to permanently delete your account.<br /><br />
                        <strong>All your data (including projects and contributions)</strong> will be <br />unrecoverable after this process.
                    </p>
                
                    <form className={"mt-4 flex flex-col gap-5 w-full"} onSubmit={(e) => {
                        e.preventDefault();

                        if(satisfied) {
                            deleteAccount();
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

const AccountSettings = () => {
    const router = useRouter();
    const { user } = useAuth();

    const queued: any = {};

    const update = () => {
        axios.put(`/api/auth/profile`, queued).then(() => {
            router.reload();
        })
    }

    const requestData = () => {
        axios.get("/api/auth/profile")
            .then(res => {        
                const contents = JSON.stringify(res.data, null, 4);
                const blob = new Blob([contents], { type: "application/json" });
                const event = document.createEvent("MouseEvents");
                const a = document.createElement("a");

                const date = new Date();

                a.download = `data-takeout-${res.data.id}-${date.toISOString()}.json`.replace(/ /g, "-").replace(/\:/g, "-").replace(/\./g, "-")
                a.href = window.URL.createObjectURL(blob);
                a.dataset.downloadurl = ["application/json", a.download, a.href].join(':');

                event.initMouseEvent(
                    "click",
                    true, 
                    false, 
                    window,
                    0, 
                    0, 
                    0, 
                    0, 
                    0, 
                    false, 
                    false, 
                    false, 
                    false, 
                    0, 
                    null
                );

                a.dispatchEvent(event);
            })
    }

    return user ? (
        <>
            <NextSeo title={"Account Settings – Dialect"} />

            <Header />

            <SidebarWMain hideSidebar={true}>
                <div className={"flex flex-col gap-4 py-12 sticky top-16 bg-white border-b border-gray-200 z-30"}>
                    <h1 className={"text-3xl font-semibold"}>
                        Account Settings
                    </h1>
                </div>

                <div className={"py-12"}>
                    <div className={"max-w-7xl flex flex-col gap-16 divide-y divide-gray-200"}>
                        <div className={"flex gap-16"}>
                            <div className={"flex flex-col gap-8 max-w-md flex-1"}>
                                <h3 className={"text-2xl font-semibold text-gray-800"}>General</h3>
                
                                <TextField 
                                    label={"ID"} 
                                    variant={"standard"} 
                                    disabled
                                    sx={{
                                        opacity: 1
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    defaultValue={user.id}
                                />

                                <TextField 
                                    label={"Name"} 
                                    variant={"standard"} 
                                    defaultValue={user.name}
                                    onChange={(e) => queued.name = e.target.value}
                                />
                            
                                <PrimaryButton onClick={update}>Save</PrimaryButton>
                            </div>

                            <div className={"flex flex-col gap-8 pl-12"}>
                                <h3 className={"text-2xl font-semibold text-gray-800"}>Avatar</h3>
                
                                <img 
                                    className={"flex w-64 h-64 rounded-xl border-2 border-gray-200"} 
                                    src={"/api/auth/avatar"}
                                ></img>
                            </div>
                        </div>

                        <div className={"flex flex-col gap-8 pt-16"}>
                            <h3 className={"text-2xl font-semibold text-gray-800"}>Privacy and Security</h3>

                            <PrimaryButton onClick={() => requestData()}>Request my data</PrimaryButton>
                        </div>

                        <div className={"flex flex-col gap-8 pt-16"}>
                            <h3 className={"text-2xl font-semibold text-red-500"}>Danger Zone</h3>
            
                            <DeleteAccountDialog />
                        </div>
                    </div>
                </div>
            </SidebarWMain>
        </>
    ) : <NotFound />
}

export default AccountSettings;