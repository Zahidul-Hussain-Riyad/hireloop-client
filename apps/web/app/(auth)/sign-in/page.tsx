'use client'
import { SignInForm } from "@/components/sign-in-form";
import { authClient } from "@/lib/auth-client";
import { authFormData } from "@/components/auth-form";

export default function SignInPage() {

    const handleSignIn = async (data: authFormData) => {
        const { data: SignInResponse, error } = await authClient.signIn.email({
            email: data.email, // required, The email address of the user.
            password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
            rememberMe: true, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
            callbackURL: "/", // An optional URL to redirect to after the user signs in. (optional)
        });

        console.log('sign in response', SignInResponse, error);
    }
    return <SignInForm />
}
