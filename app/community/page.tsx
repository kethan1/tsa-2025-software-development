import { CommunityHeader } from "@/components/community/community-header"
import { StrategyGrid } from "@/components/community/strategy-grid"
import { CommunityStats } from "@/components/community/community-stats"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CommunityHeader />
      <div className="container mx-auto px-4 py-8">
        <CommunityStats />
        <StrategyGrid />
      </div>
    </div>
  )
}
