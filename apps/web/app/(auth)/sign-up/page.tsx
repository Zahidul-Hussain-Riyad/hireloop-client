'use client'
import { SignUpForm } from "@/components/sign-up-form";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { type authFormData } from "@/components/auth-form";

export default function SignUpPage() {
    const router = useRouter();

    const handleSignUp = async (data: authFormData) => {
        const { data: signUpResponse, error } = await authClient.signUp.email({
            name: data.name ?? "", // required — always present in the sign-up form (required field).
            email: data.email, // required, The email address of the user. 
            password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
            role: data.role, // Account type chosen in the form (seeker | recruiter | admin) — stored on the user via user.additionalFields.
            callbackURL: "/", // An optional URL to redirect to after the user signs up. 
        });

        if (error) {
            // Returned to the form so it can display the message.
            return { error };
        }

        console.log('signup response', signUpResponse, error);
        router.push("/sign-in"); // Better-auth created the user — finish by verifying/answering with sign in.
    };

    return <SignUpForm onSubmit={handleSignUp}/>
}
