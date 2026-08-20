import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

// 세계관 설정집은 「세계관 설정」 폴더의 원본 파일들이 유일한 원본이다.
// web/ 안으로 복사하면 원본을 고쳤을 때 사본이 뒤처지므로, 복사 대신 그 자리에서 서빙한다.
// 설정집은 개요·지리·천족·마족·인간 다섯 페이지와 공유 codex.css/codex.js로 구성된다.
const CODEX_DIR = path.resolve(here, '../세계관 설정')
const CODEX_BASE = '/world/'
const CODEX_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
}

function codex() {
  return {
    name: 'celestiel-codex',

    // 개발 서버: 원본 파일을 그대로 흘려보낸다 (저장하면 새로고침만으로 반영)
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url.startsWith(CODEX_BASE)) return next()
        const rel = decodeURIComponent(req.url.slice(CODEX_BASE.length)).split('?')[0]
        // 폴더 탈출 방지: 파일명 하나만 허용
        if (!/^[\w.\-]+$/.test(rel)) return next()
        const type = CODEX_TYPES[path.extname(rel)]
        if (!type) return next()
        const file = path.join(CODEX_DIR, rel)
        if (!fs.existsSync(file)) return next()
        res.setHeader('Content-Type', `${type}; charset=utf-8`)
        fs.createReadStream(file).pipe(res)
      })
    },

    // 빌드: dist 안으로 복사해 넣어야 배포본이 완전해진다
    closeBundle() {
      if (!fs.existsSync(CODEX_DIR)) {
        this.warn(`설정집 폴더를 찾지 못했습니다: ${CODEX_DIR}`)
        return
      }
      const outDir = path.resolve(here, 'dist/world')
      fs.mkdirSync(outDir, { recursive: true })
      for (const name of fs.readdirSync(CODEX_DIR)) {
        if (!CODEX_TYPES[path.extname(name)]) continue
        fs.copyFileSync(path.join(CODEX_DIR, name), path.join(outDir, name))
      }
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
