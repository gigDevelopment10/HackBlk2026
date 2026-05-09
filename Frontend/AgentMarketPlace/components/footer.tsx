import Link from "next/link"
import { Sparkles } from "lucide-react"

const footerLinks = {
  Platform: [
    { label: "Agent Marketplace", href: "#agents" },
    { label: "Skill Feeder", href: "#skills" },
    { label: "Pack Builder", href: "#packs" },
    { label: "Configuration", href: "#configure" },
  ],
  Developers: [
    { label: "Documentation", href: "#docs" },
    { label: "API Reference", href: "#api" },
    { label: "SDK Libraries", href: "#sdk" },
    { label: "Webhooks", href: "#webhooks" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-6 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <Sparkles className="h-4 w-4 text-accent-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">Invoke Thoughts</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              The AI agent marketplace. Browse, configure, and deploy production-ready AI teams.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-medium text-foreground">{category}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Invoke Thoughts. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            This isn&apos;t automation. This is delegation — at the speed of AI.
          </p>
        </div>
      </div>
    </footer>
  )
}
