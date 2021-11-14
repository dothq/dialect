export const Input = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    return (
        <input
            {...props}
            className={"px-3 py-2 transition-all border-b-2 border-gray-300 focus:border-blue-500"}
        ></input>
    )
}