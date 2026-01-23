"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function CTASection() {
  const [kakaoLink, setKakaoLink] = useState<string>("https://open.kakao.com/o/gXXXXXX")

  useEffect(() => {
    // localStorage에서 카카오톡 링크 불러오기
    const loadKakaoLink = () => {
      const savedContent = localStorage.getItem("kr600-content")
      if (savedContent) {
        try {
          const content = JSON.parse(savedContent)
          if (content.kakaoLink && content.kakaoLink.trim() !== "") {
            setKakaoLink(content.kakaoLink)
          }
        } catch (error) {
          console.error("Failed to load kakao link:", error)
        }
      }
    }

    loadKakaoLink()
    window.addEventListener("storage", loadKakaoLink)
    window.addEventListener("localStorageUpdated", loadKakaoLink)

    return () => {
      window.removeEventListener("storage", loadKakaoLink)
      window.removeEventListener("localStorageUpdated", loadKakaoLink)
    }
  }, [])

  return (
    <section id="cta" className="py-24 relative overflow-hidden bg-secondary">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-30" />
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8 md:mb-10 max-w-xl mx-auto text-balance leading-relaxed">
            <span className="font-bold">카톡 1분 상담</span>으로 KR-600 최저가 혜택과
            <br />
            대량 구매 할인을 확인해 보세요.
          </h2>
          
          <div className="flex flex-col items-center gap-4">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 gap-3 bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <a 
                href={kakaoLink} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-6 h-6" />
                카카오톡 상담하기
              </a>
            </Button>
            
            {/* 전화 및 메일 문의 */}
            <div className="mt-4 pt-6 border-t border-border/50 w-full max-w-md mx-auto">
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <p className="text-lg font-bold text-foreground mb-4">전화 및 메일 문의</p>
                <div className="space-y-2 text-base text-muted-foreground">
                  <p>전화번호: 031-523-2340</p>
                  <p>이메일: hichoi333@naver.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
