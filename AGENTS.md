# AGENTS.md

이 문서는 이 저장소에서 작업하는 에이전트가 프로젝트의 목적과 이미 합의된 구현 방식을 빠르게 이해하기 위한 지침이다.

## 프로젝트 개요

- 프로젝트명은 **Leaflette**다.
- 적게 소유하고 오래 사용하며, 신중하게 소비하는 미니멀라이프를 기록하는 개인 블로그다.
- 정적 사이트 생성기는 **Astro**를 사용한다. 서버 애플리케이션이나 데이터베이스 없이 정적 출력으로 운영한다.
- 소스는 GitHub에서 관리할 수 있지만, 상업적 운영 가능성을 고려해 결과물은 개인 서버에서 정적 파일로 서비스하는 방향을 전제로 한다.
- 기본 도메인은 `astro.config.mjs`의 `https://leaflette.com`이다.

## 사이트 구성

홈은 언어별로 `/ko/`와 `/en/`에 제공된다. 루트 `/`는 브라우저 언어를 확인해 둘 중 하나로 이동한다.

주요 콘텐츠는 다음과 같다.

1. 최근 게시글
2. 최근 들인 물건
3. 최근 구매하지 않기로 한 물건
4. 현재 사용 중인 물건 갤러리
5. 사용 완료 또는 내보낸 물건
6. About 페이지

현재 홈 노출 개수와 정렬 방식은 `src/components/Home.astro`를 기준으로 한다. 숫자를 문서에 중복해서 고정하지 말고 해당 컴포넌트를 수정한다.

## 디렉터리와 데이터

- `src/content/posts/`: 미니멀라이프 게시글
- `src/content/items/`: 물건 상세 페이지
- `src/content/pages/`: About 같은 일반 콘텐츠 페이지
- `src/content.config.ts`: 콘텐츠 컬렉션과 front matter 스키마
- `src/layouts/`: 공통, 게시글, 물건 상세 레이아웃
- `src/components/Home.astro`: 한·영 홈 화면의 공통 컴포넌트
- `src/lib/i18n.ts`: 언어별 UI 문구, 카테고리, 날짜 유틸리티
- `src/pages/`: Astro 파일 기반 라우트
- `public/assets/images/products/`: 물건 상세 상단 제품 이미지
- `public/assets/images/thumbnails/`: 홈 갤러리용 작은 이미지
- `public/assets/images/items/`: 물건 상세 본문용 사진
- `public/assets/images/posts/`: 게시글 본문용 사진
- `public/assets/css/style.css`: 사이트 전체 스타일
- `public/assets/js/site.js`: 홈의 물건 목록 토글 등 작은 상호작용

`dist/`, `.astro/`, `node_modules/`는 생성물이며 커밋하지 않는다. `package-lock.json`은 커밋한다.

## 다국어 콘텐츠 규칙

사이트는 한국어와 영어를 같은 수준으로 제공한다.

- 한국어 게시글: `src/content/posts/YYYY-MM-DD-slug.md`
- 영어 게시글: `src/content/posts/YYYY-MM-DD-slug-en.md`
- 한국어 물건: `src/content/items/slug.md`
- 영어 물건: `src/content/items/slug.en.md`
- 새 콘텐츠를 추가하거나 의미를 크게 변경하면 대응 언어 파일도 함께 갱신한다.
- 두 언어는 동일한 `translation_key`를 사용한다.
- `lang`, `permalink`, `alternate_url`을 반드시 기록한다.
- UI 문구를 템플릿에 직접 하드코딩하지 말고 `src/lib/i18n.ts`에 한·영 값을 함께 추가한다.

게시글 front matter 예시:

```yaml
---
layout: post
title: "제목"
lang: ko
translation_key: example-post
permalink: /ko/posts/example-post/
alternate_url: /en/posts/example-post/
date: 2026-01-01
---
```

## 물건 콘텐츠 규칙

물건 페이지에는 아래 메타데이터를 사용한다.

```yaml
---
title: "물건명"
lang: ko
kind: item
translation_key: example-item
permalink: /ko/items/example-item/
alternate_url: /en/items/example-item/
thumbnail: /assets/images/thumbnails/example-item.webp
image: /assets/images/products/example-item.png
model: "모델명"
status: "사용 중"
category: "전자기기"
item_order: 10
acquired_date: 2026-01-01
---
```

- `kind: item`이 없으면 홈의 물건 목록에 포함되지 않는다.
- 카테고리는 `src/lib/i18n.ts`의 `itemCategories`에 정의된 값을 사용한다.
- 한국어 상태는 `사용 중`, `사용 완료`, `내보냄`, `구매하지 않음` 중 하나를 사용한다.
- 영어 상태는 대응되는 `In use`, `Retired`, `Let go`, `Not purchased`를 사용한다.
- 구매하지 않은 물건에는 `reviewed_date`와 `review_summary`를 사용한다.
- 보유하거나 보유했던 물건에는 가능하면 `acquired_date`를 기록한다.
- 본문은 구매 필요성, 선택 이유, 함께 고려한 대안, 실제 사용 경험, 관리 방법, 참고 링크를 중심으로 작성한다.
- 링크가 제휴 또는 광고 링크라면 독자가 알 수 있도록 명확히 표시한다.

## 글과 이미지의 방향

- 문체는 차분하고 구체적인 1인칭 기록체를 사용한다.
- 무조건적인 구매 추천보다 판단 과정, 실제 사용, 내보낸 이유를 기록한다.
- “물건 수를 줄이는 것”만 강조하지 말고 생활의 여유, 수리, 재사용, 신중한 소비를 함께 다룬다.
- 샘플 링크는 실제 구매처로 오인되지 않도록 관리한다.

이미지는 다음 원칙을 따른다.

- 갤러리 썸네일은 가볍게 최적화된 WebP를 사용한다.
- 상세 상단 제품 이미지는 `public/assets/images/products/`에 둔다.
- 본문 사진은 콘텐츠별 하위 폴더에 두고 의미 있는 파일명을 사용한다.
- 본문 이미지에는 구체적인 한국어 또는 영어 대체 텍스트를 넣는다.
- 사진형 이미지는 차분한 자연광, 중성색, 과도하게 상업적이지 않은 에디토리얼 스타일을 유지한다.
- 로고, 워터마크, 읽을 수 없는 생성 텍스트가 포함되지 않게 한다.
- 큰 원본을 그대로 넣지 말고 일반적으로 가로 1440px 이하 WebP로 최적화한다.
- 기존 SVG 아이콘 체계를 수정하는 작업은 생성형 래스터 이미지보다 SVG 편집을 우선한다.

## 탐색과 디자인

- 디자인은 여백이 충분하고 장식이 적은 미니멀한 방향을 유지한다.
- 헤더에는 사이트 제목과 작은 About 링크가 있다.
- 홈 하단에 중복 About 링크를 다시 추가하지 않는다.
- 개별 게시글 끝에는 작은 글쓴이 소개 영역과 About 링크가 있다.
- 물건 상세 페이지와 일반 페이지는 `src/layouts/PageLayout.astro`, 게시글은 `src/layouts/PostLayout.astro`를 사용한다.
- 모바일에서도 이미지나 3열 갤러리가 컨테이너 밖으로 넘치지 않도록 확인한다.

## 로컬 실행과 검증

의존성이 준비된 환경에서 다음 명령을 사용한다.

```sh
npm install
npm run dev
npm run check
npm run build
```

기본 개발 주소는 `http://localhost:4321/`이다.

변경 후 최소 검증:

1. `npm run check`와 `npm run build`가 경고와 오류 없이 끝나는지 확인한다.
2. 한국어와 영어 홈이 모두 생성되는지 확인한다.
3. 새 콘텐츠의 `permalink`와 `alternate_url`이 실제 파일로 생성되는지 확인한다.
4. 본문과 썸네일의 이미지 경로가 모두 존재하는지 확인한다.
5. `git diff --check`로 공백 오류를 확인한다.
6. 가능하면 데스크톱과 모바일 너비에서 홈, 게시글, 물건 상세 페이지를 시각적으로 확인한다.

## 배포 방향

Astro는 `dist/`에 완성된 정적 파일을 생성한다. 개인 서버에서는 Nginx 같은 웹 서버가 이 디렉터리의 결과물을 제공하도록 구성한다.

- GitHub 저장소는 소스 관리와 자동화에 사용할 수 있다.
- 배포 시에는 소스를 그대로 웹 루트에 두지 말고 Astro 빌드 결과물을 배포한다.
- 운영 도메인에서는 HTTPS, 캐시 정책, 압축, 정적 자산의 장기 캐시를 설정한다.
- 배포 자동화를 추가할 경우 빌드 성공 후에만 운영 디렉터리를 교체하고, 이전 버전으로 되돌릴 수 있게 한다.

## Git 작업

- 기본 통합 브랜치는 `main`이다.
- 기능 브랜치의 변경을 병합하기 전에 작업 트리가 깨끗한지 확인한다.
- `dist/`, `.astro/`, `node_modules/`, 임시 이미지 같은 생성물을 커밋하지 않는다.
- 사용자가 요청하지 않으면 원격 푸시, PR 생성, 배포를 수행하지 않는다.
- 커밋 전 Astro 검사·빌드와 `git diff --check`를 실행한다.
