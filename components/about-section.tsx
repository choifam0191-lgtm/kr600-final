export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            <span className="text-primary">영우테크</span> 소개
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-4">
              영우테크는 호스피탈리티 산업을 위한 전문 통신 솔루션을 제공하는 기업입니다.
            </p>
            <p className="text-lg leading-relaxed mb-12">
              오랜 경험과 기술력을 바탕으로 호텔, 웨딩홀, 대형 식당 등 다양한 고객들에게
              최적의 무전기 솔루션을 제공하고 있습니다.
            </p>
          </div>
          
          {/* Trust Badge */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">영우테크 파트너사</p>
            <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
              <span className="text-foreground font-semibold">롯데호텔</span>
              <span className="text-foreground font-semibold">신라호텔</span>
              <span className="text-foreground font-semibold">그랜드 하얏트</span>
              <span className="text-foreground font-semibold">더 플라자</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
