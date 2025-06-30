import { WorkspaceHeader } from "@/components/workspace/workspace-header"
import { LandCanvas } from "@/components/workspace/land-canvas"
import { SimulationPanel } from "@/components/workspace/simulation-panel"
import { SimulationProvider } from "@/components/workspace/simulation-context"

export default function WorkspacePage() {
  return (
    <SimulationProvider>
      <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <WorkspaceHeader />

        <div className="flex-1 flex overflow-hidden">
          {/* Main Canvas */}
          <div className="flex-1 relative">
            <LandCanvas />
          </div>

          {/* Simulation Panel */}
          <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
            <SimulationPanel />
          </div>
        </div>
      </div>
    </SimulationProvider>
  )
}
