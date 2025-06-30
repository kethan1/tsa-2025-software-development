"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Users, Globe, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Active Stewards",
    description: "Farmers and ecologists worldwide",
    action: "Join Community",
  },
  {
    icon: Globe,
    value: "50+",
    label: "Countries",
    description: "Global regenerative network",
    action: "Explore Regions",
  },
  {
    icon: Leaf,
    value: "1M+",
    label: "Acres Simulated",
    description: "Land transformed through simulation",
    action: "View Impact",
  },
  {
    icon: Zap,
    value: "500+",
    label: "Strategies Shared",
    description: "Community-driven solutions",
    action: "Browse Strategies",
  },
]

export function CallToAction() {
  const { toast } = useToast()

  const handleStatClick = (statLabel: string, action: string) => {
    toast({
      title: `${action}`,
      description: `Opening ${statLabel} details...`,
    })
  }

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
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => handleStatClick(stat.label, stat.action)}
            >
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <stat.icon className="w-8 h-8 opacity-80 group-hover:scale-110 transition-transform duration-300" />
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-green-200 transition-colors duration-300">{stat.value}</h3>
                <p className="text-sm opacity-80 mb-2">{stat.label}</p>
                <p className="text-xs opacity-60 mb-3">{stat.description}</p>
                <div className="text-xs font-medium text-green-200 group-hover:text-green-100 transition-colors duration-300">
                  {stat.action}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
