import { SettingHeader } from "@/components/(dashboard)/settings/header";
import type { Metadata } from "next";
import { CreatePasskey } from "@/components/(dashboard)/settings/security/create-passkey";


export const metadata: Metadata = {
    title: "Passkeys"
}

export default async function PasskeysPage(){

    return (
        <div className="space-y-4">
            <SettingHeader
                title="Passkeys"
                subtitle="Allow access to your account using a passkey."
            >
                <CreatePasskey /> 
            </SettingHeader>
            {/* <PasskeysDT />  */}
        </div>
    )
}