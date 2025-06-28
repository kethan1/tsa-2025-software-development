import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Download, Eye, Heart } from "lucide-react"

const strategies = [
  {
    title: "Kenyan Dryland Millet-Grazing Loop",
    author: "Sarah Kimani",
    avatar: "/placeholder.svg?height=40&width=40",
    description: "Rotational grazing system with drought-resistant millet for semi-arid regions",
    tags: ["Drought Resistant", "Livestock", "Africa"],
    stats: { downloads: 234, views: 1200, likes: 89 },
    rating: 4.8,
  },
  {
    title: "3 Sisters on Volcanic Slope",
    author: "Miguel Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    description: "Traditional companion planting adapted for steep volcanic soils",
    tags: ["Companion Planting", "Slope Management", "Traditional"],
    stats: { downloads: 156, views: 890, likes: 67 },
    rating: 4.6,
  },
  {
    title: "Urban Jungle Garden",
    author: "Alex Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    description: "Vertical growing system for maximum yield in minimal urban space",
    tags: ["Urban", "Vertical", "High Density"],
    stats: { downloads: 445, views: 2100, likes: 123 },
    rating: 4.9,
  },
]

export function CommunityShowcase() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Community Land Recipes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover, remix, and share regenerative strategies from stewards worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {strategies.map((strategy, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={strategy.avatar || "/placeholder.svg"} alt={strategy.author} />
                    <AvatarFallback>
                      {strategy.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{strategy.author}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">{strategy.rating}</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg">{strategy.title}</CardTitle>
                <CardDescription>{strategy.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {strategy.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {strategy.stats.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {strategy.stats.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {strategy.stats.likes}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  View & Remix
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            Explore All Strategies
          </Button>
        </div>
      </div>
    </section>
  )
}
