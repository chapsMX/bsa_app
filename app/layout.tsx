import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Providers } from "@/components/providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "Base Sports Arena - Your arena. Your pick. Your win.",
  description:
    "The first fully onchain sports picks platform where fans compete to predict the outcomes of weekly games and win real rewards on Base blockchain.",
  generator: "v0.app",
  openGraph: {
    title: "Base Sports Arena - Your arena. Your pick. Your win.",
    description:
      "The first fully onchain sports picks platform where fans compete to predict the outcomes of weekly games and win real rewards on Base blockchain.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
