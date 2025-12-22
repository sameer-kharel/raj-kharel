import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';
import dbConnect from './mongodb';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Admin Password',
            credentials: {
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (credentials?.password === process.env.ADMIN_PASSWORD) {
                    await dbConnect();
                    let adminUser = await User.findOne({ role: 'admin' });

                    if (!adminUser) {
                        // Create a default admin user if none exists
                        adminUser = await User.create({
                            email: 'admin@rajkharel.com',
                            name: 'Raj Kharel Admin',
                            role: 'admin',
                            googleId: 'admin-manual-id'
                        });
                    }

                    return {
                        id: adminUser._id.toString(),
                        name: adminUser.name,
                        email: adminUser.email,
                        role: adminUser.role,
                    };
                }
                return null;
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google') {
                await dbConnect();

                // Check if user exists, if not create one
                const existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    await User.create({
                        googleId: account.providerAccountId,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        role: 'client', // Default role
                        lastLogin: new Date(),
                    });
                } else {
                    // Update last login
                    existingUser.lastLogin = new Date();
                    if (!existingUser.googleId) {
                        existingUser.googleId = account.providerAccountId;
                    }
                    await existingUser.save();
                }
            }
            return true;
        },
        async session({ session, token }) {
            if (session.user && token.email) {
                await dbConnect();
                const dbUser = await User.findOne({ email: token.email });

                if (dbUser) {
                    session.user.id = dbUser._id.toString();
                    session.user.role = dbUser.role;
                    session.user.createdAt = dbUser.createdAt;
                }
            }
            return session;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.email = user.email;
            }
            return token;
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};
