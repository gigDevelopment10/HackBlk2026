"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Layers, 
  Wrench, 
  Brain,
  Plus,
  X,
  GripVertical,
  Zap,
  Clock,
  Database
} from "lucide-react"

const skillCategories = [
  { id: "core", label: "Core Skills", items: ["Web Research", "Document Analysis", "Data Extraction", "Summarization"] },
  { id: "specialized", label: "Specialized", items: ["Financial Modeling", "Legal Review", "Code Analysis", "SEO Optimization"] },
  { id: "output", label: "Output Formats", items: ["Markdown Reports", "JSON Structured", "CSV Export", "PDF Generation"] },
]

const tools = [
  { id: "serpapi", name: "SerpAPI", description: "Google search results", icon: "🔍" },
  { id: "browserless", name: "Browserless", description: "Web scraping", icon: "🌐" },
  { id: "openai", name: "OpenAI", description: "LLM provider", icon: "🤖" },
  { id: "pinecone", name: "Pinecone", description: "Vector database", icon: "📌" },
  { id: "slack", name: "Slack", description: "Notifications", icon: "💬" },
  { id: "notion", name: "Notion", description: "Documentation", icon: "📝" },
]

const memoryLayers = [
  { id: "short", name: "Short-term", description: "Session context (24h)", icon: Clock },
  { id: "long", name: "Long-term", description: "Persistent memory", icon: Database },
  { id: "shared", name: "Shared Memory", description: "Cross-agent access", icon: Brain },
]

export function PackBuilder() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["Web Research", "Summarization", "Markdown Reports"])
  const [selectedTools, setSelectedTools] = useState<string[]>(["serpapi", "openai"])
  const [selectedMemory, setSelectedMemory] = useState<string[]>(["short", "long"])

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const toggleTool = (toolId: string) => {
    setSelectedTools(prev => 
      prev.includes(toolId) ? prev.filter(t => t !== toolId) : [...prev, toolId]
    )
  }

  const toggleMemory = (memoryId: string) => {
    setSelectedMemory(prev => 
      prev.includes(memoryId) ? prev.filter(m => m !== memoryId) : [...prev, memoryId]
    )
  }

  return (
    <section id="packs" className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Build Your Agent Pack</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Assemble skills, connect tools, and configure memory for your AI team
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Skills Panel */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                <Layers className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Skills</h3>
                <p className="text-xs text-muted-foreground">{selectedSkills.length} selected</p>
              </div>
            </div>

            <div className="space-y-4">
              {skillCategories.map((category) => (
                <div key={category.id}>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {category.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`rounded-full border px-3 py-1 text-sm transition-all ${
                          selectedSkills.includes(skill)
                            ? "border-accent bg-accent/20 text-foreground"
                            : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Panel */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
                <Wrench className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Tools & APIs</h3>
                <p className="text-xs text-muted-foreground">{selectedTools.length} connected</p>
              </div>
            </div>

            <div className="space-y-2">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => toggleTool(tool.id)}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                    selectedTools.includes(tool.id)
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <span className="text-lg">{tool.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                  {selectedTools.includes(tool.id) && (
                    <Zap className="h-4 w-4 text-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Memory Panel */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                <Brain className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Memory Layers</h3>
                <p className="text-xs text-muted-foreground">{selectedMemory.length} active</p>
              </div>
            </div>

            <div className="space-y-3">
              {memoryLayers.map((layer) => {
                const Icon = layer.icon
                return (
                  <button
                    key={layer.id}
                    onClick={() => toggleMemory(layer.id)}
                    className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                      selectedMemory.includes(layer.id)
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      selectedMemory.includes(layer.id) ? "bg-accent/20" : "bg-secondary"
                    }`}>
                      <Icon className={`h-5 w-5 ${selectedMemory.includes(layer.id) ? "text-accent" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{layer.name}</p>
                      <p className="text-xs text-muted-foreground">{layer.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-6 rounded-lg border border-dashed border-border bg-secondary/30 p-4 text-center">
              <p className="mb-2 text-sm text-muted-foreground">Need custom memory?</p>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Custom Layer
              </Button>
            </div>
          </div>
        </div>

        {/* Pack Summary */}
        <div className="mt-8 rounded-xl border border-accent/50 bg-accent/5 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="mb-1 font-semibold text-foreground">Your Pack Configuration</h3>
              <p className="text-sm text-muted-foreground">
                {selectedSkills.length} skills • {selectedTools.length} tools • {selectedMemory.length} memory layers
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Save as Template</Button>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Continue to Configure
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
