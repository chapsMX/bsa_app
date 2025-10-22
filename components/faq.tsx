"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DollarSign, Shield, Trophy, Users, Clock, Wallet, HelpCircle, Gamepad2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const faqs = [
  {
    category: "Getting Started",
    icon: Gamepad2,
    question: "How does Base Sports Arena work?",
    answer:
      "Base Sports Arena is a fully onchain sports picks platform. Join a weekly pool, select your league (NFL, NBA, Premier League, etc.), make your predictions for each game, and compete against other players. The participants with the most correct picks win the prize pool, paid instantly in USDC to your wallet.",
  },
  {
    category: "Getting Started",
    icon: Wallet,
    question: "How do I get started?",
    answer:
      "Getting started is easy! Connect your Web3 wallet (MetaMask, Coinbase Wallet, etc.), select your favorite league, join the current week's pool with USDC, and make your picks before the games start. That's it! You can track your picks in real-time as games unfold.",
  },
  {
    category: "Leagues",
    icon: Trophy,
    question: "What sports and leagues are available?",
    answer:
      "We currently support NFL, NBA, Premier League, La Liga, and more. Each league has weekly pools where you can compete. We're constantly adding new leagues and sports based on community demand. Check the app for the most up-to-date list of available leagues.",
  },
  {
    category: "Payments",
    icon: DollarSign,
    question: "What are the entry fees?",
    answer:
      "Entry fees vary by pool and league, typically ranging from $10 to $100 USDC per week. Higher entry pools have bigger prize pools. You can choose the pool that fits your budget and risk tolerance. All payments are handled securely through smart contracts on Base.",
  },
  {
    category: "Payments",
    icon: Clock,
    question: "When are prizes distributed?",
    answer:
      "Prizes are distributed automatically within 24 hours after the final game of the week concludes and results are verified. USDC is sent directly to your connected wallet via smart contract. No waiting, no manual processing, just instant rewards.",
  },
  {
    category: "Security",
    icon: Shield,
    question: "Is it safe to participate?",
    answer:
      "Absolutely. All funds, pools, and payouts are managed by audited smart contracts on the Base blockchain. This ensures complete transparency and security. Your funds are never held by us - they're locked in the smart contract until winners are determined. Everything is verifiable onchain.",
  },
  {
    category: "Security",
    icon: Shield,
    question: "Which blockchain does it run on?",
    answer:
      "Base Sports Arena is built 100% on Base, Coinbase's secure, fast, and low-cost Ethereum Layer 2 network. Base offers the security of Ethereum with dramatically lower fees and faster transactions, making it perfect for weekly sports pools.",
  },
  {
    category: "Gameplay",
    icon: Users,
    question: "Can I play with friends?",
    answer:
      "Yes! You can create private pools and invite friends to compete. Share your pool link, set your own entry fees, and compete exclusively with your group. Public pools are also available if you want to compete against the broader community.",
  },
  {
    category: "Gameplay",
    icon: Trophy,
    question: "How are winners determined?",
    answer:
      "Winners are determined purely by the number of correct picks. If there's a tie, the prize pool is split equally among all winners. Results are verified through oracle feeds and processed automatically by the smart contract - no human intervention, completely transparent.",
  },
  {
    category: "Legal",
    icon: HelpCircle,
    question: "What's the minimum age to participate?",
    answer:
      "Participants must be at least 18 years old (or the legal age in your jurisdiction) to use Base Sports Arena. We take responsible gaming seriously. Please only participate if you meet the age requirements in your location.",
  },
]

export function FAQ() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const sectionRef = useRef<HTMLElement>(null)

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(faqs.map(faq => faq.category)))]

  // Filter FAQs based on selected category
  const filteredFaqs = selectedCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="help" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">FAQ</h2>
          <p className="text-xl text-muted-foreground">Everything you need to know about Base Sports Arena</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-[#0000FF] text-white shadow-lg scale-105"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border-2 border-border"
              }`}
            >
              {category}
              {category !== "All" && (
                <span className="ml-2 text-xs opacity-75">
                  ({faqs.filter(faq => faq.category === category).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              const Icon = faq.icon
              return (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-card border-2 border-border hover:border-primary/50 rounded-lg px-6 transition-all hover:shadow-lg"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                      <div className="flex items-start gap-4 w-full pr-4">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-1">
                          <div className="p-2 rounded-lg bg-[#0000FF]">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        
                        {/* Question and Category */}
                        <div className="flex-1 text-left">
                          <div className="mb-1">
                            <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded">
                              {faq.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-foreground">{faq.question}</h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pl-16 pr-6 pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              )
            })}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
