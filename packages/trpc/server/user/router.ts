import { users } from "@repo/drizzle/schema/user";
import { procedure, router } from "../trpc";
import { ZDeleteAccountSchema, ZUpdateProfileSchema } from "./schema";
import { db, eq } from "@repo/drizzle";

export const userRouter = router({
    deleteAccount: procedure.input(ZDeleteAccountSchema).mutation(async ({input, ctx})=>{
        try {
            return await db.delete(users).where(
                eq(users.id, ctx.session?.user?.id ?? "")
            )
        } catch (error) {
            console.error(error);
        }
    }),
    updateProfile: procedure.input(ZUpdateProfileSchema).mutation(async ({input, ctx})=>{
        try {
            return await db.update(users).set({
                name: input.name,
            }).where(
                eq(users.id, ctx.session?.user?.id ?? "")
            )
        } catch (error) {
            console.error(error);
        }
    }),
})