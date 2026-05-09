'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AgentGrid } from '@/components/agent-grid'

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground">Agent Marketplace</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Browse and select from our collection of specialized AI agents
          </p>
        </div>
        <AgentGrid />
      </div>
      <Footer />
    </main>
  )
}
