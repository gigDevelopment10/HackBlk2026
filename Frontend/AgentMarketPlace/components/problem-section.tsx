import { MessageSquare, Copy, Workflow, Eye } from "lucide-react"

const problems = [
  {
    icon: MessageSquare,
    text: "Writing prompts in ChatGPT",
  },
  {
    icon: Copy,
    text: "Copy-pasting into Notion",
  },
  {
    icon: Workflow,
    text: "Running automations in Zapier",
  },
  {
    icon: Eye,
    text: "Reviewing everything yourself",
  },
]

export function ProblemSection() {
  return (
    <section className="border-t border-border px-6 py-20 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">The Problem</p>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            What you&apos;re doing today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            It works. But it doesn&apos;t scale. And it definitely doesn&apos;t feel like a team.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <problem.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
              </div>
              <p className="text-foreground">{problem.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
