"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Save, Share2, Play, Pause, RotateCcw, Download, Settings, HelpCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function WorkspaceHeader() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    // Simulate saving project
    toast({
      title: "Project Saved",
      description: "Your farm project has been saved successfully.",
    })
  }

  const handleSimulate = () => {
    setIsSimulating(true)
    setIsPaused(false)
    toast({
      title: "Simulation Started",
      description: "Running regenerative impact simulation...",
    })
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
    toast({
      title: isPaused ? "Simulation Resumed" : "Simulation Paused",
      description: isPaused ? "Continuing simulation..." : "Simulation paused.",
    })
  }

  const handleReset = () => {
    setIsSimulating(false)
    setIsPaused(false)
    toast({
      title: "Simulation Reset",
      description: "Simulation has been reset to initial state.",
    })
  }

  const handleDeployKit = () => {
    toast({
      title: "Deployment Kit Generated",
      description: "Your implementation kit is ready for download.",
    })
    // Simulate file download
    const link = document.createElement('a')
    link.href = '#'
    link.download = 'verdecore-deployment-kit.pdf'
    link.click()
  }

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Settings panel would open here.",
    })
  }

  const handleHelp = () => {
    toast({
      title: "Help & Documentation",
      description: "Opening help documentation...",
    })
  }

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
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSimulate}
            disabled={isSimulating && !isPaused}
          >
            <Play className="w-4 h-4 mr-2" />
            Simulate
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePause}
            disabled={!isSimulating}
          >
            <Pause className="w-4 h-4" />
          </Button>

          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />

          <Button variant="outline" size="sm" onClick={handleDeployKit}>
            <Download className="w-4 h-4 mr-2" />
            Deploy Kit
          </Button>

          <Button variant="ghost" size="sm" onClick={handleSettings}>
            <Settings className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm" onClick={handleHelp}>
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
