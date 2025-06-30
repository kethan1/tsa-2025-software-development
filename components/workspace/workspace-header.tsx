"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Save, Share2, Play, Pause, RotateCcw, Download, Settings, HelpCircle, Keyboard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const keyboardShortcuts = [
  { key: "Ctrl/Cmd + I", description: "Import GIS Data" },
  { key: "Ctrl/Cmd + V", description: "Toggle Video View" },
  { key: "Ctrl/Cmd + C", description: "Show Canvas" },
  { key: "Ctrl/Cmd + +", description: "Zoom In" },
  { key: "Ctrl/Cmd + -", description: "Zoom Out" },
  { key: "Ctrl/Cmd + 0", description: "Reset View" },
  { key: "Ctrl/Cmd + Shift + T", description: "Toggle Theme" },
  { key: "Space", description: "Play/Pause Simulation" },
  { key: "R", description: "Reset Simulation" },
]

export function WorkspaceHeader() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    // Simulate saving project
    toast({
      title: "Project Saved",
      description: "Your farm project has been saved successfully.",
    })
  }

  const handleShare = async () => {
    setIsSharing(true)
    try {
      // Simulate sharing functionality
      if (navigator.share) {
        await navigator.share({
          title: "VerdeCore Farm Project",
          text: "Check out my regenerative farm strategy on VerdeCore!",
          url: window.location.href,
        })
      } else {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link Copied",
          description: "Project link copied to clipboard!",
        })
      }
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Unable to share project at this time.",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
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

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleShare}
            disabled={isSharing}
          >
            <Share2 className="w-4 h-4 mr-2" />
            {isSharing ? "Sharing..." : "Share"}
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

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <HelpCircle className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Keyboard className="w-5 h-5" />
                  Keyboard Shortcuts
                </DialogTitle>
                <DialogDescription>
                  Quick keyboard shortcuts to navigate and control VerdeCore
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2">
                {keyboardShortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                    <span className="text-sm text-muted-foreground">{shortcut.description}</span>
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
