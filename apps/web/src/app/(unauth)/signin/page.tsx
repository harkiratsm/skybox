import { auth } from "@/auth";
import { SignInForm } from "@/components/forms/signin";
import { redirect } from "next/navigation";

export default async function SignInPage() {
    const session = await auth()

    if (session) {
        redirect("/")
    }

    return (
        <div className="w-screen px-4 max-w-lg">
            <div className="border-border z-10 rounded-xl border bg-neutral-100 p-6">
                <h1 className="text-2xl font-semibold">
                    Sign in to your account
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                    Welcome back! glad to see you again.
                </p>
                <hr className="my-4 -mx-6"/>
                <SignInForm />
            </div>
        </div>
    )
}