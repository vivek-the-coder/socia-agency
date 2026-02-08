import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ session, user, token }) {
            if (session.user) {
                // Add role to session
                // session.user.role = user.role; // user is undefined in jwt strategy?
                // need to fetch user from db or use token
            }
            return session;
        }
    },
    session: { strategy: "jwt" },
    providers: [], // Add providers with Prisma logic in auth.ts
} satisfies NextAuthConfig
