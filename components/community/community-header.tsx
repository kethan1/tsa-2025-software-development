import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"

export function CommunityHeader() {
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

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search strategies, crops, regions..." className="pl-10" />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Badge variant="secondary">All Regions</Badge>
          <Badge variant="outline">Agroforestry</Badge>
          <Badge variant="outline">Livestock</Badge>
          <Badge variant="outline">Urban</Badge>
          <Badge variant="outline">Permaculture</Badge>
        </div>
      </div>
    </div>
  )
}
