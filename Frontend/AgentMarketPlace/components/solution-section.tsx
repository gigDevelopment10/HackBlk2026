import { Target, Users, Zap, CheckCircle, Send } from "lucide-react"

const steps = [
  {
    icon: Target,
    title: "Break down your objective",
    description: "Your team analyzes the goal and creates an execution plan",
  },
  {
    icon: Users,
    title: "Assign roles automatically",
    description: "Each agent takes responsibility for their expertise area",
  },
  {
    icon: Zap,
    title: "Execute tasks in parallel",
    description: "Work happens simultaneously, not sequentially",
  },
  {
    icon: CheckCircle,
    title: "Review and refine outputs",
    description: "Built-in quality control ensures polished results",
  },
  {
    icon: Send,
    title: "Deliver finished work",
    description: "You get outcomes, not drafts to review",
  },
]

export function SolutionSection() {
  return (
    <section id="how-it-works" className="border-t border-border px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">The Solution</p>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            What this feels like instead
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            You &quot;hire&quot; a team. No prompting gymnastics. No duct-taped workflows. No babysitting.
          </p>
        </div>

        <div className="mt-16 relative">
          {/* Connection line */}
          <div className="absolute left-8 top-10 bottom-10 w-px bg-border hidden md:block lg:left-1/2 lg:-translate-x-1/2" />
          
          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-1 md:gap-8 lg:gap-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-6 lg:items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right lg:pr-16" : "lg:text-left lg:pl-16"}`}>
                  <div className={`rounded-xl border border-border bg-card p-6 ${
                    index % 2 === 0 ? "lg:ml-auto" : "lg:mr-auto"
                  } lg:max-w-md`}>
                    <div className={`mb-3 flex items-center gap-3 ${index % 2 === 0 ? "lg:justify-end" : ""}`}>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                        <step.icon className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="font-semibold text-foreground lg:hidden">{step.title}</h3>
                    </div>
                    <h3 className="hidden font-semibold text-foreground lg:block mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                
                {/* Center dot for desktop */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 h-4 w-4 items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-accent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
