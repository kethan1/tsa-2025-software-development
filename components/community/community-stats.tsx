"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Globe, Leaf, TrendingUp, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const stats = [
  {
    icon: Users,
    label: "Active Stewards",
    value: "12,847",
    change: "+23% this month",
    description: "Farmers, ecologists, and planners actively using VerdeCore",
    action: "View Community",
  },
  {
    icon: Globe,
    label: "Countries",
    value: "67",
    change: "Across 6 continents",
    description: "Global reach with strategies from diverse ecosystems",
    action: "Explore Regions",
  },
  {
    icon: Leaf,
    label: "Strategies Shared",
    value: "1,234",
    change: "+156 this week",
    description: "Regenerative strategies available in the community vault",
    action: "Browse Strategies",
  },
  {
    icon: TrendingUp,
    label: "RegenCreds Earned",
    value: "45.2K",
    change: "Community rewards",
    description: "Credits earned by community members for contributions",
    action: "Learn More",
  },
]

export function CommunityStats() {
  const { toast } = useToast()

  const handleStatClick = (statLabel: string, action: string) => {
    toast({
      title: `${action}`,
      description: `Opening ${statLabel} details...`,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
          onClick={() => handleStatClick(stat.label, stat.action)}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold group-hover:text-green-600 transition-colors duration-300">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-green-600">{stat.change}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
            </div>
            <p className="text-xs text-muted-foreground mb-2">{stat.description}</p>
            <div className="text-xs font-medium text-green-600 group-hover:text-green-700 transition-colors duration-300">
              {stat.action}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
