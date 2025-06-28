import { Card, CardContent } from "@/components/ui/card"
import { Users, Globe, Leaf, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    label: "Active Stewards",
    value: "12,847",
    change: "+23% this month",
  },
  {
    icon: Globe,
    label: "Countries",
    value: "67",
    change: "Across 6 continents",
  },
  {
    icon: Leaf,
    label: "Strategies Shared",
    value: "1,234",
    change: "+156 this week",
  },
  {
    icon: TrendingUp,
    label: "RegenCreds Earned",
    value: "45.2K",
    change: "Community rewards",
  },
]

export function CommunityStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-green-600">{stat.change}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
