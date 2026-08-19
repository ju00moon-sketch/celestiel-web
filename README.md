# CELESTIEL 웹사이트

게임 **CELESTIEL**의 공식 웹사이트와 세계관 설정집 저장소입니다.

**라이브 사이트** → https://celestiel.netlify.app

## 구성

```
├── web/                      React 사이트 (React 18 + Vite 5 + React Router 6)
│   ├── src/
│   │   ├── pages/            홈 · 세계관 · 다운로드 · 404
│   │   └── components/       공통 레이아웃 (내비게이션·푸터)
│   ├── public/_redirects     Netlify SPA 라우팅
│   ├── nginx.conf            로컬 Docker 프리뷰용 nginx 설정
│   └── vite.config.js        설정집 서빙·복사 플러그인 포함
├── 세계관 설정/
│   └── celestiel-codex.html  세계관 설정집 원본 (단일 HTML, 독립 문서)
├── docker-compose.yml        로컬 프로덕션 프리뷰 (nginx)
└── netlify.toml              Netlify 빌드 설정 (UI 설정보다 우선)
```

## 세계관 설정집

설정집은 React로 옮기지 않고 **`세계관 설정/celestiel-codex.html` 원본 하나**로 관리합니다.
자체 내비게이션과 「진실 보기」 토글을 가진 독립 문서이기 때문입니다.

- 사이트에서는 `/world/celestiel-codex.html` 경로로 서빙됩니다
- **개발 서버**: vite 플러그인이 원본을 그 자리에서 읽음 → 저장 후 새로고침이면 반영
- **빌드**: `dist/world/`로 자동 복사됨 → 배포본에 포함

설정집을 수정할 때는 원본 HTML만 고치면 됩니다. 복사본 관리가 필요 없습니다.

## 로컬 개발

```bash
cd web
npm ci        # 최초 1회
npm run dev   # http://localhost:5174
```

프로덕션 형태 확인 (Docker, http://localhost:8080):

```bash
cd web && npm run build && cd ..
docker compose up -d
```

## 배포

`main` 브랜치에 push하면 Netlify가 자동으로 빌드·배포합니다. 수동 업로드는 필요 없습니다.

```
git push → Netlify 빌드 (netlify.toml: cd web && npm ci && npm run build) → 1~2분 내 반영
```

- 빌드 설정은 [netlify.toml](netlify.toml)이 기준입니다 — Netlify UI에서 바꾸지 말 것
- SPA 라우팅은 `web/public/_redirects`가 처리합니다 (실존 파일 우선, 나머지는 index.html)

## 다운로드 페이지

아직 배포된 빌드가 없어 빈 목록 상태입니다.
빌드가 생기면 `web/src/pages/Download.jsx`의 `BUILDS` 배열에 항목을 추가하면 됩니다.
