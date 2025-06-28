import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Save, Share2, Play, Pause, RotateCcw, Download, Settings, HelpCircle } from "lucide-react"
import Link from "next/link"

export function WorkspaceHeader() {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold text-green-600">
            VerdeCore
          </Link>
          <Badge variant="secondary">My Farm Project</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>

          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />

          <Button variant="outline" size="sm">
            <Play className="w-4 h-4 mr-2" />
            Simulate
          </Button>

          <Button variant="outline" size="sm">
            <Pause className="w-4 h-4" />
          </Button>

          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4" />
          </Button>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />

          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Deploy Kit
          </Button>

          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm">
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
