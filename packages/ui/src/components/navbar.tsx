"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { cn } from "cn"

import { Button } from "@workspace/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"

const NAV_LINKS = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/companies", label: "Company" },
  { href: "/pricing", label: "Pricing" },
] as const

function SiteNavbar({ className, ...props }: React.ComponentProps<"header">) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  const isLinkActive = React.useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    [pathname]
  )

  const closeSheet = React.useCallback(() => setOpen(false), [])

  return (
    <header
      data-slot="navbar"
      className={cn(
        "supports-backdrop-filter:bg-background/80 bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="HireLoop home"
          className="shrink-0 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 rounded-md"
        >
          <Image
            src="/images/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = isLinkActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/login" />}
            className="rounded-full px-4 text-sm font-semibold"
          >
            Sign In
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/register" />}
            size="lg"
            className="rounded-full px-5 text-sm font-medium"
          >
            Get Started
          </Button>
        </div>

        <Sheet
          open={open}
          onOpenChange={setOpen}
        >
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              />
            }
          >
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent className="gap-0" showCloseButton>
            <SheetHeader className="border-b">
              <SheetTitle className="font-heading">
                <Image
                  src="/images/logo.png"
                  alt="HireLoop"
                  width={154}
                  height={44}
                  className="h-6 w-auto"
                />
              </SheetTitle>
              <SheetDescription className="sr-only">
                Main navigation menu
              </SheetDescription>
            </SheetHeader>
            <nav
              aria-label="Mobile"
              className="flex flex-col gap-1 overflow-y-auto p-4"
            >
              {NAV_LINKS.map((link) => {
                const isActive = isLinkActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeSheet}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                      isActive
                        ? "bg-muted text-foreground font-semibold"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
            <div className="mt-auto flex flex-col gap-2 border-t p-4">
              <Button
                variant="outline"
                nativeButton={false}
                size="lg"
                className="rounded-full"
                render={<Link href="/login" />}
                onClick={closeSheet}
              >
                Sign In
              </Button>
              <Button
                nativeButton={false}
                size="lg"
                className="rounded-full"
                render={<Link href="/register" />}
                onClick={closeSheet}
              >
                Get Started
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export { SiteNavbar }
