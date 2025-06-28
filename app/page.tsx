import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { CommunityShowcase } from "@/components/community-showcase"
import { CallToAction } from "@/components/call-to-action"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <CommunityShowcase />
      <CallToAction />
    </main>
  )
}
