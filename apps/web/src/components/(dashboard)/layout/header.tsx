'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import signout from "@/lib/signout";
import { LogOut, Plus, ServerCrash, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';

export const Header = ({ user }: any) => {
    const router = useRouter();
    const pathName = usePathname();

    const handleSignOut = async (e:Event) => {
        e.preventDefault();
        await signout();
        router.push('/signin');
    }
    

    return (
        <header className="sticky top-0 z-40 w-full bg-background">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <ServerCrash className="h-6 w-6 text-primary" />
                        <span className="font-bold text-primary text-lg sm:text-xl">
                            Skybox 
                            {
                                pathName.includes('/notes') ?
                                    <span className="text-xs "> Notes</span>
                                    : pathName === '/drive' ?
                                        <span className="text-xs">Drive</span>
                                        : null   

                            }
                        </span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        {/* <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4" />
                        </Button> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer w-8 h-8">
                                    <AvatarImage src={user?.image} alt="profile pic" />
                                    <AvatarFallback>{user?.name[0]}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <Link href="/settings">
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem onSelect={(e) => handleSignOut(e)}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}