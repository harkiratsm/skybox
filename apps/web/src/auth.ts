import NextAuth from "next-auth"
import google from "next-auth/providers/google"
import passkey from "next-auth/providers/passkey"
import { drizzleAdapter } from "./adapter"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: drizzleAdapter,
  providers: [
    google,
    passkey
  ],
  experimental: {
    enableWebAuthn: true,
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
})