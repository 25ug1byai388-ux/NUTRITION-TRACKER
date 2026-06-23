// src/auth.ts - NextAuth Configuration with Google OAuth

import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    provider?: string;
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  callbacks: {
    // JWT Callback - Called when JWT is created or updated
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.provider = account?.provider;
      }
      return token;
    },

    // Session Callback - Called when session is requested
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },

    // SignIn Callback - Control if user can sign in
    async signIn({ user, account }) {
      try {
        // You can add custom logic here:
        // - Check if user is in whitelist
        // - Create user in database
        // - Validate email domain
        if (!user.email) {
          return false;
        }

        // Example: Allow only specific domains
        // const allowedDomains = ['example.com'];
        // const userDomain = user.email.split('@')[1];
        // if (!allowedDomains.includes(userDomain)) return false;

        console.log(`User signed in: ${user.email} via ${account?.provider}`);
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },

    // Redirect Callback - Control where user is redirected
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // JWT configuration
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    secret: process.env.NEXTAUTH_SECRET,
  },

  // Events for logging
  events: {
    async signIn({ user, account }) {
      console.log(`Sign in event: ${user.email} via ${account?.provider}`);
    },
    async signOut() {
      console.log("Sign out event");
    },
    async createUser({ user }) {
      console.log(`New user created: ${user.email}`);
    },
  },

  // Error handling
  logger: {
    error: (code, metadata) => {
      console.error(`NextAuth error [${code}]:`, metadata);
    },
    warn: (code) => {
      console.warn(`NextAuth warning [${code}]`);
    },
    debug: (code, metadata) => {
      if (process.env.NODE_ENV === "development") {
        console.debug(`NextAuth [${code}]:`, metadata);
      }
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
