import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    // adapter: PrismaAdapter(prisma), // Temporarily disabled for Mock Login debugging
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Mock user for initial testing without DB seeding
                if (credentials?.email === "admin@agency.com" && credentials?.password === "password") {
                    return {
                        id: "1",
                        name: "Admin User",
                        email: "admin@agency.com",
                        role: "ADMIN"
                    }
                }

                // Add logic to verify credentials here
                // For now, return a mock user or check against DB
                // This is a placeholder implementation
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: String(credentials.email) }
                });

                if (!user) {
                    return null;
                }

                // Ideally verification logic here (bcrypt compare)
                // if (user.password !== hash(credentials.password)) return null;

                return user;
            },
        }),
    ],
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
    session: { strategy: "jwt" }, // Use JWT for credentials provider compatibility
})
