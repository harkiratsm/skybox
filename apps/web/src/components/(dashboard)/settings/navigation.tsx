'use client';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lock, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react"


export type SettingsNavProps = HTMLAttributes<HTMLDivElement>;

export const SettingsNav = ({className, ...props}:SettingsNavProps) => {
    const pathName = usePathname();

    return (
        <div className={cn('flex flex-col gap-y-2', className)} {...props}>
            <Link href="/settings/profile">
                <Button variant="ghost" className={cn('w-full justify-start', pathName === '/settings/profile' && 'bg-primary/100 text-white')}>
                    <User className="h-5 w-5 mr-2" />
                    Profile
                </Button>
            </Link>
            <Link href="/settings/security">
                <Button variant="ghost" className={cn('w-full justify-start', pathName === '/settings/security' && 'bg-primary/100 text-white')}>
                    <Lock className="h-5 w-5 mr-2" />
                    Security
                </Button>
            </Link>
        </div>
    )

}