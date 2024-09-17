'use client'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { KeyRoundIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


const CreatePasskeySchemaZ = z.object({
    passkeyName: z.string().min(3)
})

type CreatePasskeySchema = z.infer<typeof CreatePasskeySchemaZ>

export const CreatePasskey = () => {
    const [open, setOpen] = useState(false)

    const form = useForm<CreatePasskeySchema>({
        resolver: zodResolver(CreatePasskeySchemaZ),
        defaultValues: {
            passkeyName: "",
        }
    })
    return (
        <Dialog open={open} onOpenChange={(value)=> !form.formState.isSubmitting && setOpen(value)}>
            <DialogTrigger asChild>
                <Button variant="secondary">
                    <KeyRoundIcon className="w-6 h-6 mr-2" />
                    Create PassKey
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader> 
                    <DialogTitle>Create Passkey</DialogTitle>
                    <DialogDescription className="mt-4">
                        Passkeys allow access to your account without a password.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form>
                        <fieldset className="flex h-full flex-col space-y-4">
                            <FormField
                                control={form.control}
                                name="passkeyName"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Passkey name</FormLabel>
                                        <FormControl>
                                            <Input className="bg-background" placeholder="e.g. Work Laptop" {...field} />
                                        </FormControl>
                                        <FormMessage /> 
                                    </FormItem>    
                                )}
                            />
                            <Alert>
                                <AlertDescription>
                                    This passkey will be used to access your account.
                                </AlertDescription>
                                <AlertDescription>
                                    You can revoke access at any time.
                                </AlertDescription>
                            </Alert>
                            <DialogFooter>
                                <Button type="button" variant='secondary' onClick={()=> setOpen(false)}>Cancel</Button>
                                <Button type='submit'>
                                    Continue
                                </Button>
                            </DialogFooter>
                        </fieldset>
                    </form>
                </Form>
                
            </DialogContent>
        </Dialog>
    )
}