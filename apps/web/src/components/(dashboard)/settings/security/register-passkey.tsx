'use client'
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/webauthn";

export const RegisterPasskey = () => {

    const onRegister = () => {
        signIn('passkey', {action: 'register'}).catch(console.error);
    }

    return (
        <Button variant='outline' className="bg-background" onClick={onRegister}>
            Create Passkeys
        </Button>
    )
}