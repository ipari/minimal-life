# Leaflette

적게 소유하고 오래 사용하며, 신중하게 소비하는 삶을 기록하는 한·영 정적 블로그입니다.

## 로컬 개발

Node.js 22 이상이 필요합니다.

```sh
npm install
npm run dev
```

기본 개발 주소는 `http://localhost:4321/`입니다.

## 검증과 빌드

```sh
npm run check
npm run build
```

정적 빌드 결과는 `dist/`에 생성됩니다. 운영 환경에서는 이 디렉터리를 웹 서버로 서비스합니다.

콘텐츠는 `src/content/`에, 정적 이미지·CSS·JavaScript는 `public/assets/`에 있습니다. 기존 주소와 다국어 대응은 각 Markdown 파일의 `permalink`, `alternate_url`, `translation_key`로 관리합니다.
