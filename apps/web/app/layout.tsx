import { Geist, Geist_Mono, Manrope } from "next/font/google"

import "@workspace/ui/globals.css"
import { SiteNavbar } from "@workspace/ui/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontHeading = Manrope({
  subsets: ["latin"],
  variable: "--font-heading-font",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable, fontHeading.variable)}
    >
      <body>
        <ThemeProvider defaultTheme="dark">
      <SiteNavbar />
      {children}
    </ThemeProvider>
      </body>
    </html>
  )
}
