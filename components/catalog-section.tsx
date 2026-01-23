"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function CatalogSection() {
  const [catalogLink, setCatalogLink] = useState<string>("")

  useEffect(() => {
    // localStorage에서 카탈로그 링크 불러오기
    const loadCatalogLink = () => {
      const savedContent = localStorage.getItem("kr600-content")
      if (savedContent) {
        try {
          const content = JSON.parse(savedContent)
          if (content.catalogLink) {
            setCatalogLink(content.catalogLink)
          } else {
            setCatalogLink("")
          }
        } catch (error) {
          console.error("Failed to load catalog link:", error)
        }
      }
    }

    // 초기 로드
    loadCatalogLink()

    // storage 이벤트 리스너 추가 (다른 탭에서 변경 시 감지)
    window.addEventListener("storage", loadCatalogLink)

    // 같은 탭에서의 변경 감지를 위한 커스텀 이벤트 리스너
    const handleStorageChange = () => loadCatalogLink()
    window.addEventListener("localStorageUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", loadCatalogLink)
      window.removeEventListener("localStorageUpdated", handleStorageChange)
    }
  }, [])

  const handleDownload = () => {
    if (catalogLink) {
      window.open(catalogLink, "_blank", "noopener,noreferrer")
    } else {
      alert("준비 중입니다")
    }
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
