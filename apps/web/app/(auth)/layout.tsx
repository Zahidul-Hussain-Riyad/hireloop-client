import Image from "next/image"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 py-10 sm:px-6">
      {/* Same swirl backdrop as the hero, dimmed further for focus */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-20"
        />
        <div className="bg-background/70 absolute inset-0" />
      </div>

      <Link
        href="/"
        aria-label="HireLoop home"
        className="outline-none focus-visible:ring-3 focus-visible:ring-ring/50 mb-8 rounded-md"
      >
        <Image
          src="/images/logo.png"
          alt="HireLoop"
          width={154}
          height={44}
          className="h-8 w-auto"
        />
      </Link>

      {children}
    </div>
  )
}
