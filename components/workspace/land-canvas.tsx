"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, MousePointer, Square, Circle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function LandCanvas() {
  const [selectedTool, setSelectedTool] = useState("pointer")
  const [isDrawing, setIsDrawing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleImportGISData = () => {
    toast({
      title: "Import GIS Data",
      description: "Opening GIS data import dialog...",
    })
    // Simulate GIS data import
    setTimeout(() => {
      toast({
        title: "GIS Data Imported",
        description: "Successfully imported land parcel data.",
      })
    }, 2000)
  }

  const handleUploadFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      toast({
        title: "File Uploaded",
        description: `Successfully uploaded ${file.name}`,
      })
      // Here you would process the file (image, drone footage, etc.)
    }
  }

  const handleDrawPlot = () => {
    setIsDrawing(!isDrawing)
    toast({
      title: isDrawing ? "Drawing Mode Disabled" : "Drawing Mode Enabled",
      description: isDrawing ? "Click and drag to draw your plot boundaries." : "Drawing mode activated.",
    })
  }

  return (
    <div className="h-full relative bg-green-50 dark:bg-green-950">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.geojson,.shp,.kml"
        onChange={handleFileChange}
        className="hidden"
      />

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
        <Button variant="outline" size="sm" onClick={handleImportGISData}>
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
                <Button size="sm" onClick={handleUploadFile}>
                  Upload File
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleDrawPlot}
                >
                  {isDrawing ? "Stop Drawing" : "Draw Plot"}
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
          Tool: {selectedTool} | {isDrawing ? "Drawing mode active" : "Click to place elements"}
        </Badge>
      </div>
    </div>
  )
}
