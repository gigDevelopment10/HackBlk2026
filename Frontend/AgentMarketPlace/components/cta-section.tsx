import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="border-t border-border px-6 py-20 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <div className="relative">
          {/* Glow effect */}
          <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-full w-full rounded-full bg-accent/20 blur-[100px]" />
          
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm text-accent">Ready to start</span>
          </div>

          <h2 className="text-balance text-3xl font-bold text-foreground md:text-5xl">
            You already know what needs to be done.
          </h2>
          
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            You just don&apos;t have the time to do all of it. Now you don&apos;t have to.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group bg-foreground px-8 text-background hover:bg-foreground/90">
              Hire your first AI team
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Your company of agents, ready to work.
          </p>
        </div>
      </div>
    </section>
  )
}
