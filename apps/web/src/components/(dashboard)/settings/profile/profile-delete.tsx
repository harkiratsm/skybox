'use client'

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { UserSchema } from "@repo/drizzle/schema/type";
import { trpc } from "@repo/trpc/react";
import { useRouter } from "next/navigation";

export type DeleteAccountProps = {
    className?: string;
    user: UserSchema
}

export const DeleteAccount = ({ className, user }: DeleteAccountProps) => {

    const router = useRouter();
    const { toast } = useToast();

    const { mutateAsync: deleteAccount } = trpc.userRouter.deleteAccount.useMutation();

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount({
                userId: user.id
            });
            toast({
                description: "Account deleted",
                duration: 4000
            })

            router.push("/signin");

        } catch (error) {
            toast({
                description: "Error deleting account",
                duration: 4000,
                variant: 'destructive'
            })
        }
    }


    return (
        <div className={className}>
            <div className="flex-shrink-0">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">
                            Delete Account
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Account</DialogTitle>
                            <Alert variant="destructive" className="mt-4">
                                This action is irreversible. All your data will be lost.
                            </Alert>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
                        </DialogFooter>
                    </DialogContent>

                </Dialog>
            </div>
        </div>
    )
}