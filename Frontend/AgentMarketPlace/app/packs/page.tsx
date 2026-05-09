'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PackBuilder } from '@/components/pack-builder'

export default function PacksPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground">Pack Builder</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Assemble agents, skills, and tools into cohesive AI teams
          </p>
        </div>
        <PackBuilder />
      </div>
      <Footer />
    </main>
  )
}
