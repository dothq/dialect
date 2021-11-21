export const SidebarItem = (props: any & { children: any }) => {
    return (
        <div {...props} className={`w-full h-10 px-4 my-1 rounded-tl-lg rounded-bl-lg select-none font-medium flex items-center hover:bg-gray-100 ${props.className ? props.className : ""}`}>
            {props.children}
        </div>
    )
}