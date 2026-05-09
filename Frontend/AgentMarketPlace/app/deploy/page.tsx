'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { DeploymentCheckout } from '@/components/deployment-checkout'

export default function DeployPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground">Deploy Agent</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Choose your deployment method and get started with your AI team
          </p>
        </div>
        <DeploymentCheckout />
      </div>
      <Footer />
    </main>
  )
}
