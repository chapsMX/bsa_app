import { Header } from "@/components/header"
import { Ticker } from "@/components/ticker"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <Ticker />
        <Hero />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTASection />
        <Footer />
      </div>
    </main>
  )
}
