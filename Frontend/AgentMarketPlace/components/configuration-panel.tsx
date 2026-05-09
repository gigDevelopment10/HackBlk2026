"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Sliders,
  Brain,
  Gauge,
  DollarSign,
  Sparkles,
  Shield,
  Info,
  RotateCcw
} from "lucide-react"

interface SliderConfig {
  id: string
  label: string
  description: string
  icon: typeof Brain
  min: number
  max: number
  step: number
  unit: string
  defaultValue: number
  color: string
}

const sliderConfigs: SliderConfig[] = [
  {
    id: "intelligence",
    label: "Intelligence Level",
    description: "Higher = more capable, more tokens",
    icon: Brain,
    min: 1,
    max: 10,
    step: 1,
    unit: "",
    defaultValue: 7,
    color: "bg-blue-500",
  },
  {
    id: "autonomy",
    label: "Autonomy",
    description: "How much the agent acts independently",
    icon: Sparkles,
    min: 0,
    max: 100,
    step: 10,
    unit: "%",
    defaultValue: 60,
    color: "bg-purple-500",
  },
  {
    id: "cost",
    label: "Cost Ceiling",
    description: "Maximum spend per task",
    icon: DollarSign,
    min: 1,
    max: 100,
    step: 1,
    unit: "$",
    defaultValue: 25,
    color: "bg-green-500",
  },
  {
    id: "speed",
    label: "Response Speed",
    description: "Faster = less thorough",
    icon: Gauge,
    min: 1,
    max: 5,
    step: 1,
    unit: "x",
    defaultValue: 3,
    color: "bg-orange-500",
  },
]

const personalityPresets = [
  { id: "professional", label: "Professional", description: "Formal, precise, business-focused" },
  { id: "friendly", label: "Friendly", description: "Warm, conversational, approachable" },
  { id: "concise", label: "Concise", description: "Brief, direct, no fluff" },
  { id: "detailed", label: "Detailed", description: "Thorough, comprehensive, in-depth" },
  { id: "creative", label: "Creative", description: "Innovative, out-of-box thinking" },
  { id: "custom", label: "Custom", description: "Define your own persona" },
]

const guardrails = [
  { id: "pii", label: "PII Protection", description: "Block personal data exposure", enabled: true },
  { id: "hallucination", label: "Hallucination Check", description: "Verify facts before output", enabled: true },
  { id: "budget", label: "Budget Alerts", description: "Notify on cost thresholds", enabled: false },
  { id: "approval", label: "Human Approval", description: "Require sign-off for actions", enabled: false },
]

export function ConfigurationPanel() {
  const [sliderValues, setSliderValues] = useState<Record<string, number>>(
    Object.fromEntries(sliderConfigs.map(c => [c.id, c.defaultValue]))
  )
  const [selectedPersonality, setSelectedPersonality] = useState("professional")
  const [enabledGuardrails, setEnabledGuardrails] = useState<string[]>(
    guardrails.filter(g => g.enabled).map(g => g.id)
  )

  const handleSliderChange = (id: string, value: number) => {
    setSliderValues(prev => ({ ...prev, [id]: value }))
  }

  const toggleGuardrail = (id: string) => {
    setEnabledGuardrails(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  const resetToDefaults = () => {
    setSliderValues(Object.fromEntries(sliderConfigs.map(c => [c.id, c.defaultValue])))
    setSelectedPersonality("professional")
    setEnabledGuardrails(guardrails.filter(g => g.enabled).map(g => g.id))
  }

  return (
    <section id="configure" className="border-t border-border bg-card/50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Configure Behavior</h2>
            <p className="max-w-2xl text-muted-foreground">
              Fine-tune intelligence, autonomy, cost limits, and personality traits
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={resetToDefaults}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Defaults
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Sliders Panel */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                  <Sliders className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Performance Tuning</h3>
                  <p className="text-xs text-muted-foreground">Adjust core agent parameters</p>
                </div>
              </div>

              <div className="space-y-8">
                {sliderConfigs.map((config) => {
                  const Icon = config.icon
                  const value = sliderValues[config.id]
                  const percentage = ((value - config.min) / (config.max - config.min)) * 100
                  
                  return (
                    <div key={config.id}>
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{config.label}</span>
                          <button className="group relative">
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background group-hover:block">
                              {config.description}
                            </span>
                          </button>
                        </div>
                        <span className="text-sm font-mono text-foreground">
                          {config.unit === "$" ? `$${value}` : `${value}${config.unit}`}
                        </span>
                      </div>
                      
                      <div className="relative">
                        <div className="h-2 rounded-full bg-secondary">
                          <div 
                            className={`h-2 rounded-full ${config.color} transition-all`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <input
                          type="range"
                          min={config.min}
                          max={config.max}
                          step={config.step}
                          value={value}
                          onChange={(e) => handleSliderChange(config.id, Number(e.target.value))}
                          className="absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:shadow-lg"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Personality & Guardrails */}
          <div className="space-y-6">
            {/* Personality Presets */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/20">
                  <Sparkles className="h-5 w-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Personality</h3>
                  <p className="text-xs text-muted-foreground">Define how your agent communicates</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {personalityPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPersonality(preset.id)}
                    className={`rounded-lg border p-3 text-left transition-all ${
                      selectedPersonality === preset.id
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <p className="text-sm font-medium text-foreground">{preset.label}</p>
                    <p className="text-xs text-muted-foreground">{preset.description}</p>
                  </button>
                ))}
              </div>

              {selectedPersonality === "custom" && (
                <textarea
                  placeholder="Describe how you want your agent to behave..."
                  className="mt-4 h-24 w-full resize-none rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              )}
            </div>

            {/* Guardrails */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20">
                  <Shield className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Guardrails</h3>
                  <p className="text-xs text-muted-foreground">Safety and compliance controls</p>
                </div>
              </div>

              <div className="space-y-3">
                {guardrails.map((guardrail) => (
                  <div
                    key={guardrail.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{guardrail.label}</p>
                      <p className="text-xs text-muted-foreground">{guardrail.description}</p>
                    </div>
                    <button
                      onClick={() => toggleGuardrail(guardrail.id)}
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        enabledGuardrails.includes(guardrail.id) ? "bg-accent" : "bg-secondary"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-foreground transition-transform ${
                          enabledGuardrails.includes(guardrail.id) ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
