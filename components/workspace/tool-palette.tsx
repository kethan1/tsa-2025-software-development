"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TreePine, Wheat, Droplets, Bug } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const toolCategories = [
  {
    title: "Agroforestry",
    icon: TreePine,
    tools: [
      { name: "Fruit Trees", icon: "🍎", description: "Apple, pear, citrus varieties" },
      { name: "Windbreaks", icon: "🌲", description: "Protective tree barriers" },
      { name: "Native Shrubs", icon: "🌿", description: "Regional native species" },
    ],
  },
  {
    title: "Crops & Cover",
    icon: Wheat,
    tools: [
      { name: "Three Sisters", icon: "🌽", description: "Corn, beans, squash" },
      { name: "Cover Crops", icon: "🌱", description: "Nitrogen-fixing plants" },
      { name: "Perennial Grains", icon: "🌾", description: "Long-term grain crops" },
    ],
  },
  {
    title: "Water Systems",
    icon: Droplets,
    tools: [
      { name: "Swales", icon: "💧", description: "Water collection channels" },
      { name: "Ponds", icon: "🏞️", description: "Water storage & wildlife" },
      { name: "Irrigation", icon: "🚿", description: "Drip & micro-spray systems" },
    ],
  },
  {
    title: "Wildlife Habitat",
    icon: Bug,
    tools: [
      { name: "Bee Hotels", icon: "🐝", description: "Native pollinator homes" },
      { name: "Hedgerows", icon: "🦔", description: "Wildlife corridors" },
      { name: "Pond Verges", icon: "🦆", description: "Wetland edges" },
    ],
  },
]

export function ToolPalette() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const { toast } = useToast()

  const handleToolClick = (toolName: string, categoryTitle: string) => {
    setSelectedTool(toolName)
    toast({
      title: "Tool Selected",
      description: `"${toolName}" from ${categoryTitle} is now active. Click on the canvas to place it.`,
    })
  }

  const handleToolDrag = (toolName: string, categoryTitle: string) => {
    toast({
      title: "Tool Dragged",
      description: `Dragging "${toolName}" from ${categoryTitle} to canvas...`,
    })
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Strategy Composer</h2>
        <p className="text-sm text-muted-foreground">Build ecosystems, not just fields. Drag tools to your canvas.</p>
      </div>

      {toolCategories.map((category, index) => (
        <div key={index} className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <category.icon className="w-5 h-5 text-green-600" />
            <h3 className="font-medium">{category.title}</h3>
          </div>

          <div className="space-y-2">
            {category.tools.map((tool, toolIndex) => (
              <Card
                key={toolIndex}
                className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  selectedTool === tool.name ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-950' : ''
                }`}
                onClick={() => handleToolClick(tool.name, category.title)}
                draggable
                onDragStart={() => handleToolDrag(tool.name, category.title)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{tool.name}</h4>
                      <p className="text-xs text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {index < toolCategories.length - 1 && <Separator className="mt-4" />}
        </div>
      ))}

      <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Smart Feedback Active
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Beneficial relationships</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span>Potential issues</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
