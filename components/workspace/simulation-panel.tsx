import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, TrendingUp, Droplets, Leaf, Bug, BarChart3, Eye, Download } from "lucide-react"

export function SimulationPanel() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Regen Simulator</h2>
        <p className="text-sm text-muted-foreground">
          Time-based forecasting engine powered by real environmental data
        </p>
      </div>

      {/* Time Controls */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Time Slider
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>2025</span>
              <span className="font-medium">2030</span>
              <span>2045</span>
            </div>
            <Slider defaultValue={[2030]} min={2025} max={2045} step={1} />
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <Eye className="w-4 h-4 mr-1" />
                Split View
              </Button>
              <Button size="sm" className="flex-1">
                Play Animation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simulation Metrics */}
      <Tabs defaultValue="environmental" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
          <TabsTrigger value="economic">Economic</TabsTrigger>
        </TabsList>

        <TabsContent value="environmental" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-500" />
                Soil Carbon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current: 2.1%</span>
                  <span className="text-green-600">+0.8% projected</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Bug className="w-4 h-4 text-blue-500" />
                Biodiversity Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Species Count: 45</span>
                  <span className="text-green-600">+23 projected</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                Water Retention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Infiltration Rate</span>
                  <span className="text-green-600">+40% improvement</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="economic" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Yield Projection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Year 1: $2,400/acre</span>
                  <span>Year 5: $4,800/acre</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-500" />
                Input Reduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Fertilizer</span>
                  <Badge variant="secondary">-60%</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pesticides</span>
                  <Badge variant="secondary">-85%</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Water</span>
                  <Badge variant="secondary">-30%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button className="w-full bg-transparent" variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Generate Action Plan
        </Button>

        <Button className="w-full bg-transparent" variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          View EarthMirror
        </Button>

        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <h4 className="font-medium text-sm mb-2">Ready to Deploy?</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Generate your complete implementation kit with supply lists and grant proposals.
            </p>
            <Button size="sm" className="w-full">
              Create Deployment Kit
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
