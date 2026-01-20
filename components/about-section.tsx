"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function AboutSection() {
  const [partnerImages, setPartnerImages] = useState<string[]>(Array(15).fill(""))

  useEffect(() => {
    // localStorage에서 파트너사 이미지 불러오기
    const loadPartnerImages = () => {
      const savedContent = localStorage.getItem("kr600-content")
      if (savedContent) {
        try {
          const content = JSON.parse(savedContent)
          if (content.partnerImages && Array.isArray(content.partnerImages)) {
            setPartnerImages(content.partnerImages)
          }
        } catch (error) {
          console.error("Failed to load partner images:", error)
        }
      }
    }

    loadPartnerImages()
    window.addEventListener("storage", loadPartnerImages)
    window.addEventListener("localStorageUpdated", loadPartnerImages)

    return () => {
      window.removeEventListener("storage", loadPartnerImages)
      window.removeEventListener("localStorageUpdated", loadPartnerImages)
    }
  }, [])

  const validImages = partnerImages.filter(url => url && url.trim() !== "")

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            <span className="text-primary">영우테크</span> 소개
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-12">
              영우테크는 30년 경력의 전문 통신 솔루션 기업입니다.
              <br />
              오랜 경험과 기술력을 바탕으로 호텔, 웨딩홀, 대형 식당 등 다양한 고객들에게
              최적의 무전기 솔루션을 제공하고 있습니다.
            </p>
          </div>
          
          {/* Trust Badge */}
          {validImages.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-base font-semibold text-foreground mb-6">영우테크 파트너사</p>
              <div className="grid grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto">
                {partnerImages.map((imageUrl, index) => {
                  if (!imageUrl || imageUrl.trim() === "") return null
                  return (
                    <div
                      key={index}
                      className="relative w-full aspect-square flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <Image
                        src={imageUrl}
                        alt={`파트너사 ${index + 1}`}
                        fill
                        className="object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none"
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
