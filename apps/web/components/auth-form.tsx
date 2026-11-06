import * as React from "react"

/**
 * Data collected by the auth forms (sign-in / sign-up).
 * Optional fields depend on which form raises the event.
 */
export type authFormData = {
  name?: string
  email: string
  password: string
  /** Sign-up only: account type. */
  role?: "seeker" | "recruiter" | "admin"
  /** Sign-in only: "Remember me" checkbox. */
  rememberMe?: boolean
}

/**
 * A page-level auth handler may return this so the form
 * can surface error messages and reset its loading state.
 */
export type AuthResult = {
  error?: { message?: string } | null
} | void

type AuthFormProps<T> = {
  onSubmit?: (data: T) => Promise<AuthResult> | AuthResult
}

function useFormSubmit<T extends authFormData>(
  onSubmit: AuthFormProps<T>["onSubmit"]
) {
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function submit(event: React.FormEvent<HTMLFormElement>, data: T) {
    event.preventDefault()
    setError(null)

    if (!onSubmit) {
      // No handler wired yet — collect and log only.
      // eslint-disable-next-line no-console
      console.log("form data:", data)
      return
    }

    setSubmitting(true)
    const result = await onSubmit(data)
    setSubmitting(false)

    if (result?.error) {
      setError(result.error.message ?? "Something went wrong. Please try again.")
    }
  }

  return { submitting, error, submit }
}

export { useFormSubmit }
export type { AuthFormProps }
