"use client"

import * as React from "react"
import Link from "next/link"

import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

function SignUpForm() {
  const [agreeToTerms, setAgreeToTerms] = React.useState(false)

  // Placeholder handler — swap for better-auth signUp integration later.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.currentTarget))
    // eslint-disable-next-line no-console
    console.log("sign-up form data:", { ...data, agreeToTerms })
  }

  return (
    <div className="border-border/60 bg-background/80 supports-backdrop-filter:bg-background/70 w-full max-w-sm rounded-2xl border p-6 shadow-xl backdrop-blur sm:max-w-md sm:p-8">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Create your account
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Start your journey with HireLoop
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Alex Sterling"
            autoComplete="name"
            required
            className="h-11 rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="h-11 rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Your Password"
            autoComplete="new-password"
            minLength={8}
            required
            className="h-11 rounded-lg"
          />
          <p className="text-muted-foreground text-xs">
            Must be at least 8 characters
          </p>
        </div>

        <div className="flex items-start gap-2.5">
          <Checkbox
            id="agree-terms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
            className="size-4.5 rounded-md"
          />
          <label
            htmlFor="agree-terms"
            className="text-muted-foreground text-sm leading-snug"
          >
            I agree to the{" "}
            <Link
              href="#"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-1 h-11 w-full rounded-lg text-sm font-medium"
        >
          Create account
        </Button>
      </form>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-foreground hover:text-primary font-medium underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

export { SignUpForm }
