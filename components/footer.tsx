export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* 회사명 및 정보 */}
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              (주)영우테크
            </h3>
            <div className="space-y-2 text-sm md:text-base leading-relaxed">
              <p>
                <span className="text-gray-300">대표:</span> 최종임 |{" "}
                <span className="text-gray-300">사업자등록번호:</span> 132-81-89811
              </p>
              <p>
                <span className="text-gray-300">주소:</span> 경기 구리시 이문안로 138 (우)11946
              </p>
              <p>
                <span className="text-gray-300">통신판매업 신고증 번호:</span> 제 2011-경기구리-0315호
              </p>
              <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2 pt-2">
                <a
                  href="tel:031-523-2340"
                  className="hover:text-primary transition-colors"
                >
                  <span className="text-gray-300">Tel:</span> 031-523-2340
                </a>
                <span className="hidden md:inline">|</span>
                <span>
                  <span className="text-gray-300">Fax:</span> 031-553-0043
                </span>
                <span className="hidden md:inline">|</span>
                <a
                  href="mailto:hichoi333@naver.com"
                  className="hover:text-primary transition-colors"
                >
                  <span className="text-gray-300">Email:</span> hichoi333@naver.com
                </a>
              </div>
            </div>
          </div>

          {/* 저작권 */}
          <div className="flex items-end md:justify-end">
            <p className="text-xs md:text-sm text-gray-500">
              Copyright © 2026 Youngwoo Tech. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
