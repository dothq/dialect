import { useRouter } from "next/dist/client/router";
import { PrimaryButton } from "../Button";

export const Error = ({ code, message }: { code: number, message: string }) => {
    const router = useRouter();

    return (
        <div className={"flex flex-col gap-6 py-12 my-6 justify-center items-center"}>
            <h1 className={"w-10 h-10 text-4xl"}>
                😭
            </h1>
            <h1 className={"text-5xl font-semibold"}>
                {code}
            </h1>
            <p className={"text-gray-500 max-w-md text-center text-lg"}>
                {message}
            </p>
            <PrimaryButton onClick={() => {
                router.back();
            }}>
                Go Back
            </PrimaryButton>
        </div>
    )
}