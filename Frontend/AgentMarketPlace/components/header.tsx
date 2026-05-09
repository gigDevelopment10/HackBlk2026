"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">Invoke Thoughts</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/agents" className="text-sm text-gray-600 transition-colors hover:text-gray-900 font-medium">
            Agents
          </Link>
          <Link href="/skills" className="text-sm text-gray-600 transition-colors hover:text-gray-900 font-medium">
            Skills
          </Link>
          <Link href="/packs" className="text-sm text-gray-600 transition-colors hover:text-gray-900 font-medium">
            Packs
          </Link>
          <Link href="/configure" className="text-sm text-gray-600 transition-colors hover:text-gray-900 font-medium">
            Configure
          </Link>
          <Link href="/simulate" className="text-sm text-gray-600 transition-colors hover:text-gray-900 font-medium">
            Simulate
          </Link>
          <Link href="/deploy" className="text-sm text-gray-600 transition-colors hover:text-gray-900 font-medium">
            Deploy
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            Sign in
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/20">
            Get Started
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 text-gray-900" />
          ) : (
            <Menu className="h-5 w-5 text-gray-900" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link href="/agents" className="text-sm text-gray-600 font-medium">
              Agents
            </Link>
            <Link href="/skills" className="text-sm text-gray-600 font-medium">
              Skills
            </Link>
            <Link href="/packs" className="text-sm text-gray-600 font-medium">
              Packs
            </Link>
            <Link href="/configure" className="text-sm text-gray-600 font-medium">
              Configure
            </Link>
            <Link href="/simulate" className="text-sm text-gray-600 font-medium">
              Simulate
            </Link>
            <Link href="/deploy" className="text-sm text-gray-600 font-medium">
              Deploy
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="ghost" size="sm" className="justify-start text-gray-600">
                Sign in
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
