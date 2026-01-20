"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ContentData {
  title: string;
  subtitle: string;
  description: string;
  features: {
    title: string;
    description: string;
    iconUrl: string;
  }[];
  kakaoLink: string;
  catalogLink: string;
  heroImageUrl: string;
  partnerImages: string[];
}

const defaultContent: ContentData = {
  title: "KR-600 프리미엄 무전기",
  subtitle: "호텔, 웨딩홀, 대형 식당을 위한 전문 솔루션",
  description:
    "탁월한 음질과 긴 배터리 수명, 세련된 디자인으로 업무 효율성을 극대화하세요.",
  features: [
    {
      title: "뛰어난 음질",
      description: "선명하고 깨끗한 음질로 소통의 품질을 높입니다.",
      iconUrl: "",
    },
    {
      title: "장시간 배터리",
      description: "하루 종일 사용 가능한 강력한 배터리 성능을 제공합니다.",
      iconUrl: "",
    },
    {
      title: "세련된 디자인",
      description: "프로페셔널한 외관으로 업무 환경에 완벽하게 어울립니다.",
      iconUrl: "",
    },
  ],
  kakaoLink: "https://open.kakao.com/o/your-channel",
  catalogLink: "",
  heroImageUrl: "/kr-600.jpg",
  partnerImages: Array(15).fill(""),
};

export default function AdminPage() {
  const router = useRouter();
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 저장된 콘텐츠 불러오기
    const savedContent = localStorage.getItem("kr600-content");
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        // features 배열이 없거나 빈 배열인 경우 기본값 사용
        if (!parsedContent.features || !Array.isArray(parsedContent.features) || parsedContent.features.length === 0) {
          parsedContent.features = defaultContent.features;
        }
        // 각 feature에 iconUrl 필드가 없는 경우 추가
        parsedContent.features = parsedContent.features.map((feature: any, index: number) => ({
          title: feature.title || defaultContent.features[index]?.title || "",
          description: feature.description || defaultContent.features[index]?.description || "",
          iconUrl: feature.iconUrl || "",
        }));
        // partnerImages 배열이 없는 경우 기본값 사용
        if (!parsedContent.partnerImages || !Array.isArray(parsedContent.partnerImages)) {
          parsedContent.partnerImages = Array(15).fill("");
        }
        setContent(parsedContent);
      } catch (error) {
        console.error("Failed to load content:", error);
        // 에러 발생 시 기본값 사용
        setContent(defaultContent);
      }
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // localStorage에 저장
      localStorage.setItem("kr600-content", JSON.stringify(content));
      
      // 같은 탭에서 변경 사항을 감지하기 위한 커스텀 이벤트 발생
      window.dispatchEvent(new Event("localStorageUpdated"));
      
      // 저장 완료 알림 표시
      setSaved(true);
      setShowToast(true);
      
      // 2초 후 메인 페이지로 이동
      setTimeout(() => {
        setIsSaving(false);
        setShowToast(false);
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      setIsSaving(false);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleFeatureChange = (
    index: number,
    field: "title" | "description" | "iconUrl",
    value: string
  ) => {
    const newFeatures = [...content.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setContent({ ...content, features: newFeatures });
  };

  const addFeature = () => {
    setContent({
      ...content,
      features: [
        ...content.features,
        { title: "새로운 특징", description: "설명을 입력하세요", iconUrl: "" },
      ],
    });
  };

  const handlePartnerImageChange = (index: number, value: string) => {
    const newPartnerImages = [...content.partnerImages];
    newPartnerImages[index] = value;
    setContent({ ...content, partnerImages: newPartnerImages });
  };

  const removeFeature = (index: number) => {
    if (content.features.length > 1) {
      const newFeatures = content.features.filter((_, i) => i !== index);
      setContent({ ...content, features: newFeatures });
    }
  };

  return (
    <div className="min-h-screen bg-navy-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-black">
              관리자 페이지
            </h1>
            <Link
              href="/"
              className="text-black hover:text-gray-800 underline"
            >
              메인으로 돌아가기
            </Link>
          </div>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                메인 타이틀
              </label>
              <input
                type="text"
                value={content.title}
                onChange={(e) =>
                  setContent({ ...content, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-black"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                부제목
              </label>
              <input
                type="text"
                value={content.subtitle}
                onChange={(e) =>
                  setContent({ ...content, subtitle: e.target.value })
                }
                className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-black"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                설명
              </label>
              <textarea
                value={content.description}
                onChange={(e) =>
                  setContent({ ...content, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-black"
              />
            </div>

            {/* Features */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-black">
                  특징 목록
                </label>
                <button
                  onClick={addFeature}
                  className="bg-navy-600 text-white px-4 py-2 rounded-lg hover:bg-navy-700 transition-colors text-sm"
                >
                  + 추가
                </button>
              </div>
              <div className="space-y-4">
                {content.features.map((feature, index) => (
                  <div
                    key={index}
                    className="border border-navy-200 rounded-lg p-4 bg-navy-50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-navy-600">
                        특징 {index + 1}
                      </span>
                      {content.features.length > 1 && (
                        <button
                          onClick={() => removeFeature(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) =>
                        handleFeatureChange(index, "title", e.target.value)
                      }
                      placeholder="특징 제목"
                      className="w-full px-3 py-2 border border-navy-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-navy-500 text-black"
                    />
                    <textarea
                      value={feature.description}
                      onChange={(e) =>
                        handleFeatureChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="특징 설명"
                      rows={2}
                      className="w-full px-3 py-2 border border-navy-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-navy-500 text-black"
                    />
                    <div>
                      <label className="block text-xs font-medium text-black mb-1">
                        아이콘 이미지 URL
                      </label>
                      <input
                        type="url"
                        value={feature.iconUrl}
                        onChange={(e) =>
                          handleFeatureChange(index, "iconUrl", e.target.value)
                        }
                        placeholder="/icon.svg 또는 https://example.com/icon.svg"
                        className="w-full px-3 py-2 border border-navy-300 rounded focus:outline-none focus:ring-2 focus:ring-navy-500 text-black text-sm"
                      />
                      <p className="mt-1 text-xs text-navy-500 mb-2">
                        SVG 또는 이미지 파일의 URL을 입력하세요. 비워두면 기본 아이콘이 사용됩니다.
                      </p>
                      {/* Icon Preview */}
                      {feature.iconUrl && (
                        <div className="mt-2 w-16 h-16 border border-navy-200 rounded overflow-hidden bg-navy-50 flex items-center justify-center">
                          <img
                            src={feature.iconUrl}
                            alt="아이콘 미리보기"
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              const img = e.target as HTMLImageElement;
                              img.style.display = "none";
                              const errorDiv = document.createElement("div");
                              errorDiv.className = "text-navy-400 text-xs text-center px-2";
                              errorDiv.textContent = "불가";
                              img.parentElement?.appendChild(errorDiv);
                            }}
                            key={feature.iconUrl}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kakao Link */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                카카오톡 링크
              </label>
              <input
                type="url"
                value={content.kakaoLink}
                onChange={(e) =>
                  setContent({ ...content, kakaoLink: e.target.value })
                }
                className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-black"
              />
            </div>

            {/* Catalog Link */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                카탈로그 다운로드 링크
              </label>
              <input
                type="url"
                value={content.catalogLink}
                onChange={(e) =>
                  setContent({ ...content, catalogLink: e.target.value })
                }
                placeholder="https://example.com/catalog.pdf"
                className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-black"
              />
              <p className="mt-1 text-xs text-navy-500">
                PDF 파일의 직접 다운로드 링크 또는 외부 링크를 입력하세요.
              </p>
            </div>

            {/* Hero Image URL */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                무전기 특가 할인 섹션 이미지 URL
              </label>
              <input
                type="url"
                value={content.heroImageUrl}
                onChange={(e) =>
                  setContent({ ...content, heroImageUrl: e.target.value })
                }
                placeholder="/kr-600.jpg 또는 https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-black"
              />
              <p className="mt-1 text-xs text-navy-500 mb-3">
                public 폴더 내 이미지는 /파일명 형식으로, 외부 이미지는 전체 URL을 입력하세요.
              </p>
              {/* Hero Image Preview */}
              {content.heroImageUrl && (
                <div className="mt-3 w-full max-w-md mx-auto border border-navy-200 rounded-lg overflow-hidden bg-navy-50">
                  <div className="relative w-full aspect-square">
                    <img
                      src={content.heroImageUrl}
                      alt="미리보기"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = "none";
                        const errorDiv = document.createElement("div");
                        errorDiv.className = "w-full h-full flex items-center justify-center text-navy-400 text-sm";
                        errorDiv.textContent = "이미지를 불러올 수 없습니다";
                        img.parentElement?.appendChild(errorDiv);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Partner Images */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-black">
                  영우테크 파트너사 이미지 (5x3, 총 15개)
                </label>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {content.partnerImages.map((imageUrl, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-xs font-medium text-black">
                      이미지 {index + 1}
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) =>
                        handlePartnerImageChange(index, e.target.value)
                      }
                      placeholder="이미지 URL"
                      className="w-full px-3 py-2 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-black text-sm"
                    />
                    {imageUrl && (
                      <div className="w-full aspect-square border border-navy-200 rounded overflow-hidden bg-navy-50 relative">
                        <img
                          src={imageUrl}
                          alt={`파트너사 ${index + 1}`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.style.display = "none";
                            const errorDiv = document.createElement("div");
                            errorDiv.className = "absolute inset-0 flex items-center justify-center text-navy-400 text-xs";
                            errorDiv.textContent = "로드 실패";
                            img.parentElement?.appendChild(errorDiv);
                          }}
                          key={imageUrl}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-navy-500">
                각 파트너사 로고 이미지의 URL을 입력하세요. 5열 3행으로 총 15개의 이미지를 배치할 수 있습니다.
              </p>
            </div>

            {/* Save Button */}
            <div className="pt-6 space-y-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    저장 중...
                  </>
                ) : (
                  "웹사이트에 반영하기"
                )}
              </button>
              
              {/* Toast 알림 */}
              {showToast && (
                <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-in slide-in-from-top-5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">저장 완료!</span>
                  <span>메인 페이지로 이동합니다...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
