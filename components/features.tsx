"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Paintbrush, TreePine, PlayCircle, Share2, Smartphone, Satellite, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const features = [
  {
    icon: Paintbrush,
    title: "LandCanvas™",
    subtitle: "Import or Scan Your Real Land",
    description:
      "Upload GIS coordinates or import drone footage. AI classifies zones and provides context-aware tools.",
    badge: "Data Import",
    color: "bg-blue-500",
    action: "Try LandCanvas",
    href: "/workspace",
  },
  {
    icon: TreePine,
    title: "Strategy Composer",
    subtitle: "Build Ecosystems, Not Just Fields",
    description:
      "Plant agroforestry layouts, add carbon spirals, design crop interplanting with companion AI guidance.",
    badge: "Smart Feedback",
    color: "bg-green-500",
    action: "Start Composing",
    href: "/workspace",
  },
  {
    icon: PlayCircle,
    title: "Simulation Options",
    subtitle: "Time-Based Forecasting Engine",
    description:
      "Watch your land transform through rainfall, biomass growth, soil carbon increase, and biodiversity changes.",
    badge: "Real-time Animation",
    color: "bg-purple-500",
    action: "Run Simulation",
    href: "/workspace",
  },
  {
    icon: Share2,
    title: "The Swap Vault",
    subtitle: "Share and Remix Strategies",
    description: "Save land recipes, remix strategies from others, earn RegenCreds when your strategies are adopted.",
    badge: "Community Driven",
    color: "bg-orange-500",
    action: "Explore Vault",
    href: "/community",
  },
  {
    icon: Smartphone,
    title: "Impact Deployment Kit",
    subtitle: "Turn Sim into Action",
    description: "Generate step-by-step action plans, machine routes, seasonal guides, and grant proposals.",
    badge: "Real-world Ready",
    color: "bg-teal-500",
    action: "Create Kit",
    href: "/workspace",
  },
  {
    icon: Satellite,
    title: "EarthMirror",
    subtitle: "Real-World Comparison Tool",
    description: "Compare with satellite data from similar land interventions worldwide with before-after views.",
    badge: "Satellite Data",
    color: "bg-indigo-500",
    action: "View EarthMirror",
    href: "/workspace",
  },
]

export function Features() {
  const { toast } = useToast()

  const handleFeatureClick = (featureTitle: string, action: string) => {
    toast({
      title: `${action}`,
      description: `Opening ${featureTitle}...`,
    })
  }

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Core Unique Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            All cursor-guided tools designed to make regenerative land management accessible and actionable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => handleFeatureClick(feature.title, feature.action)}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${feature.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-green-600 transition-colors duration-300">
                  {feature.title}
                </CardTitle>
                <CardDescription className="font-medium text-green-600 dark:text-green-400">
                  {feature.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <Link 
                    href={feature.href}
                    className="text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {feature.action}
                  </Link>
                  <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
