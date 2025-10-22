"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote, MapPin, DollarSign, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

const testimonials = [
  {
    name: "Alex Martinez",
    initials: "AM",
    location: "Miami, FL",
    sport: "NFL Fan",
    earnings: "$2,450",
    duration: "3 months",
    text: "I've been into sports betting for years, but Base Sports Arena changed everything. The transparency of blockchain and instant USDC payouts are game-changers. Won my first pool in week one and haven't looked back.",
    rating: 5,
  },
  {
    name: "Jordan Lee",
    initials: "JL",
    location: "Austin, TX",
    sport: "NBA Enthusiast",
    earnings: "$1,890",
    duration: "2 months",
    text: "Finally, a platform that rewards actual sports knowledge instead of luck. The onchain verification means no disputes, no delays. Just pure competition and instant rewards.",
    rating: 5,
  },
  {
    name: "Chris Parker",
    initials: "CP",
    location: "Denver, CO",
    sport: "Multi-Sport",
    earnings: "$3,200",
    duration: "4 months",
    text: "Tracking my picks in real-time is addictive. The community is amazing, and competing with friends adds a whole new level of excitement to game day. Best sports platform I've used.",
    rating: 4,
  },
  {
    name: "Taylor Sullivan",
    initials: "TS",
    location: "Seattle, WA",
    sport: "Premier League",
    earnings: "$1,650",
    duration: "6 weeks",
    text: "As someone new to crypto, Base Sports Arena made it incredibly easy. Connected my wallet, made my picks, and won USDC in my third week. The interface is clean and intuitive.",
    rating: 5,
  },
  {
    name: "Morgan Davis",
    initials: "MD",
    location: "Chicago, IL",
    sport: "Fantasy Pro",
    earnings: "$4,100",
    duration: "5 months",
    text: "I've tried every fantasy platform out there. Base Sports Arena combines the best of DFS with blockchain transparency. Weekly pools keep things fresh, and the prizes are real.",
    rating: 5,
  },
  {
    name: "Sam Rivera",
    initials: "SR",
    location: "Phoenix, AZ",
    sport: "College Football",
    earnings: "$980",
    duration: "1 month",
    text: "Just started last month and already hooked. The fact that everything runs on Base means fast transactions and low fees. Love the competitive atmosphere and fair play.",
    rating: 4,
  },
  {
    name: "Jamie Chen",
    initials: "JC",
    location: "Portland, OR",
    sport: "Multi-Sport",
    earnings: "$2,780",
    duration: "3 months",
    text: "From NBA to NFL to soccer, I play it all on Base Sports Arena. The variety keeps things exciting, and the community is top-notch. Instant USDC payouts mean I can reinvest in more pools right away.",
    rating: 5,
  },
  {
    name: "Riley Thompson",
    initials: "RT",
    location: "Boston, MA",
    sport: "Multi-Sport Fan",
    earnings: "$1,340",
    duration: "7 weeks",
    text: "Being able to compete across different sports from one platform is a game changer. Whether it's hockey, football, or basketball season, there's always action. The blockchain transparency gives me total confidence.",
    rating: 4,
  },
]

export function Testimonials() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [autoplayPlugin.current as any]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  // Check for reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion && autoplayPlugin.current) {
      autoplayPlugin.current.stop()
    }
  }, [])

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">What Players Say</h2>
          <p className="text-xl text-muted-foreground">Real stories from real winners on Base</p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <Card className="relative overflow-hidden bg-card border-2 border-border hover:border-primary/50 transition-all hover:shadow-2xl h-full">
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 opacity-10">
                      <Quote className="w-16 h-16 text-primary" />
                    </div>

                    <CardContent className="p-6 space-y-4 relative z-10">
                      {/* Avatar and Name */}
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-[#0000FF] text-white font-bold text-lg">
                            {testimonial.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {testimonial.location}
                          </p>
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        &quot;{testimonial.text}&quot;
                      </p>

                      {/* Stats */}
                      <div className="pt-4 border-t border-border space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-primary" />
                            Total Earnings
                          </span>
                          <span className="font-bold text-primary">{testimonial.earnings}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Playing Since
                          </span>
                          <span className="font-semibold text-foreground">{testimonial.duration}</span>
                        </div>
                      </div>

                      {/* Sport Badge */}
                      <div className="pt-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {testimonial.sport}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/90 hover:bg-background border-2 border-border rounded-full p-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 hidden md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/90 hover:bg-background border-2 border-border rounded-full p-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 hidden md:block"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Progress Indicators (Dots) */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all rounded-full ${
                  index === selectedIndex
                    ? "bg-primary w-8 h-3"
                    : "bg-border hover:bg-primary/50 w-3 h-3"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
