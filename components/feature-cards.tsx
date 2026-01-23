"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Radio, Volume2, BatteryFull } from "lucide-react"
import Image from "next/image"

const defaultFeatures = [
  {
    icon: Radio,
    title: "확장된 통신 범위",
    description: "넓은 면적의 호텔과 웨딩홀에서도 끊김 없는 통신을 보장합니다. 최대 5km 범위의 안정적인 연결.",
    iconUrl: "",
  },
  {
    icon: Radio,
    title: "크리스탈 클리어 음질",
    description: "노이즈 캔슬링 기술로 시끄러운 연회장에서도 선명한 음성 전달이 가능합니다.",
    iconUrl: "",
  },
  {
    icon: BatteryFull,
    title: "장시간 배터리",
    description: "한 번 충전으로 48시간 이상 사용 가능. 바쁜 이벤트 시즌에도 걱정 없는 운영.",
    iconUrl: "",
  },
]

export function FeatureCards() {
  const [features, setFeatures] = useState(defaultFeatures)
  const [iconErrors, setIconErrors] = useState<Record<number, boolean>>({})

  useEffect(() => {
    // localStorage에서 특징 데이터 불러오기
    const loadFeatures = () => {
      const savedContent = localStorage.getItem("kr600-content")
      if (savedContent) {
        try {
          const content = JSON.parse(savedContent)
          if (content.features && Array.isArray(content.features) && content.features.length > 0) {
            // localStorage에 저장된 features를 사용하고, icon 필드는 defaultFeatures에서 매핑
            const mergedFeatures = content.features.map((feature: any, index: number) => {
              // 기본 아이콘 배열 (순서대로 Radio, Radio, BatteryFull) - 두 번째 항목은 Radio
              const defaultIcons = [Radio, Radio, BatteryFull]
              const defaultIcon = defaultIcons[index] || Radio
              
              return {
                icon: defaultIcon, // React 컴포넌트는 저장할 수 없으므로 기본값에서 매핑
                title: feature.title || "",
                description: feature.description || "",
                iconUrl: feature.iconUrl || "",
              }
            })
            setFeatures(mergedFeatures)
            setIconErrors({}) // 새로 로드할 때 에러 상태 초기화
          } else {
            // localStorage에 features가 없으면 기본값 사용
            setFeatures(defaultFeatures)
          }
        } catch (error) {
          console.error("Failed to load features:", error)
          // 에러 발생 시 기본값 사용
          setFeatures(defaultFeatures)
        }
      } else {
        // localStorage에 데이터가 없으면 기본값 사용
        setFeatures(defaultFeatures)
      }
    }

    loadFeatures()
    window.addEventListener("storage", loadFeatures)
    window.addEventListener("localStorageUpdated", loadFeatures)

    return () => {
      window.removeEventListener("storage", loadFeatures)
      window.removeEventListener("localStorageUpdated", loadFeatures)
    }
  }, [])

  return (
    <section id="features" className="py-24 bg-background">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="text-center mb-16 w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              왜 <span className="text-primary whitespace-nowrap">KR-600</span>인가요?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              호스피탈리티 산업에 특화된 기능으로 완벽한 고객 서비스를 제공하세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 w-full">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    {feature.iconUrl && feature.iconUrl.trim() !== "" && !iconErrors[index] ? (
                      <div className="relative w-8 h-8">
                        <Image
                          src={feature.iconUrl}
                          alt={feature.title}
                          fill
                          className="object-contain"
                          onError={() => {
                            setIconErrors(prev => ({ ...prev, [index]: true }))
                          }}
                        />
                      </div>
                    ) : (
                      <feature.icon className="w-8 h-8 text-primary" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
