import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import React from "react";

export const DropdownMenuItem = (props: RadixMenu.DropdownMenuItemProps) => {
    return (
        <RadixMenu.Item className={`w-full h-10 font-medium text-base text-gray-800 outline-none flex items-center px-4 bg-black bg-opacity-0 hover:bg-opacity-5 active:bg-opacity-10 ${props.disabled ? `pointer-events-none opacity-50` : ``}`} {...props}>
            {props.children}
        </RadixMenu.Item>
    )
}

export const DropdownMenuSeparator = () => {
    return (
        <RadixMenu.Separator className={"bg-gray-200 my-2"} style={{ height: "1px" }} />
    )
}

export const DropdownMenu = ({ trigger, children }: { trigger: any, children: any }) => {
    return (
        <RadixMenu.Root>
            <RadixMenu.Trigger asChild={true}>
                {trigger}
            </RadixMenu.Trigger>

            <RadixMenu.Content align={"end"} sideOffset={7} style={{ minWidth: "14rem" }} className={"rounded-xl shadow-lg py-2 bg-white border menu-grow"}>
                {children}
            </RadixMenu.Content>
        </RadixMenu.Root>
    )
};