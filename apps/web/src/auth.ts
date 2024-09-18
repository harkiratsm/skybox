import NextAuth from "next-auth"
import type { GoogleProfile } from 'next-auth/providers/google';
import GoogleProvider from 'next-auth/providers/google';
import passkey from "next-auth/providers/passkey"
import { drizzleAdapter } from "./adapter"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: drizzleAdapter,
  secret: process.env.NEXT_PRIVATE_AUTH_SECRET ?? 'secret123',
  providers: [
    GoogleProvider<GoogleProfile>({
      clientId: process.env.NEXT_PRIVATE_AUTH_GOOGLE_ID,
      clientSecret: process.env.NEXT_PRIVATE_AUTH_GOOGLE_SECRET,
    }),
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