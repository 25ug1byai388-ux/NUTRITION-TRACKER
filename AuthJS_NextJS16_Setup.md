# Complete Auth.js (NextAuth v5) Setup for Next.js 16

## Install

```bash
npm install next-auth
```

## .env.local

```env
AUTH_SECRET=your_random_secret_here
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
```

## src/auth.ts

```ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});
```

## src/app/api/auth/[...nextauth]/route.ts

```ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

## src/types/next-auth.d.ts

```ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
```

## middleware.ts

```ts
export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

## src/components/AuthFlow.tsx

```tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthFlow() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    return (
      <button onClick={() => signIn("google")}>
        Sign In With Google
      </button>
    );
  }

  return (
    <div>
      <img
        src={session.user?.image ?? ""}
        alt="profile"
        width={60}
        height={60}
      />
      <h3>{session.user?.name}</h3>
      <p>{session.user?.email}</p>

      <button onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
}
```

## src/components/SessionProvider.tsx

```tsx
"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
```

## src/app/layout.tsx

```tsx
import type { Metadata } from "next";
import AuthSessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Nutrition Tracker",
  description: "Nutrition Tracking App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
```

## src/app/page.tsx

```tsx
import AuthFlow from "@/components/AuthFlow";

export default function HomePage() {
  return (
    <main className="p-10">
      <AuthFlow />
    </main>
  );
}
```

## src/app/dashboard/page.tsx

```tsx
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="p-10">
      <h1>Dashboard</h1>
      <p>Welcome {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
    </div>
  );
}
```
