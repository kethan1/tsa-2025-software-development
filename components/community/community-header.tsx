"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function CommunityHeader() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isTrending, setIsTrending] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const { toast } = useToast()

  const handleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
    toast({
      title: isFilterOpen ? "Filters Closed" : "Filters Opened",
      description: isFilterOpen ? "Filter panel closed." : "Advanced filtering options available.",
    })
  }

  const handleTrending = () => {
    setIsTrending(!isTrending)
    toast({
      title: isTrending ? "All Strategies" : "Trending Strategies",
      description: isTrending ? "Showing all strategies." : "Showing trending strategies.",
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast({
        title: "Search Results",
        description: `Searching for "${searchQuery}" in strategies...`,
      })
    }
  }

  const handleFilterBadge = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter]
    
    setActiveFilters(newFilters)
    
    toast({
      title: "Filter Updated",
      description: newFilters.length > 0 
        ? `Filtering by: ${newFilters.join(", ")}`
        : "Showing all strategies",
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Community Swap Vault</h1>
            <p className="text-muted-foreground">Share and remix regenerative strategies like open-source code</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/workspace">
                <Plus className="w-4 h-4 mr-2" />
                Create Strategy
              </Link>
            </Button>
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search strategies, crops, regions..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleFilter}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button 
              variant={isTrending ? "default" : "outline"} 
              size="sm"
              onClick={handleTrending}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </Button>
          </div>
        </form>

        <div className="flex gap-2 mt-4">
          <Badge 
            variant={activeFilters.includes("All Regions") ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/10"
            onClick={() => handleFilterBadge("All Regions")}
          >
            All Regions
          </Badge>
          <Badge 
            variant={activeFilters.includes("Agroforestry") ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/10"
            onClick={() => handleFilterBadge("Agroforestry")}
          >
            Agroforestry
          </Badge>
          <Badge 
            variant={activeFilters.includes("Livestock") ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/10"
            onClick={() => handleFilterBadge("Livestock")}
          >
            Livestock
          </Badge>
          <Badge 
            variant={activeFilters.includes("Urban") ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/10"
            onClick={() => handleFilterBadge("Urban")}
          >
            Urban
          </Badge>
          <Badge 
            variant={activeFilters.includes("Permaculture") ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/10"
            onClick={() => handleFilterBadge("Permaculture")}
          >
            Permaculture
          </Badge>
        </div>
      </div>
    </div>
  )
}
