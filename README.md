# KR-600 프리미엄 무전기 홍보 웹사이트

호텔, 웨딩홀, 대형 식당을 위한 전문 무전기 홍보 웹사이트입니다.

## 기술 스택

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**

## 프로젝트 구조

```
kr600-website/
├── app/
│   ├── admin/          # 관리자 페이지
│   ├── globals.css     # 전역 스타일
│   ├── layout.tsx      # 루트 레이아웃
│   └── page.tsx        # 메인 페이지
├── public/             # 정적 파일
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 주요 기능

### 메인 페이지 (`/`)
- 제품 소개 및 특징 표시
- 카카오톡 상담 버튼
- 네이비/화이트 톤의 깔끔한 디자인

### 관리자 페이지 (`/admin`)
- 메인 페이지의 모든 텍스트 수정 가능
- 특징 항목 추가/삭제
- 변경사항은 로컬 스토리지에 저장되어 메인 페이지에 반영

## 데이터 저장

현재는 브라우저의 로컬 스토리지를 사용하여 데이터를 저장합니다. 
향후 데이터베이스 연동 시 `app/page.tsx`와 `app/admin/page.tsx`의 데이터 로딩/저장 로직을 수정하면 됩니다.

## 디자인 컬러

- **Navy**: 신뢰감을 주는 네이비 톤 (#102a43 ~ #f0f4f8)
- **White**: 깔끔한 화이트 배경
- **Yellow**: 카카오톡 상담 버튼 강조색
