"use client"

import * as React from "react"
import Link from "next/link"

import {
  useFormSubmit,
  type AuthFormProps,
  type authFormData,
} from "@/components/auth-form"

import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

function SignInForm({ onSubmit }: { onSubmit?: AuthFormProps<authFormData>["onSubmit"] }) {
  const [rememberMe, setRememberMe] = React.useState(true)
  const { submitting, error, submit } = useFormSubmit(onSubmit)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const data = Object.fromEntries(new FormData(event.currentTarget)) as {
      email: string
      password: string
    }
    return submit(event, { ...data, rememberMe })
  }

  return (
    <div className="border-border/60 bg-background/80 supports-backdrop-filter:bg-background/70 w-full max-w-sm rounded-2xl border p-6 shadow-xl backdrop-blur sm:max-w-md sm:p-8">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Welcome back
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Sign in to your HireLoop account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="h-11 rounded-lg bg-clip-padding"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
            className="h-11 rounded-lg"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
            className="size-4.5 rounded-md"
          />
          <label
            htmlFor="remember-me"
            className="text-muted-foreground text-sm leading-none"
          >
            Remember me
          </label>
        </div>

        {error && (
          <p role="alert" className="text-destructive text-sm">
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="mt-1 h-11 w-full rounded-lg text-sm font-medium"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </Button>
      </form>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        New to HireLoop?{" "}
        <Link
          href="/sign-up"
          className="text-foreground hover:text-primary font-medium underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  )
}

export { SignInForm }
