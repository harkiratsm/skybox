import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { KeyRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SettingHeader } from "@/components/(dashboard)/settings/header";

export default function SecurityPage() {
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
                <Button variant='outline' asChild className="bg-background">
                    <Link href="/settings/security/passkeys">Manage Passkeys</Link>
                </Button>
            </Alert>
        </>
    )
}