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
    <section id="about" className="py-16 md:py-20 bg-background">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Company Logo */}
          <div className="mb-4">
            <Image
              src="/logo2.png"
              alt="영우테크 로고"
              width={120}
              height={120}
              className="w-32 h-auto"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            <span className="text-primary">영우테크</span> 소개
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-6">
              영우테크는 30년 경력의 전문 통신 솔루션 기업입니다.
              <br />
              오랜 경험과 기술력을 바탕으로 호텔, 웨딩홀, 대형 식당 등 다양한 고객들에게
              최적의 무전기 솔루션을 제공하고 있습니다.
            </p>
          </div>
          
          {/* Trust Badge */}
          {validImages.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-base font-semibold text-foreground mb-6">영우테크 파트너사</p>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto">
                {partnerImages.map((imageUrl, index) => {
                  if (!imageUrl || imageUrl.trim() === "") return null
                  // public 폴더 내 이미지인 경우 경로 보정
                  const normalizedUrl = imageUrl.startsWith('/') ? imageUrl : imageUrl
                  return (
                    <div
                      key={index}
                      className="relative w-full aspect-square flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <Image
                        src={normalizedUrl}
                        alt={`파트너사 ${index + 1}`}
                        fill
                        className="object-contain p-2"
                        unoptimized={normalizedUrl.startsWith('http')}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                          const parent = target.parentElement
                          if (parent && !parent.querySelector('.error-message')) {
                            const errorDiv = document.createElement("div")
                            errorDiv.className = "error-message text-gray-400 text-xs text-center px-2"
                            errorDiv.textContent = "이미지 없음"
                            parent.appendChild(errorDiv)
                          }
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
