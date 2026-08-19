import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

// 세계관 설정집은 「세계관 설정」 폴더의 원본 HTML이 유일한 원본이다.
// web/ 안으로 복사하면 원본을 고쳤을 때 사본이 뒤처지므로, 복사 대신 그 자리에서 서빙한다.
const CODEX_SRC = path.resolve(here, '../세계관 설정/celestiel-codex.html')
const CODEX_URL = '/world/celestiel-codex.html'

function codex() {
  return {
    name: 'celestiel-codex',

    // 개발 서버: 원본 파일을 그대로 흘려보낸다 (저장하면 새로고침만으로 반영)
    configureServer(server) {
      server.middlewares.use(CODEX_URL, (req, res, next) => {
        if (!fs.existsSync(CODEX_SRC)) return next()
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        fs.createReadStream(CODEX_SRC).pipe(res)
      })
    },

    // 빌드: dist 안으로 복사해 넣어야 배포본이 완전해진다
    closeBundle() {
      if (!fs.existsSync(CODEX_SRC)) {
        this.warn(`설정집 원본을 찾지 못했습니다: ${CODEX_SRC}`)
        return
      }
      const out = path.resolve(here, 'dist/world/celestiel-codex.html')
      fs.mkdirSync(path.dirname(out), { recursive: true })
      fs.copyFileSync(CODEX_SRC, out)
    },
  }
}

export default defineConfig({
  plugins: [react(), codex()],
  server: {
    port: 5174,
    strictPort: true,
  },
})
