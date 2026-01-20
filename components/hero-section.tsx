"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight } from "lucide-react"

export function HeroSection() {
  const [heroImageUrl, setHeroImageUrl] = useState<string>("/kr-600.jpg")

  useEffect(() => {
    // localStorage에서 히어로 이미지 URL 불러오기
    const loadHeroImage = () => {
      const savedContent = localStorage.getItem("kr600-content")
      if (savedContent) {
        try {
          const content = JSON.parse(savedContent)
          if (content.heroImageUrl && content.heroImageUrl.trim() !== "") {
            setHeroImageUrl(content.heroImageUrl)
          }
        } catch (error) {
          console.error("Failed to load hero image:", error)
        }
      }
    }

    loadHeroImage()
    window.addEventListener("storage", loadHeroImage)
    window.addEventListener("localStorageUpdated", loadHeroImage)

    return () => {
      window.removeEventListener("storage", loadHeroImage)
      window.removeEventListener("localStorageUpdated", loadHeroImage)
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary via-background to-background opacity-50" />
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center py-12 md:py-16">
          {/* Left: Image */}
          <div className="w-full flex justify-center items-center">
            {heroImageUrl && (
              <Image
                src={heroImageUrl}
                alt="프리미엄 업무용 무전기 KR-600"
                width={900}
                height={900}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full h-auto max-h-[500px] object-contain"
                priority
              />
            )}
          </div>

          {/* Right: Text */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            {/* Main Copy */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-balance leading-[1.3] w-full mb-6">
              <span className="text-foreground">
                최신형 <span className="text-primary">KR-600</span>
                <br />
                보상판매 특별 할인
              </span>
            </h1>
            
            {/* Sub Copy */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0 leading-relaxed mb-8">
              브랜드와 기종 관계없이 보유하고 계신 장비를 반납하시면
              <br />
              <span className="font-bold text-primary">대당 50,000원</span> 즉시 지원해 드립니다.
            </p>
            
            {/* Price Visualization */}
            <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 py-4 mb-8">
              <span className="text-xl md:text-2xl text-muted-foreground line-through">
                169,000원
              </span>
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-600">
                119,000원
              </span>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-center md:justify-start pt-2 w-full">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 gap-3 bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <a 
                  href="https://open.kakao.com/o/gXXXXXX" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  할인받고 구매 상담하기
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
