export const PrimaryButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button 
            {...props}
            className={props.className ? props.className : `rounded-xl w-max group px-4 py-2 bg-gray-900 hover:bg-gray-700 transition-all text-white font-semibold flex text-base relative items-center gap-2 focus:outline-none focus:ring-4 focus:ring-gray-500`}
        >
            {props.children}
        </button>
    )
}

export const SecondaryButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <PrimaryButton
            {...props}
            className={"rounded-xl w-max group px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-all text-gray-900 font-semibold flex text-base relative items-center gap-2 focus:outline-none focus:bg-white focus:ring-4 focus:ring-gray-300"}
        >
            {props.children}
        </PrimaryButton>
    )
}

export const DangerButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <PrimaryButton
            {...props}
            className={"rounded-xl w-max group px-4 py-2 bg-red-500 hover:bg-red-600 transition-all text-white font-semibold flex text-base relative items-center gap-2 focus:outline-none focus:ring-4 focus:ring-red-300"}
        >
            {props.children}
        </PrimaryButton>
    )
}

export const ColouredButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { colour: string, text?: string }) => {
    return (
        <PrimaryButton
            {...props}
            className={`rounded-xl w-max group px-4 py-2 bg-${props.colour}-500 hover:bg-${props.colour}-600 transition-all text-${props.text || "white"} font-semibold flex text-base relative items-center gap-2 focus:outline-none focus:ring-4 focus:ring-${props.colour}-300`}
        >
            {props.children}
        </PrimaryButton>
    )
}