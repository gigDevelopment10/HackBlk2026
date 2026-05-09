"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Search,
  FileText,
  Code,
  LineChart,
  MessageSquare,
  Pencil,
  Database,
  Shield,
  Star,
  Plus,
  Filter
} from "lucide-react"

/* ------------------ DOMAINS ------------------ */
const categories = [
  { id: "all", label: "All Domains", icon: Filter },
  { id: "advisory", label: "Advisory", icon: Search },
  { id: "engineering", label: "Engineering", icon: Code },
  { id: "technology", label: "Technology", icon: Database },
  { id: "finance", label: "Finance", icon: LineChart },
  { id: "client-experience", label: "Client Experience", icon: MessageSquare },
  { id: "legal", label: "Legal", icon: Shield },
  { id: "marketing", label: "Marketing", icon: Pencil },
  { id: "product", label: "Product", icon: FileText },
]

/* ------------------ GRADIENTS ------------------ */
const categoryGradients: Record<string, string> = {
  advisory: "from-blue-500 to-indigo-600",
  marketing: "from-pink-500 to-rose-500",
  technology: "from-emerald-400 to-green-600",
  engineering: "from-gray-700 to-gray-900",
  finance: "from-yellow-400 to-orange-500",
  "client-experience": "from-cyan-400 to-blue-500",
  legal: "from-red-500 to-rose-600",
  product: "from-purple-500 to-indigo-500",
}

/* ------------------ AGENTS ------------------ */
const agents = [
  {
    id: 1,
    name: "Advisory Intelligence Agent",
    category: "advisory",
    description: "Strategic insights, market research, and decision-support analysis.",
    rating: 4.9,
    deployments: "12.4k",
    icon: Search,
  },
  {
    id: 2,
    name: "Marketing Content Agent",
    category: "marketing",
    description: "SEO content creation and campaign messaging.",
    rating: 4.8,
    deployments: "9.2k",
    icon: Pencil,
  },
  {
    id: 3,
    name: "Technology Data Agent",
    category: "technology",
    description: "Data pipelines and scalable processing systems.",
    rating: 4.9,
    deployments: "15.1k",
    icon: Database,
  },
  {
    id: 4,
    name: "Engineering Code Review Agent",
    category: "engineering",
    description: "Code quality checks and security review.",
    rating: 4.7,
    deployments: "8.3k",
    icon: Code,
  },
  {
    id: 5,
    name: "Finance Analysis Agent",
    category: "finance",
    description: "Financial modeling and reporting automation.",
    rating: 4.8,
    deployments: "6.7k",
    icon: LineChart,
  },
  {
    id: 6,
    name: "Client Support Agent",
    category: "client-experience",
    description: "Customer interaction and support workflows.",
    rating: 4.6,
    deployments: "21.8k",
    icon: MessageSquare,
  },
  {
    id: 7,
    name: "Legal Compliance Agent",
    category: "legal",
    description: "Contract analysis and regulatory checks.",
    rating: 4.9,
    deployments: "4.2k",
    icon: Shield,
  },
  {
    id: 8,
    name: "Product Documentation Agent",
    category: "product",
    description: "Technical documentation and product guides.",
    rating: 4.7,
    deployments: "7.5k",
    icon: FileText,
  }
]

/* ------------------ HELPERS ------------------ */
const getCategoryLabel = (id: string) =>
  categories.find(c => c.id === id)?.label || id

/* ------------------ COMPONENT ------------------ */
export function AgentGrid() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedAgents, setSelectedAgents] = useState<number[]>([])

  const filteredAgents =
    activeCategory === "all"
      ? agents
      : agents.filter(a => a.category === activeCategory)

  const toggleAgent = (id: number) => {
    setSelectedAgents(prev =>
      prev.includes(id)
        ? prev.filter(a => a !== id)
        : [...prev, id]
    )
  }

  return (
    <section className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold">Agent Marketplace</h2>
            <p className="text-muted-foreground">
              Browse and select AI agents
            </p>
          </div>

          {selectedAgents.length > 0 && (
            <div className="flex gap-3 items-center">
              <span>{selectedAgents.length} selected</span>
              <Button>Add to Pack</Button>
            </div>
          )}
        </div>

        <div className="flex gap-8 items-start">

          {/* Sidebar */}
          <aside className="w-56 shrink-0 flex flex-col gap-2">
            {categories.map(cat => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                    activeCategory === cat.id
                      ? "bg-accent text-white"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.label}
                </button>
              )
            })}
          </aside>

          {/* Content */}
          <div className="flex-1">

            {/* SINGLE CARD VIEW */}
            {filteredAgents.length === 1 ? (
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  <AgentCard
                    agent={filteredAgents[0]}
                    selected={selectedAgents}
                    toggle={toggleAgent}
                  />
                </div>
              </div>
            ) : (
              /* GRID VIEW */
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredAgents.map(agent => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    selected={selectedAgents}
                    toggle={toggleAgent}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

/* ------------------ CARD ------------------ */
function AgentCard({ agent, selected, toggle }: any) {
  const Icon = agent.icon
  const isSelected = selected.includes(agent.id)

  const gradient =
    categoryGradients[agent.category] ||
    "from-gray-400 to-gray-600"

  return (
    <div
      className={`relative w-full h-[300px] rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition ${
        isSelected ? "ring-4 ring-white" : ""
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />

      <div className="relative p-6 flex flex-col h-full text-white">

        {/* Top */}
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs bg-white/20 px-2 py-1 rounded">
            {getCategoryLabel(agent.category)}
          </span>

          <button
            onClick={() => toggle(agent.id)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20"
          >
            <Plus className={`h-4 w-4 ${isSelected ? "rotate-45" : ""}`} />
          </button>
        </div>

        {/* Middle */}
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2">{agent.name}</h3>
          <p className="text-sm opacity-90 line-clamp-3">
            {agent.description}
          </p>
        </div>

        {/* Bottom */}
        <div className="flex justify-between text-sm mt-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-white" />
            {agent.rating}
          </div>
          <span className="text-xs opacity-80">
            {agent.deployments}
          </span>
        </div>

      </div>
    </div>
  )
}