import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';
import dbConnect from './mongodb';

// Health check for environment variables in production
if (process.env.NODE_ENV === 'production') {
    const requiredVars = [
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET',
        'NEXTAUTH_SECRET',
        'MONGODB_URI'
    ];
    requiredVars.forEach(v => {
        if (!process.env[v]) {
            console.error(`ENVIRONMENT VARIABLE MISSING: ${v} is not defined in production!`);
        }
    });
}

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
            try {
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
            } catch (error) {
                console.error('Error in signIn callback:', error);
                return false;
            }
        },
        async session({ session, token }) {
            try {
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
            } catch (error) {
                console.error('Error in session callback:', error);
                return session;
            }
        },
        async jwt({ token, user, account }) {
            try {
                if (user) {
                    token.email = user.email;
                }
                return token;
            } catch (error) {
                console.error('Error in jwt callback:', error);
                return token;
            }
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
    useSecureCookies: process.env.NODE_ENV === 'production',
    cookies: process.env.NODE_ENV === 'production' ? {
        sessionToken: {
            name: `__Secure-next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true,
            },
        },
        callbackUrl: {
            name: `__Secure-next-auth.callback-url`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true,
            },
        },
        csrfToken: {
            name: `__Host-next-auth.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true,
            },
        },
        pkceCodeVerifier: {
            name: `__Secure-next-auth.pkce.code_verifier`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true,
            },
        },
        state: {
            name: `__Secure-next-auth.state`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true,
            },
        },
    } : undefined,
};
