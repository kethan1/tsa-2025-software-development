import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Leaf, Globe, Users } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Leaf className="w-4 h-4 mr-2" />
            The Living Map for Regenerative Impact
          </Badge>

          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            VerdeCore
          </h1>

          <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
            A real-time, collaborative simulation-and-deployment tool for farmers, ecologists, and planners to test,
            share, and deploy land-use strategies on real land parcels.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/workspace">
                <Play className="w-5 h-5 mr-2" />
                Start Simulating
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/community">
                <Users className="w-5 h-5 mr-2" />
                Explore Community
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-3">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Real Land Simulation</h3>
              <p className="text-sm text-muted-foreground">
                Upload GIS data to test regenerative strategies on real land
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-3">
                <Play className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Time-Based Forecasting</h3>
              <p className="text-sm text-muted-foreground">
                Watch your strategies play out over months, years, and generations
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold mb-2">Community Collaboration</h3>
              <p className="text-sm text-muted-foreground">Share and remix strategies like open-source code</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
