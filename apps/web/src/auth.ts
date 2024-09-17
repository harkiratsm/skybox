import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@repo/drizzle"
import passkey from "next-auth/providers/passkey"
import google from "next-auth/providers/google"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    google,
    // passkey
  ],
  // experimental: {
  //   enableWebAuthn: true,
  // },
  callbacks:{
    async session({session, user}) {
      session.user.id = user.id
      return session
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
})