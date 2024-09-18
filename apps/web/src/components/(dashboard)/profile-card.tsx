import { UserSchema } from "@repo/drizzle/schema/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardHeader } from "../ui/card";

export type UserProps = {
    user: UserSchema;
}
export const ProfileCard = ({ user }: UserProps) => {
    return (
        <Card className="lg:col-span-1 bg-primary/10 transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg">
            <CardHeader className="flex flex-col items-center p-4 sm:p-6">
                <Avatar className="w-20 h-20 sm:w-32 sm:h-32 border-4 border-primary/100 mb-4">
                    <AvatarImage src={user?.image ?? ''} alt="Profile picture" />
                    <AvatarFallback className="text-2xl sm:text-4xl bg-primary text-primary-foreground">
                        {user?.name ? user.name[0].toUpperCase() : '?'}
                    </AvatarFallback>
                </Avatar>
                <div className="text-center space-y-1 w-full">
                    <h2 className="text-xl sm:text-3xl font-bold truncate">
                        {user?.name}
                    </h2>
                    <p className="text-sm sm:text-lg break-all">
                        {user?.email}
                    </p>
                </div>
            </CardHeader>
        </Card>
    );
}
