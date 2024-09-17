'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { trpc } from "@repo/trpc/react";
import { useToast } from "@/hooks/use-toast";

export type ProfileFormProps = {
    user: any;
    className?: string;
};

export const ProfileSchemaO = z.object({
    name: z.string().trim().min(1, { message: "Name is required" }),
});

export type ProfileSchema = z.infer<typeof ProfileSchemaO>;


export const ProfileForm = ({ className, user  }: ProfileFormProps) => {
    const {toast} = useToast();
    const {mutateAsync: updateProfile, isLoading: isUpdating } = trpc.userRouter.updateProfile.useMutation({
        onSuccess:() => {
            toast({
                description: "Profile updated",
                duration: 3000
            })
        }
    });

    const form =useForm<ProfileSchema>({
        values: {
            name: user.name,
        },
        resolver: zodResolver(ProfileSchemaO),
    })

    const handleSubmit = async (values: ProfileSchema) => { 
        try {
            await updateProfile({
                name: values.name,
            });
        } catch (error) {
            toast({
                description: "Error updating profile",
                duration: 4000,
                variant: 'destructive'
            })
        }
    }



    return (
        <Form {...form}>
            <form className={cn("flex flex-col gap-y-4 w-full", className)}  onSubmit={form.handleSubmit(handleSubmit)}>
                <fieldset className="flex flex-col gap-y-2 w-full">
                    <FormField
                        control={form.control} 
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field}  /> 
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                        <Input type="email" id="email" value={user.email} className="bg-muted mt-2" disabled />
                    </div>
                </fieldset>
                <Button type="submit" className="self-end">{isUpdating ? "Updating..." : "Update Profile"}</Button>
            </form>
        </Form>

    )
}
