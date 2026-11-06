"use client"

import * as React from "react"
import Link from "next/link"
import { Briefcase, ShieldCheck, User } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

import {
  useFormSubmit,
  type AuthFormProps,
  type authFormData,
} from "@/components/auth-form"

import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

const ROLES = [
  { value: "seeker", label: "Job Seeker", icon: User },
  { value: "recruiter", label: "Recruiter", icon: Briefcase },
  { value: "admin", label: "Admin", icon: ShieldCheck },
] as const

type Role = (typeof ROLES)[number]["value"]

function SignUpForm({ onSubmit }: { onSubmit?: AuthFormProps<authFormData>["onSubmit"] }) {
  const [role, setRole] = React.useState<Role>("seeker")
  const [agreeToTerms, setAgreeToTerms] = React.useState(false)
  const { submitting, error, submit } = useFormSubmit(onSubmit)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!agreeToTerms) {
      event.preventDefault()
      return
    }

    const data = Object.fromEntries(new FormData(event.currentTarget)) as {
      name: string
      email: string
      password: string
    }

    return submit(event, { ...data, role })
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
        <fieldset className="flex flex-col gap-2">
          {/* <legend className="text-foreground text-sm leading-none font-medium">
            I am a
          </legend> */}
          <div
            role="radiogroup"
            aria-label="Account type"
            className="grid grid-cols-3 gap-2"
          >
            {ROLES.map((option) => {
              const Icon = option.icon
              const selected = role === option.value
              return (
                <label
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-center text-xs leading-none transition-colors outline-none focus-within:ring-3 focus-within:ring-ring/50",
                    selected
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                  )}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={selected}
                    onChange={() => setRole(option.value)}
                    className="sr-only"
                  />
                  <Icon className={cn("size-4", selected && "text-primary")} />
                  {option.label}
                </label>
              )
            })}
          </div>
        </fieldset>

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
            placeholder="••••••••"
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
            aria-invalid={!agreeToTerms}
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
          {submitting ? "Creating account…" : "Create account"}
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
