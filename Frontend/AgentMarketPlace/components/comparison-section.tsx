import { ArrowRight } from "lucide-react"

const comparisons = [
  {
    before: "One AI responding at a time",
    after: "A coordinated team working in parallel",
  },
  {
    before: "Manual prompts",
    after: "Role-based execution",
  },
  {
    before: "Fragile workflows",
    after: "Self-orchestrating systems",
  },
  {
    before: "You doing the thinking",
    after: "A team doing the thinking with you",
  },
]

export function ComparisonSection() {
  return (
    <section className="border-t border-border px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">From Tools → To Teams</p>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Other tools give you intelligence.
          </h2>
          <p className="mt-2 text-2xl font-bold text-accent md:text-3xl">
            We give you execution.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50 sm:flex-row sm:justify-between"
            >
              <div className="flex-1 text-center sm:text-left">
                <p className="text-muted-foreground line-through decoration-muted-foreground/50">{item.before}</p>
              </div>
              
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                <ArrowRight className="h-4 w-4 text-accent" />
              </div>
              
              <div className="flex-1 text-center sm:text-right">
                <p className="font-medium text-foreground">{item.after}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
