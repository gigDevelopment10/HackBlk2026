"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Play,
  Square,
  RotateCcw,
  Terminal,
  CheckCircle2,
  Clock,
  Zap,
  MessageSquare
} from "lucide-react"

const sampleTask = "Research the top 5 competitors in the AI writing assistant space and create a comparison matrix with pricing, features, and target audience."

const simulationSteps = [
  { time: "0.0s", agent: "Advisory Intelligence Agent", action: "Received task", type: "input" },
  { time: "0.3s", agent: "Advisory Intelligence Agent", action: "Parsing strategic requirements...", type: "process" },
  { time: "0.8s", agent: "Advisory Intelligence Agent", action: "Identified research queries: 'AI writing assistants 2024', 'Jasper vs Copy.ai', 'Writesonic pricing'", type: "process" },
  { time: "1.2s", agent: "Advisory Intelligence Agent", action: "Executing market intelligence search...", type: "api" },
  { time: "2.1s", agent: "Advisory Intelligence Agent", action: "Found 47 relevant sources", type: "result" },
  { time: "2.4s", agent: "Advisory Intelligence Agent", action: "Aggregating competitor insights...", type: "process" },

  { time: "4.2s", agent: "Technology Data Agent", action: "Received handoff from Advisory Intelligence Agent", type: "handoff" },
  { time: "4.8s", agent: "Technology Data Agent", action: "Structuring competitor data into standardized schema...", type: "process" },
  { time: "5.6s", agent: "Technology Data Agent", action: "Generated comparison matrix (5 competitors × 8 features)", type: "result" },

  { time: "5.9s", agent: "Marketing Content Agent", action: "Received handoff from Technology Data Agent", type: "handoff" },
  { time: "6.2s", agent: "Marketing Content Agent", action: "Formatting insights into client-ready content...", type: "process" },
  { time: "6.8s", agent: "Marketing Content Agent", action: "Added executive summary, positioning, and messaging insights", type: "result" },

  { time: "7.1s", agent: "System", action: "Task completed successfully", type: "complete" },
];

export function SimulationPreview() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [taskInput, setTaskInput] = useState(sampleTask)
  const [visibleSteps, setVisibleSteps] = useState<typeof simulationSteps>([])

  useEffect(() => {
    if (isRunning && currentStep < simulationSteps.length) {
      const timer = setTimeout(() => {
        setVisibleSteps(prev => [...prev, simulationSteps[currentStep]])
        setCurrentStep(prev => prev + 1)
      }, 400)
      return () => clearTimeout(timer)
    } else if (currentStep >= simulationSteps.length) {
      setIsRunning(false)
    }
  }, [isRunning, currentStep])

  const handleRun = () => {
    setIsRunning(true)
    setCurrentStep(0)
    setVisibleSteps([])
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentStep(0)
    setVisibleSteps([])
  }

  const getStepColor = (type: string) => {
    switch (type) {
      case "input": return "text-blue-400"
      case "process": return "text-muted-foreground"
      case "api": return "text-orange-400"
      case "result": return "text-green-400"
      case "handoff": return "text-purple-400"
      case "complete": return "text-accent"
      default: return "text-muted-foreground"
    }
  }

  const getAgentColor = (agent: string) => {
    if (agent === "Advisory Intelligence Agent") return "text-blue-400"
    if (agent === "Technology Data Agent") return "text-green-400"
    if (agent === "Marketing Content Agent") return "text-pink-400"
    if (agent === "Engineering Code Review Agent") return "text-purple-400"
    if (agent === "Finance Analysis Agent") return "text-yellow-400"
    if (agent === "Client Support Agent") return "text-cyan-400"
    if (agent === "Legal Compliance Agent") return "text-red-400"
    if (agent === "Product Documentation Agent") return "text-orange-400"
    if (agent === "System") return "text-accent"

    return "text-muted-foreground"
  }

  return (
    <section id="simulate" className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Simulation Preview</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Test your agent configuration before deployment. See exactly how your team will handle tasks.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Task Input */}
          <div className="mb-6 rounded-xl border border-border bg-card p-6">
            <label className="mb-2 block text-sm font-medium text-foreground">Test Task</label>
            <div className="flex gap-3">
              <textarea
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Describe a task for your AI team..."
                className="min-h-20 flex-1 resize-none rounded-lg border border-border bg-secondary/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              {!isRunning ? (
                <Button onClick={handleRun} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Play className="mr-2 h-4 w-4" />
                  Run Simulation
                </Button>
              ) : (
                <Button onClick={handleStop} variant="destructive">
                  <Square className="mr-2 h-4 w-4" />
                  Stop
                </Button>
              )}
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>

              {visibleSteps.length > 0 && (
                <div className="ml-auto flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{visibleSteps[visibleSteps.length - 1]?.time || "0.0s"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-4 w-4" />
                    <span>{visibleSteps.length} steps</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Terminal Output */}
          <div className="rounded-xl border border-border bg-[#0a0a0a] overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border bg-card/50 px-4 py-3">
              <Terminal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Execution Log</span>
              {isRunning && (
                <span className="ml-auto flex items-center gap-1.5 text-xs text-accent">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                  Running
                </span>
              )}
              {!isRunning && visibleSteps.length === simulationSteps.length && (
                <span className="ml-auto flex items-center gap-1.5 text-xs text-green-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Complete
                </span>
              )}
            </div>

            <div className="h-80 overflow-y-auto p-4 font-mono text-sm">
              {visibleSteps.length === 0 ? (
                <p className="text-muted-foreground">Click &quot;Run Simulation&quot; to see your agents in action...</p>
              ) : (
                <div className="space-y-1.5">
                  {visibleSteps.map((step, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="shrink-0 text-muted-foreground/60">[{step.time}]</span>
                      <span className={`shrink-0 ${getAgentColor(step.agent)}`}>{step.agent}:</span>
                      <span className={getStepColor(step.type)}>{step.action}</span>
                    </div>
                  ))}
                  {isRunning && (
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 animate-pulse rounded-full bg-accent" />
                      <span className="text-muted-foreground">Processing...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Results Preview */}
          {!isRunning && visibleSteps.length === simulationSteps.length && (
            <div className="mt-6 rounded-xl border border-accent/50 bg-accent/5 p-6">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-foreground">Simulation Complete</h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-card p-4">
                  <p className="text-2xl font-bold text-foreground">7.1s</p>
                  <p className="text-sm text-muted-foreground">Total execution time</p>
                </div>
                <div className="rounded-lg bg-card p-4">
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Agents involved</p>
                </div>
                <div className="rounded-lg bg-card p-4">
                  <p className="text-2xl font-bold text-foreground">$0.12</p>
                  <p className="text-sm text-muted-foreground">Estimated cost</p>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View Full Output
                </Button>
                <Button variant="outline">Deploy This Configuration</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
