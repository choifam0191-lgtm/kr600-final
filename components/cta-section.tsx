import { Button } from "@/components/ui/button"
import { MessageCircle, Phone } from "lucide-react"

export function CTASection() {
  return (
    <section id="cta" className="py-24 relative overflow-hidden bg-secondary">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-30" />
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            지금 바로 <span className="text-primary">KR-600</span>을
            <br />
            도입하세요
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            전문 상담사가 귀사에 맞는 최적의 솔루션을 제안해 드립니다.
            카카오톡으로 간편하게 문의하세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 gap-3 bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <a 
                href="https://open.kakao.com/o/gXXXXXX" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-6 h-6" />
                카카오톡 상담하기
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-10 py-7 gap-3 border-primary/50 text-foreground hover:bg-primary/10 bg-transparent"
              asChild
            >
              <a href="tel:02-1234-5678">
                <Phone className="w-5 h-5" />
                전화 상담
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
