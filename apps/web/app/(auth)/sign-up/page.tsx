'use client'
import { SignUpForm } from "@/components/sign-up-form";
import { authClient } from "@/lib/auth-client";
import { authFormData } from "@/components/auth-form";

export default function SignUpPage() {

    const handleSignUp = async (data: authFormData) => {
        const { data: signUpResponse, error } = await authClient.signUp.email({
            name: data.name, // required, The name of the user.
            email: data.email, // required, The email address of the user.
            password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
            callbackURL: "/", // An optional URL to redirect to after the user signs up.
        });

        console.log('signup response', signUpResponse, error);
    }

    return <SignUpForm onSubmit={handleSignUp}/>
}
