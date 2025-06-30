"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Palette, Play, Share, Download, CheckCircle, ArrowDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const steps = [
  {
    icon: Upload,
    title: "Import Your Land",
    description: "Upload GIS data or import drone footage to get started",
    color: "bg-blue-500",
    action: "Start Importing",
    href: "/workspace",
  },
  {
    icon: Palette,
    title: "Design Strategies",
    description: "Use smart tools to place crops, trees, water features, and regenerative elements",
    color: "bg-green-500",
    action: "Begin Design",
    href: "/workspace",
  },
  {
    icon: Play,
    title: "Run Simulation",
    description: "Watch your land transform over time with real environmental modeling",
    color: "bg-purple-500",
    action: "Start Simulation",
    href: "/workspace",
  },
  {
    icon: Share,
    title: "Share & Collaborate",
    description: "Save your strategies to the community vault and remix others' solutions",
    color: "bg-orange-500",
    action: "Join Community",
    href: "/community",
  },
  {
    icon: Download,
    title: "Deploy in Reality",
    description: "Generate action plans, supply lists, and grant proposals for real implementation",
    color: "bg-teal-500",
    action: "Create Kit",
    href: "/workspace",
  },
]

export function HowItWorks() {
  const { toast } = useToast()

  const handleStepClick = (stepTitle: string, action: string) => {
    toast({
      title: `${action}`,
      description: `Opening ${stepTitle} step...`,
    })
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-green-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Simple Workflow
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">How VerdeCore Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From simulation to real-world impact in five intuitive steps
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center gap-4 last:mb-0">
              <Card className="w-full flex-1 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer group" onClick={() => handleStepClick(step.title, step.action)}>
                <CardContent className="flex items-center p-6">
                  <div
                    className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mr-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors duration-300">{step.title}</h3>
                    <p className="text-muted-foreground mb-3">{step.description}</p>
                    <div className="flex items-center justify-between">
                      <Link 
                        href={step.href}
                        className="text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-300 flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {step.action}
                        <CheckCircle className="w-3 h-3" />
                      </Link>
                      <span className="text-xs text-muted-foreground">Step {index + 1}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {index < steps.length - 1 && <ArrowDown className="size-6 text-muted-foreground mx-4 flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
