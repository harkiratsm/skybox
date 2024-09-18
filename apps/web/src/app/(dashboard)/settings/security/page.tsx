import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { KeyRoundIcon } from "lucide-react";
import { SettingHeader } from "@/components/(dashboard)/settings/header";
import { drizzleAdapter } from "@/adapter";
import { auth } from "@/auth";
import { PasskeyDataTable } from "@/components/(dashboard)/settings/security/passkey-data-table";
import { RegisterPasskey } from "@/components/(dashboard)/settings/security/register-passkey";

export default async function SecurityPage() {
    const session = await auth();
    const authenticators = await drizzleAdapter.listAuthenticatorsByUserId(session?.user?.id ?? "");
    return (
        <>
            <SettingHeader title="Security" subtitle="Here you can manage security." />
            <Alert className="flex flex-col mt-4 sm:flex-row sm:items-center justify-between p-6" >
                <KeyRoundIcon className="w-6 h-6 mr-2"/> 
                <div>
                    <AlertTitle>Passkeys</AlertTitle>
                    <AlertDescription>
                        Allow access to your account using a passkey.
                    </AlertDescription>
                </div>
                <RegisterPasskey />
            </Alert>
            <PasskeyDataTable authenticator={authenticators} />
        </>
    )
}