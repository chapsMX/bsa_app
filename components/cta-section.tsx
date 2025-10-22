"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight, Users, MessageCircle } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-20 bg-[#0000FF] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Users className="w-4 h-4" />
            <span className="text-sm font-semibold">Join 10,000+ Players Winning on Base</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
          Ready to Put Your Sports Knowledge to the Test?
          </h2>
          
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
          Make your predictions, compete with participants around the world, and earn USDC rewards — all secured on Base.
          </p>

          {/* Primary CTA */}
          <div className="pt-4">
            <Button 
              asChild 
              size="lg" 
              className="text-xl px-12 py-8 bg-white text-[#0000FF] hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-2xl group"
            >
              <Link href="/admin" className="flex items-center gap-2">
                Start Predicting Now
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Divider */}
          <div className="pt-8">
            <div className="flex items-center gap-4 max-w-md mx-auto">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="text-sm opacity-75">Or join our community</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="text-base px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0000FF] transition-all group"
            >
              <Link href="https://discord.com/invite/buildonbase" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Join Discord
              </Link>
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="text-base px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0000FF] transition-all group"
            >
              <Link href="https://farcaster.xyz/chaps" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Follow on Farcaster
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
