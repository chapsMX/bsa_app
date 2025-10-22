"use client"

import Link from "next/link"
import { Trophy, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Wallet } from "@coinbase/onchainkit/wallet"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  // Close menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [mobileMenuOpen])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl relative z-[60]">
          <Trophy className="w-6 h-6 text-primary" />
          <span className="text-foreground">Base Sports Arena</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#how-to-play"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            How to Play
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            About
          </Link>
          <Link
            href="#help"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            Help Center
          </Link>
          <Link
            href="#roadmap"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            Roadmap
          </Link>
          <Link
            href="https://x.com/chapsmx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            Twitter
          </Link>
          <Link
            href="https://farcaster.xyz/chaps"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            Farcaster
          </Link>
          <Wallet />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative z-[60] p-2 text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu */}
        <nav
          id="mobile-menu"
          className={`fixed top-0 right-0 bottom-0 w-[280px] bg-[#1a1a1a] border-l border-border z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col h-full pt-16 px-6 pb-6">
            <div className="flex flex-col gap-3">
              {/* Navigation Links */}
              <div className="flex flex-col gap-1">
                <Link
                  href="#how-to-play"
                  onClick={closeMobileMenu}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  How to Play
                </Link>
                <Link
                  href="#about"
                  onClick={closeMobileMenu}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  About
                </Link>
                <Link
                  href="#help"
                  onClick={closeMobileMenu}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Help Center
                </Link>
                <Link
                  href="#roadmap"
                  onClick={closeMobileMenu}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Roadmap
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-border my-1" />

              {/* Social Links */}
              <div className="flex flex-col gap-1">
                <Link
                  href="https://x.com/chapsmx"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Twitter / X
                </Link>
                <Link
                  href="https://farcaster.xyz/chaps"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Farcaster
                </Link>
                <Link
                  href="https://discord.com/invite/buildonbase"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Discord
                </Link>
              </div>

              {/* CTA Button */}
              <div className="mt-3 flex justify-center">
                <Wallet />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
