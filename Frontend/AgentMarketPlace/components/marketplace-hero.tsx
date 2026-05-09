import { Button } from "@/components/ui/button"
import { Search, Zap, Bot } from "lucide-react"

export function MarketplaceHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-background to-background" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgb(255_255_255_/_0.02)_1px,_transparent_1px),_linear-gradient(to_bottom,_rgb(255_255_255_/_0.02)_1px,_transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5">
            <Bot className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">AI Agent Marketplace</span>
          </div>

          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            Hire AI agents.
            <br />
            <span className="text-muted-foreground">Build your team.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Browse specialized AI agents, feed them your knowledge, configure their behavior, 
            and deploy production-ready teams in minutes.
          </p>

          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search agents by role, capability, or use case..."
                className="h-14 w-full rounded-xl border border-border bg-card pl-12 pr-32 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-accent-foreground hover:bg-accent/90">
                <Zap className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {[
                "Advisory",
                "Marketing",
                "Technology",
                "Engineering",
                "Client Experience",
                "Finance",
                "Legal",
                "Product"
              ].map((tag) => (
                <button
                  key={tag}
                  className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                >
                  {tag}
                </button>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
