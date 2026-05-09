"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Rocket,
  Code,
  Webhook,
  Key,
  Copy,
  Check,
  ExternalLink,
  Zap,
  Shield,
  Clock
} from "lucide-react"

const deploymentOptions = [
  {
    id: "api",
    label: "REST API",
    description: "Direct API access with full control",
    icon: Code,
    features: ["Full request/response control", "Async webhooks", "Batch processing"],
  },
  {
    id: "sdk",
    label: "SDK Integration",
    description: "Native libraries for popular languages",
    icon: Zap,
    features: ["TypeScript/JavaScript", "Python", "Go"],
  },
  {
    id: "webhook",
    label: "Webhook Trigger",
    description: "Event-driven automation",
    icon: Webhook,
    features: ["Slack integration", "Zapier compatible", "Custom endpoints"],
  },
]

const codeSnippet = `import { InvokeThoughts } from '@invoke/sdk'

const client = new InvokeThoughts({
  apiKey: process.env.INVOKE_API_KEY
})

const result = await client.teams.run({
  team: 'research-pack-v1',
  task: 'Analyze competitor pricing strategies',
  config: {
    intelligence: 7,
    autonomy: 60,
    costCeiling: 25
  }
})

console.log(result.output)`

export function DeploymentCheckout() {
  const [selectedOption, setSelectedOption] = useState("sdk")
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="deploy" className="border-t border-border bg-card/50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Deploy Your Team</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Choose how to integrate your AI team into your workflow
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Deployment Options */}
            <div className="space-y-4">
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Integration Method
              </h3>

              {deploymentOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedOption(option.id)}
                    className={`flex w-full items-start gap-4 rounded-xl border p-5 text-left transition-all ${selectedOption === option.id
                        ? "border-accent bg-accent/10"
                        : "border-border bg-card hover:border-accent/50"
                      }`}
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${selectedOption === option.id ? "bg-accent/20" : "bg-secondary"
                      }`}>
                      <Icon className={`h-6 w-6 ${selectedOption === option.id ? "text-accent" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 font-semibold text-foreground">{option.label}</p>
                      <p className="mb-3 text-sm text-muted-foreground">{option.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {option.features.map((feature) => (
                          <span
                            key={feature}
                            className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                )
              })}

              {/* API Key */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">API Key</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value="ivk_live_a1b2c3d4e5f6g7h8i9j0"
                    readOnly
                    className="flex-1 rounded-lg border border-border bg-secondary/30 px-3 py-2 font-mono text-sm text-muted-foreground"
                  />
                  <Button variant="outline" size="sm">
                    Reveal
                  </Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Keep this secret. Rotate regularly in production.
                </p>
              </div>
            </div>

            {/* Code Preview */}
            <div>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Quick Start
              </h3>

              <div className="rounded-xl border border-border bg-[#0a0a0a] overflow-hidden">
                <div className="flex items-center justify-between border-b border-border bg-card/50 px-4 py-2">
                  <span className="text-xs text-muted-foreground">TypeScript</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto p-4 text-sm">
                  <code className="text-muted-foreground">
                    {codeSnippet.split('\n').map((line, i) => (
                      <div key={i} className="leading-relaxed">
                        {line.includes('import') && (
                          <span>
                            <span className="text-purple-400">import</span>
                            <span className="text-white"> {'{'} InvokeThoughts {'}'} </span>
                            <span className="text-purple-400">from</span>
                            <span className="text-green-400"> &apos;@invoke/sdk&apos;</span>
                          </span>
                        )}
                        {line.includes('const client') && (
                          <span>
                            <span className="text-purple-400">const</span>
                            <span className="text-white"> client = </span>
                            <span className="text-purple-400">new</span>
                            <span className="text-blue-400"> InvokeThoughts</span>
                            <span className="text-white">({'{'}</span>
                          </span>
                        )}
                        {line.includes('apiKey:') && (
                          <span className="text-white">  apiKey: process.env.<span className="text-orange-400">INVOKE_API_KEY</span></span>
                        )}
                        {line === '})' && <span className="text-white">{'}'})</span>}
                        {line === '' && <br />}
                        {line.includes('const result') && (
                          <span>
                            <span className="text-purple-400">const</span>
                            <span className="text-white"> result = </span>
                            <span className="text-purple-400">await</span>
                            <span className="text-white"> client.teams.</span>
                            <span className="text-blue-400">run</span>
                            <span className="text-white">({'{'}</span>
                          </span>
                        )}
                        {line.includes("team:") && (
                          <span className="text-white">  team: <span className="text-green-400">&apos;research-pack-v1&apos;</span>,</span>
                        )}
                        {line.includes("task:") && (
                          <span className="text-white">  task: <span className="text-green-400">&apos;Analyze competitor pricing strategies&apos;</span>,</span>
                        )}
                        {line.includes("config:") && <span className="text-white">  config: {'{'}</span>}
                        {line.includes("intelligence:") && <span className="text-white">    intelligence: <span className="text-orange-400">7</span>,</span>}
                        {line.includes("autonomy:") && <span className="text-white">    autonomy: <span className="text-orange-400">60</span>,</span>}
                        {line.includes("costCeiling:") && <span className="text-white">    costCeiling: <span className="text-orange-400">25</span></span>}
                        {line === '  }' && <span className="text-white">  {'}'}</span>}
                        {line === '})' && <span className="text-white">{'}'})</span>}
                        {line.includes('console.log') && (
                          <span>
                            <span className="text-white">console.</span>
                            <span className="text-blue-400">log</span>
                            <span className="text-white">(result.output)</span>
                          </span>
                        )}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>

              <div className="mt-4 flex gap-3">
                <Button variant="outline" className="flex-1">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Full Docs
                </Button>
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="mt-12 rounded-xl border border-accent/50 bg-accent/5 p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Ready to Deploy</h3>
                <p className="text-muted-foreground">Your team is configured and tested. Deploy now to start automating.</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-4 w-4" />
                    <span>SOC 2 compliant</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>99.9% uptime</span>
                  </div>
                </div>

                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Rocket className="mr-2 h-5 w-5" />
                  Deploy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
