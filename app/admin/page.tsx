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
  }[];
  kakaoLink: string;
  catalogLink: string;
  heroImageUrl: string;
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
    },
    {
      title: "장시간 배터리",
      description: "하루 종일 사용 가능한 강력한 배터리 성능을 제공합니다.",
    },
    {
      title: "세련된 디자인",
      description: "프로페셔널한 외관으로 업무 환경에 완벽하게 어울립니다.",
    },
  ],
  kakaoLink: "https://open.kakao.com/o/your-channel",
  catalogLink: "",
  heroImageUrl: "/kr-600.jpg",
};

export default function AdminPage() {
  const router = useRouter();
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 저장된 콘텐츠 불러오기
    const savedContent = localStorage.getItem("kr600-content");
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (error) {
        console.error("Failed to load content:", error);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("kr600-content", JSON.stringify(content));
    // 같은 탭에서 변경 사항을 감지하기 위한 커스텀 이벤트 발생
    window.dispatchEvent(new Event("localStorageUpdated"));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push("/");
    }, 1500);
  };

  const handleFeatureChange = (
    index: number,
    field: "title" | "description",
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
        { title: "새로운 특징", description: "설명을 입력하세요" },
      ],
    });
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
                className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500"
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
                className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500"
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
                className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500"
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
                      className="w-full px-3 py-2 border border-navy-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-navy-500"
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
                      className="w-full px-3 py-2 border border-navy-300 rounded focus:outline-none focus:ring-2 focus:ring-navy-500"
                    />
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
                className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500"
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
                className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500"
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
                className="w-full px-4 py-2 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500"
              />
              <p className="mt-1 text-xs text-navy-500">
                public 폴더 내 이미지는 /파일명 형식으로, 외부 이미지는 전체 URL을 입력하세요.
              </p>
            </div>

            {/* Save Button */}
            <div className="pt-6">
              <button
                onClick={handleSave}
                className="w-full bg-navy-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-navy-800 transition-colors"
              >
                {saved ? "저장 완료! 메인 페이지로 이동합니다..." : "저장하기"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
