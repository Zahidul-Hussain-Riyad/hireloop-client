import type { auth } from "@/lib/auth";
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

// inferAdditionalFields infers `user.additionalFields` (e.g. `role`)
// from the server config via a type-only import — erased at runtime.
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [inferAdditionalFields<typeof auth>()],
})


export const { signIn, signUp, signOut, useSession } = createAuthClient()