/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdapterAccount, AdapterAuthenticator } from "@auth/core/adapters";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { and, db, eq } from "@repo/drizzle";
import { accounts, Authenticator } from "@repo/drizzle/schema/user";


export const drizzleAdapter = {
    ...DrizzleAdapter(db),
    getAccount: async (providerAccountId: string, provider: string) => {
        const [account] = await db
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.provider, provider),
              eq(accounts.providerAccountId, providerAccountId),
            ),
          )
        return account ? (account as AdapterAccount) : null;
      },
      createAuthenticator: async (data: any) => {
        const id = crypto.randomUUID()
        await db.insert(Authenticator).values({
          id,
          ...data,
        })
        const [authenticator] = await db
          .select()
          .from(Authenticator)
          .where(eq(Authenticator.id, id))
        const { transports, ...rest } = authenticator
        return { ...rest, transports: transports ?? undefined }
      },
      getAuthenticator: async (credentialId: string) => {
        const [authenticator] = await db
          .select()
          .from(Authenticator)
          .where(eq(Authenticator.credentialID, credentialId))
        return (authenticator as AdapterAuthenticator) ?? null
      },
      listAuthenticatorsByUserId: async (userId:string) => {
        const auths = await db
          .select()
          .from(Authenticator)
          .where(eq(Authenticator.userId, userId))
        return auths
      },
      updateAuthenticatorCounter: async (credentialId: string, counter: number) => {
        await db
          .update(Authenticator)
          .set({ counter })
          .where(eq(Authenticator.credentialID, credentialId))
        const [authenticator] = await db
          .select()
          .from(Authenticator)
          .where(eq(Authenticator.credentialID, credentialId))
        return (authenticator as AdapterAuthenticator) ?? null
      },
}