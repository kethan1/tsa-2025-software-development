import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Upload, Palette, Play, Share, Download } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Import Your Land",
    description: "Upload GIS data, drone footage, or draw your plot directly on the canvas",
    color: "bg-blue-500",
  },
  {
    icon: Palette,
    title: "Design Strategies",
    description: "Use smart tools to place crops, trees, water features, and regenerative elements",
    color: "bg-green-500",
  },
  {
    icon: Play,
    title: "Run Simulation",
    description: "Watch your land transform over time with real environmental modeling",
    color: "bg-purple-500",
  },
  {
    icon: Share,
    title: "Share & Collaborate",
    description: "Save your strategies to the community vault and remix others' solutions",
    color: "bg-orange-500",
  },
  {
    icon: Download,
    title: "Deploy in Reality",
    description: "Generate action plans, supply lists, and grant proposals for real implementation",
    color: "bg-teal-500",
  },
]

export function HowItWorks() {
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

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mb-8 last:mb-0">
              <Card className="flex-1 hover:shadow-md transition-shadow">
                <CardContent className="flex items-center p-6">
                  <div
                    className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mr-6 flex-shrink-0`}
                  >
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
              {index < steps.length - 1 && <ArrowRight className="w-6 h-6 text-muted-foreground mx-4 flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
