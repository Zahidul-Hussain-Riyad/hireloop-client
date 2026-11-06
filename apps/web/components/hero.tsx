"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronDown, Magnet, MapPin, Sparkles } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"

const TRENDING = ["Product Designer", "AI Engineering", "DevOps Engineer"]

function Hero({ className, ...props }: React.ComponentProps<"section">) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")

  function search(event: React.FormEvent, presetQuery?: string) {
    event.preventDefault()
    const q = (presetQuery ?? query).trim()
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    router.push(`/jobs${params.size ? `?${params.toString()}` : ""}`)
  }

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-background text-center",
        className
      )}
      {...props}
    >
      {/* Background swirl, extracted from the design, dimmed + faded into the page */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/40 to-background" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background/80 to-transparent" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-24 pb-20 sm:px-6 sm:pt-28 md:pt-32 md:pb-28 lg:px-8">
        <p className="text-muted-foreground inline-flex items-center gap-2 rounded-full border border-border/40 bg-white/5 px-3 py-1.5 font-mono text-xs">
          <Sparkles className="size-3.5 text-primary" />
          50,000+ new jobs this month
        </p>

        <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight uppercase sm:text-6xl md:text-7xl">
          Find Your Dream Job Today
        </h1>

        <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role faster.
        </p>

        <form
          onSubmit={search}
          className="border-border/60 focus-within:border-ring/60 focus-within:ring-ring/20 mt-10 flex h-14 w-full max-w-2xl items-center gap-2 rounded-full border bg-clip-padding p-1.5 pr-1.5 pl-5 backdrop-blur transition-colors focus-within:ring-3"
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Job title, skill or company"
            aria-label="Job title, skill or company"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <div
            aria-hidden
            className="bg-border/60 hidden h-6 w-px shrink-0 md:block"
          />
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 hidden h-10 items-center gap-1.5 rounded-full px-3 text-sm transition-colors md:flex"
          >
            <MapPin className="size-4" />
            <span>Location</span>
            <ChevronDown className="size-3.5 opacity-60" />
          </button>
          <Button
            type="submit"
            size="lg"
            className="shrink-0 rounded-full px-5"
            aria-label="Search"
          >
            <Magnet className="size-4" />
            <span className="hidden sm:inline">Search</span>
          </Button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-muted-foreground text-sm">Trending:</span>
          {TRENDING.map((role) => (
            <button
              key={role}
              type="button"
              onClick={(event) => search(event, role)}
              className="text-muted-foreground hover:border-primary/50 hover:text-foreground rounded-full border border-border/50 bg-white/5 px-3 py-1 text-xs transition-colors"
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Hero }
