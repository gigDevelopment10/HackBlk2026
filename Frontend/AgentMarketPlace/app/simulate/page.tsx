'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SimulationPreview } from '@/components/simulation-preview'

export default function SimulatePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground">Simulation Preview</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Test and preview your agent&apos;s behavior before deployment
          </p>
        </div>
        <SimulationPreview />
      </div>
      <Footer />
    </main>
  )
}
