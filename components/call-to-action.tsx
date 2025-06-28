import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Users, Globe, Zap } from "lucide-react"
import Link from "next/link"

export function CallToAction() {
  return (
    <section className="py-24 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            <Leaf className="w-4 h-4 mr-2" />
            Join the Regenerative Revolution
          </Badge>

          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Transform Your Land?</h2>

          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Start simulating regenerative strategies today and join thousands of stewards creating positive
            environmental impact worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
              <Link href="/workspace">Start Free Simulation</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/community">Join Community</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-3 opacity-80" />
              <h3 className="font-semibold mb-2">10,000+</h3>
              <p className="text-sm opacity-80">Active Stewards</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Globe className="w-8 h-8 mx-auto mb-3 opacity-80" />
              <h3 className="font-semibold mb-2">50+</h3>
              <p className="text-sm opacity-80">Countries</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Leaf className="w-8 h-8 mx-auto mb-3 opacity-80" />
              <h3 className="font-semibold mb-2">1M+</h3>
              <p className="text-sm opacity-80">Acres Simulated</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 mx-auto mb-3 opacity-80" />
              <h3 className="font-semibold mb-2">500+</h3>
              <p className="text-sm opacity-80">Strategies Shared</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
