import { Button } from "@/components/ui/button"
import { ArrowRight, Users } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Subtle glow effect */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-accent/20 blur-[120px]" />
      
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
          <Users className="h-4 w-4 text-accent" />
          <span className="text-sm text-muted-foreground">Your company of agents, ready to hire</span>
        </div>

        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Stop stitching AI tools together.
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          Hire a team that just gets the work done. Researchers, writers, analysts, reviewers — working together, without you managing a single workflow.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="group bg-foreground px-8 text-background hover:bg-foreground/90">
            Hire your first team
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" className="border-border px-8 text-foreground hover:bg-secondary">
            Watch demo
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          No credit card required · Start in seconds
        </p>
      </div>
    </section>
  )
}
