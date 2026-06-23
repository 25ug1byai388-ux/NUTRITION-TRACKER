// src/app/api/auth/[...nextauth]/route.ts - NextAuth API Route Handler

import { handlers } from "@/auth";

// Export handlers for GET and POST
export const { GET, POST } = handlers;

// Optional: Custom endpoint handlers for advanced use cases
// You can also add custom endpoints here if needed

export const dynamic = "force-dynamic";
