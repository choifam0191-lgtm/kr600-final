import { Card, CardContent } from "@/components/ui/card"
import { Radio, Volume2, Battery } from "lucide-react"

const features = [
  {
    icon: Radio,
    title: "확장된 통신 범위",
    description: "넓은 면적의 호텔과 웨딩홀에서도 끊김 없는 통신을 보장합니다. 최대 5km 범위의 안정적인 연결.",
  },
  {
    icon: Volume2,
    title: "크리스탈 클리어 음질",
    description: "노이즈 캔슬링 기술로 시끄러운 연회장에서도 선명한 음성 전달이 가능합니다.",
  },
  {
    icon: Battery,
    title: "장시간 배터리",
    description: "한 번 충전으로 48시간 이상 사용 가능. 바쁜 이벤트 시즌에도 걱정 없는 운영.",
  },
]

export function FeatureCards() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            왜 <span className="text-primary">KR-600</span>인가요?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            호스피탈리티 산업에 특화된 기능으로 완벽한 고객 서비스를 제공하세요
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
