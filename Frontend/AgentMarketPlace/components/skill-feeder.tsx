"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Globe, 
  FileText, 
  Upload, 
  Database, 
  Link2, 
  CheckCircle2,
  Loader2,
  Plus,
  X
} from "lucide-react"

const feedMethods = [
  {
    id: "web",
    label: "Web Scraping",
    description: "Extract knowledge from any public URL",
    icon: Globe,
    placeholder: "https://docs.example.com/api-reference",
  },
  {
    id: "docs",
    label: "Documentation",
    description: "Parse technical docs, wikis, and guides",
    icon: FileText,
    placeholder: "https://github.com/org/repo/wiki",
  },
  {
    id: "upload",
    label: "File Upload",
    description: "Upload PDFs, markdown, or text files",
    icon: Upload,
    placeholder: "Drag and drop files here",
  },
  {
    id: "knowledge",
    label: "Knowledge Base",
    description: "Connect existing knowledge bases",
    icon: Database,
    placeholder: "Select integration...",
  },
]

const mockSources = [
  { id: 1, name: "Company Wiki", type: "web", status: "indexed", pages: 142 },
  { id: 2, name: "Product Documentation", type: "docs", status: "indexed", pages: 89 },
  { id: 3, name: "API Reference v2.1.pdf", type: "upload", status: "processing", pages: 34 },
]

export function SkillFeeder() {
  const [activeMethod, setActiveMethod] = useState("web")
  const [inputValue, setInputValue] = useState("")
  const [sources, setSources] = useState(mockSources)
  const [isProcessing, setIsProcessing] = useState(false)

  const activeMethodData = feedMethods.find(m => m.id === activeMethod)

  const handleAddSource = () => {
    if (!inputValue.trim()) return
    setIsProcessing(true)
    
    // Simulate processing
    setTimeout(() => {
      setSources(prev => [...prev, {
        id: Date.now(),
        name: inputValue,
        type: activeMethod,
        status: "indexed",
        pages: Math.floor(Math.random() * 100) + 10
      }])
      setInputValue("")
      setIsProcessing(false)
    }, 1500)
  }

  const removeSource = (id: number) => {
    setSources(prev => prev.filter(s => s.id !== id))
  }

  return (
    <section id="skills" className="border-t border-border bg-card/50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Feed Your Agent Skills</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Transform any knowledge source into agent capabilities. Your agents learn from your data.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Method Tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            {feedMethods.map((method) => {
              const Icon = method.icon
              return (
                <button
                  key={method.id}
                  onClick={() => setActiveMethod(method.id)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-all ${
                    activeMethod === method.id
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-accent/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {method.label}
                </button>
              )
            })}
          </div>

          {/* Input Area */}
          <div className="mb-8 rounded-xl border border-border bg-card p-6">
            <div className="mb-4">
              <h3 className="mb-1 font-medium text-foreground">{activeMethodData?.label}</h3>
              <p className="text-sm text-muted-foreground">{activeMethodData?.description}</p>
            </div>

            {activeMethod === "upload" ? (
              <div className="flex min-h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30 p-8 transition-colors hover:border-accent/50">
                <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">Drag and drop files here</p>
                <Button variant="outline" size="sm">
                  Browse Files
                </Button>
              </div>
            ) : activeMethod === "knowledge" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {["Notion", "Confluence", "Google Drive", "Dropbox"].map((service) => (
                  <button
                    key={service}
                    className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-4 text-left transition-colors hover:border-accent/50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <Link2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{service}</p>
                      <p className="text-xs text-muted-foreground">Connect account</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={activeMethodData?.placeholder}
                  className="flex-1 rounded-lg border border-border bg-secondary/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <Button 
                  onClick={handleAddSource}
                  disabled={isProcessing || !inputValue.trim()}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Indexed Sources */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-foreground">Indexed Sources</h3>
            <div className="space-y-2">
              {sources.map((source) => (
                <div
                  key={source.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex items-center gap-3">
                    {source.status === "indexed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Loader2 className="h-5 w-5 animate-spin text-accent" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">{source.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {source.pages} pages • {source.type}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeSource(source.id)}
                    className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
