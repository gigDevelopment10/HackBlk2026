'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SkillFeeder } from '@/components/skill-feeder'

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground">Skill Feeder</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Upload and manage knowledge sources, APIs, and skills for your agents
          </p>
        </div>
        <SkillFeeder />
      </div>
      <Footer />
    </main>
  )
}
