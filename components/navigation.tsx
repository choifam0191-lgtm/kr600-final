"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsOpen(false)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl font-bold text-primary"
          >
            KR-600
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            무전기 특가할인
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            영우테크
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            KR-600
          </button>
          <button
            onClick={() => scrollToSection("catalog")}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            카탈로그 다운로드
          </button>
          <Button
            onClick={() => scrollToSection("cta")}
            size="sm"
            className="ml-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            견적문의
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection("hero")}
              className="block w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              무전기 특가할인
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              영우테크
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              KR-600
            </button>
            <button
              onClick={() => scrollToSection("catalog")}
              className="block w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              카탈로그 다운로드
            </button>
            <Button
              onClick={() => scrollToSection("cta")}
              size="sm"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              견적문의
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
