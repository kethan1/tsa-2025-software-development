"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Download, Eye, Heart, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const strategies = [
  {
    id: 1,
    title: "Kenyan Dryland Millet-Grazing Loop",
    author: "Sarah Kimani",
    location: "Machakos, Kenya",
    avatar: "/placeholder.svg?height=40&width=40",
    description:
      "Rotational grazing system with drought-resistant millet for semi-arid regions. Includes water harvesting and native tree integration.",
    tags: ["Drought Resistant", "Livestock", "Africa", "Water Harvesting"],
    stats: { downloads: 234, views: 1200, likes: 89, comments: 23 },
    rating: 4.8,
    regenCreds: 156,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "3 Sisters on Volcanic Slope",
    author: "Miguel Rodriguez",
    location: "Guatemala",
    avatar: "/placeholder.svg?height=40&width=40",
    description:
      "Traditional companion planting adapted for steep volcanic soils with terracing and erosion control measures.",
    tags: ["Companion Planting", "Slope Management", "Traditional", "Erosion Control"],
    stats: { downloads: 156, views: 890, likes: 67, comments: 18 },
    rating: 4.6,
    regenCreds: 98,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Urban Jungle Garden",
    author: "Alex Chen",
    location: "Singapore",
    avatar: "/placeholder.svg?height=40&width=40",
    description:
      "Vertical growing system for maximum yield in minimal urban space using hydroponic towers and companion planting.",
    tags: ["Urban", "Vertical", "High Density", "Hydroponics"],
    stats: { downloads: 445, views: 2100, likes: 123, comments: 34 },
    rating: 4.9,
    regenCreds: 234,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Prairie Restoration with Cattle",
    author: "Emma Thompson",
    location: "Nebraska, USA",
    avatar: "/placeholder.svg?height=40&width=40",
    description: "Mob grazing technique to restore native prairie while maintaining profitable cattle operation.",
    tags: ["Prairie", "Mob Grazing", "Native Plants", "Carbon Sequestration"],
    stats: { downloads: 189, views: 1450, likes: 78, comments: 29 },
    rating: 4.7,
    regenCreds: 167,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Mediterranean Olive Agroforestry",
    author: "Giuseppe Rossi",
    location: "Tuscany, Italy",
    avatar: "/placeholder.svg?height=40&width=40",
    description: "Ancient olive groves integrated with vegetables, herbs, and beneficial insects for biodiversity.",
    tags: ["Mediterranean", "Olive", "Agroforestry", "Biodiversity"],
    stats: { downloads: 267, views: 1680, likes: 94, comments: 21 },
    rating: 4.8,
    regenCreds: 189,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Aquaponics Food Forest",
    author: "Priya Sharma",
    location: "Kerala, India",
    avatar: "/placeholder.svg?height=40&width=40",
    description:
      "Integrated aquaponics system within a food forest design for year-round production in tropical climate.",
    tags: ["Aquaponics", "Food Forest", "Tropical", "Integrated Systems"],
    stats: { downloads: 312, views: 1890, likes: 108, comments: 27 },
    rating: 4.9,
    regenCreds: 201,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function StrategyGrid() {
  const [likedStrategies, setLikedStrategies] = useState<Set<number>>(new Set())
  const { toast } = useToast()

  const handleViewAll = () => {
    toast({
      title: "View All Strategies",
      description: "Loading complete strategy library...",
    })
  }

  const handleViewAndRemix = (strategyId: number, strategyTitle: string) => {
    toast({
      title: "Opening Strategy",
      description: `Loading "${strategyTitle}" for viewing and remixing...`,
    })
    // Here you would navigate to the strategy detail page
  }

  const handleLike = (strategyId: number, strategyTitle: string) => {
    const newLikedStrategies = new Set(likedStrategies)
    if (newLikedStrategies.has(strategyId)) {
      newLikedStrategies.delete(strategyId)
      toast({
        title: "Strategy Unliked",
        description: `Removed "${strategyTitle}" from your favorites.`,
      })
    } else {
      newLikedStrategies.add(strategyId)
      toast({
        title: "Strategy Liked",
        description: `Added "${strategyTitle}" to your favorites.`,
      })
    }
    setLikedStrategies(newLikedStrategies)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Featured Strategies</h2>
        <Button variant="outline" size="sm" onClick={handleViewAll}>
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((strategy) => (
          <Card key={strategy.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 relative">
              <img
                src={strategy.image || "/placeholder.svg"}
                alt={strategy.title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-green-600">{strategy.regenCreds} RegenCreds</Badge>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={strategy.avatar || "/placeholder.svg"} alt={strategy.author} />
                  <AvatarFallback>
                    {strategy.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{strategy.author}</p>
                  <p className="text-xs text-muted-foreground">{strategy.location}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{strategy.rating}</span>
                </div>
              </div>

              <CardTitle className="text-lg leading-tight">{strategy.title}</CardTitle>
              <CardDescription className="text-sm">{strategy.description}</CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-4">
                {strategy.tags.slice(0, 3).map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {strategy.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{strategy.tags.length - 3}
                  </Badge>
                )}
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
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {strategy.stats.comments}
                </span>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  size="sm"
                  onClick={() => handleViewAndRemix(strategy.id, strategy.title)}
                >
                  View & Remix
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleLike(strategy.id, strategy.title)}
                >
                  <Heart className={`w-4 h-4 ${likedStrategies.has(strategy.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
