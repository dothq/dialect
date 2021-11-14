import React from "react";
import { ChevronDown } from "react-feather";

export const SidebarSection = ({ initiallyOpen, name, children }: { initiallyOpen: boolean, name: string, children: any }) => {
    const [open, setOpen] = React.useState(initiallyOpen);
    const [height, setHeight] = React.useState(1000);

    const ref = React.createRef<HTMLDivElement>();

    React.useEffect(() => {
        setHeight(ref.current?.scrollHeight || 0);
    }, []);

    return (
        <div id={`section-${name.toLowerCase()}`}>
            <a onClick={() => setOpen(!open)} className={"w-full px-4 mb-3 cursor-pointer font-semibold text-sm transition-all hover:text-gray-800 text-gray-500 uppercase flex justify-between items-center"}>
                <span>{name}</span>
                <ChevronDown 
                    width={18} 
                    height={18} 
                    className={`transform transition-transform ${open ? `rotate-0` : `rotate-180`}`} 
                />
            </a>

            <div 
                ref={ref} 
                className={`flex flex-col transition-all overflow-hidden duration-200`}
                style={{
                    maxHeight: open ? `${height}px` : `0px`,
                    opacity: open ? 1 : 0
                }}
            >
                <div className={"h-full w-full"}>
                    {children}
                </div>
            </div>
        </div>
    )
}