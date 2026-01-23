import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 bg-background">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Company Logo */}
          <div className="mb-4">
            <Image
              src="/logo.png"
              alt="영우테크 로고"
              width={130}
              height={130}
              className="w-[138px] md:w-[173px] h-auto"
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

          {/* 영우테크 주요 거래처 */}
          <div className="mt-6 pt-6 border-t border-border w-full flex flex-col items-center">
            <p className="text-base font-semibold text-foreground mb-6">영우테크 주요 거래처</p>
            <div className="w-full max-w-[1300px] mx-auto">
              <Image
                src="/clients_all.png"
                alt="영우테크 주요 거래처"
                width={1300}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
