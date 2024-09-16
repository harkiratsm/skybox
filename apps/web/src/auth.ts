import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@repo/drizzle"
import Google, { GoogleProfile } from "next-auth/providers/google"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google<GoogleProfile>({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  events: {
    async signIn(message) {
      console.log("signIn", message)
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
})