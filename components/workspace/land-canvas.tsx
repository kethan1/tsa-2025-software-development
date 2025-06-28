"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, MousePointer, Square, Circle } from "lucide-react"

export function LandCanvas() {
  const [selectedTool, setSelectedTool] = useState("pointer")

  return (
    <div className="h-full relative bg-green-50 dark:bg-green-950">
      {/* Canvas Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          variant={selectedTool === "pointer" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTool("pointer")}
        >
          <MousePointer className="w-4 h-4" />
        </Button>
        <Button
          variant={selectedTool === "rectangle" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTool("rectangle")}
        >
          <Square className="w-4 h-4" />
        </Button>
        <Button
          variant={selectedTool === "circle" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTool("circle")}
        >
          <Circle className="w-4 h-4" />
        </Button>
      </div>

      {/* Import Options */}
      <div className="absolute top-4 right-4 z-10">
        <Button variant="outline" size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Import GIS Data
        </Button>
      </div>

      {/* Canvas Area */}
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-96 h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center mb-4 bg-white/50 dark:bg-gray-800/50">
            <div className="text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Start Your Land Canvas</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload GIS data, import drone footage, or draw your plot
              </p>
              <div className="flex gap-2 justify-center">
                <Button size="sm">Upload File</Button>
                <Button size="sm" variant="outline">
                  Draw Plot
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            <Badge variant="secondary">AI Zone Classification</Badge>
            <Badge variant="secondary">Smart Snap-to-Grid</Badge>
            <Badge variant="secondary">Soil Realism</Badge>
          </div>
        </div>
      </div>

      {/* Cursor Feedback */}
      <div className="absolute bottom-4 left-4 z-10">
        <Badge variant="outline" className="bg-white/90 dark:bg-gray-800/90">
          Tool: {selectedTool} | Click to place elements
        </Badge>
      </div>
    </div>
  )
}
