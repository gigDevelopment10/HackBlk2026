import { Rocket, Search, Compass, PenTool, BarChart3, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const teamMembers = [
  { icon: Search, role: "Market Researcher", color: "text-blue-400" },
  { icon: Compass, role: "Content Strategist", color: "text-emerald-400" },
  { icon: PenTool, role: "Copywriter", color: "text-amber-400" },
  { icon: BarChart3, role: "Analyst", color: "text-rose-400" },
  { icon: CheckCircle2, role: "Reviewer", color: "text-cyan-400" },
]

const deliverables = [
  "Market breakdown",
  "Positioning angles",
  "Content plan",
  "Refined messaging",
]

export function LaunchTeamSection() {
  return (
    <section id="teams" className="border-t border-border px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Pre-Built Teams</p>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Your first team, ready in seconds
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Team Card */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Rocket className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">The Launch Team</h3>
                <p className="text-sm text-muted-foreground">Perfect for validating ideas</p>
              </div>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3">
                  <member.icon className={`h-5 w-5 ${member.color}`} />
                  <span className="text-foreground">{member.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Example Card */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-8">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">Give it a goal:</p>
              <div className="mt-2 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3">
                <p className="font-medium text-foreground">&quot;Validate and launch my SaaS idea&quot;</p>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">Get back:</p>
              <div className="space-y-2">
                {deliverables.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10">
                      <CheckCircle2 className="h-3 w-3 text-accent" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-secondary p-4 text-center">
              <p className="text-sm text-muted-foreground">All without switching tools.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button size="lg" className="group bg-foreground px-8 text-background hover:bg-foreground/90">
            Explore all teams
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
