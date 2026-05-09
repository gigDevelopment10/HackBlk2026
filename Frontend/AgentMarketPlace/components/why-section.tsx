import { MessageSquare, Workflow, Users } from "lucide-react"

const comparisons = [
  {
    icon: MessageSquare,
    tool: "ChatGPT",
    does: "gives answers",
    but: "You still manage the process",
  },
  {
    icon: Workflow,
    tool: "Automation tools",
    does: "run steps",
    but: "You still design the system",
  },
  {
    icon: Users,
    tool: "Invoke Thoughts",
    does: "runs the team",
    but: "You get outcomes",
    highlight: true,
  },
]

const audiences = [
  "Building solo or in a small team",
  "Shipping ideas weekly",
  "Already using AI but hitting limits",
]

export function WhySection() {
  return (
    <section className="border-t border-border px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Why This Wins */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Why This Wins</p>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            And your current stack doesn&apos;t
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl border p-6 transition-all ${
                item.highlight
                  ? "border-accent bg-accent/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <item.icon className={`h-6 w-6 ${item.highlight ? "text-accent" : "text-muted-foreground"}`} />
              </div>
              <h3 className="font-semibold text-foreground">{item.tool}</h3>
              <p className="mt-1 text-muted-foreground">
                {item.does}
              </p>
              <div className="mt-4 border-t border-border pt-4">
                <p className={`text-sm ${item.highlight ? "font-medium text-accent" : "text-muted-foreground"}`}>
                  → {item.but}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Built For */}
        <div className="mt-20 rounded-2xl border border-border bg-card p-8 md:p-12">
          <div className="text-center md:text-left md:flex md:items-start md:justify-between md:gap-12">
            <div className="md:max-w-sm">
              <h3 className="text-2xl font-bold text-foreground">Built for people who move fast</h3>
              <p className="mt-2 text-muted-foreground">
                Don&apos;t learn another tool. Replace the work.
              </p>
            </div>
            
            <div className="mt-8 md:mt-0 space-y-4">
              {audiences.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-background text-sm font-medium">
                    ✓
                  </div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
