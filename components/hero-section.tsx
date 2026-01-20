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
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            {/* Main Copy */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-balance leading-[1.3] w-full max-w-4xl">
              <span className="text-foreground">
                헌 무전기 주시면,
                <br />
                새 무전기 무조건 <span className="text-red-600">5만원 할인</span>해 드립니다!
              </span>
            </h1>
            
            {/* Sub Copy */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              브랜드 상관없이 반납만 하세요. <span className="text-primary font-semibold">KR-600</span>을 가장 저렴하게 만나는 기회.
            </p>
            
            {/* Price Visualization */}
            <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 py-4">
              <span className="text-xl md:text-2xl text-muted-foreground line-through">
                169,000원
              </span>
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-600">
                119,000원
              </span>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start pt-2">
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
          
          {/* Product Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
              <Image
                src={heroImageUrl}
                alt="KR-600 프리미엄 무전기"
                fill
                className="object-contain relative z-10 drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
