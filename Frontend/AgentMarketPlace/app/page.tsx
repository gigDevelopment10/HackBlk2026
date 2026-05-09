import { Header } from "@/components/header"
import { MarketplaceHero } from "@/components/marketplace-hero"
import { AgentGrid } from "@/components/agent-grid"
import { SkillFeeder } from "@/components/skill-feeder"
import { PackBuilder } from "@/components/pack-builder"
import { ConfigurationPanel } from "@/components/configuration-panel"
import { SimulationPreview } from "@/components/simulation-preview"
import { DeploymentCheckout } from "@/components/deployment-checkout"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <MarketplaceHero />
      <AgentGrid />
      <SkillFeeder />
      <PackBuilder />
      <ConfigurationPanel />
      <SimulationPreview />
      <DeploymentCheckout />
      <Footer />
    </main>
  )
}
