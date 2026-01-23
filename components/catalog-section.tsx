"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function CatalogSection() {
  // 하드코딩된 고정 값
  const catalogLink = "/kr600catalog.pdf"

  const handleDownload = () => {
    window.open(catalogLink, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="catalog" className="py-16 bg-secondary">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <p className="text-lg text-muted-foreground mb-6">
            더 자세한 정보가 필요하신가요? <span className="text-primary font-semibold whitespace-nowrap">KR-600</span>의 상세 스펙을 확인해보세요.
          </p>
          <Button
            onClick={handleDownload}
            size="lg"
            className="text-lg px-8 py-6 gap-3 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Download className="w-5 h-5" />
            카탈로그 다운로드 (PDF)
          </Button>
        </div>
      </div>
    </section>
  )
}
