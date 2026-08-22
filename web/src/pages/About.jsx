import { Link } from 'react-router-dom'

// 소개 문구는 전부 설정집(celestiel-codex.html)에 있는 내용에서만 가져온다.
// 플랫폼·출시일·가격처럼 정해지지 않은 것은 쓰지 않는다.

const PILLARS = [
  {
    tag: 'TRUTH',
    title: '진실은 숨겨져 있지 않다',
    body: '이 세계의 위화감은 숨겨진 문서가 아니라 풍경 속에 있다. 끝까지 간 뒤 처음 화면으로 돌아오면, 같은 장면이 완전히 다르게 읽힌다. 진실은 반전이 아니라 재독(再讀)이다.',
  },
  {
    tag: 'KARMA',
    title: '모든 행동이 장부에 적힌다',
    body: '살생도, 발굴도, 진실을 찾으려는 행동조차 카르마로 기록된다. 카르마가 높은 자는 천사가 먼저 노린다 — 죄가 곧 어그로다.',
  },
  {
    tag: 'WORLD SHIFT',
    title: '레이드가 세계를 영구히 바꾼다',
    body: '보스 격파는 보상이 아니라 사건이다. 레이드가 끝날 때마다 세계의 규칙이 하나씩 바뀌고, 사람들의 말과 지도가 영구히 달라진다. 되돌릴 수 없다.',
  },
  {
    tag: 'ASCENT',
    title: '하늘의 위계를 거슬러 오른다',
    body: '지상의 본편이 끝나면, 천상 아이테리온을 한 층씩 올라가는 레이드가 시작된다. 천족의 계급 구조가 그대로 콘텐츠 티어다. 정점에 무엇이 기다리는지는, 끝까지 올라간 자만이 본다.',
  },
]

const LANDS = [
  {
    tag: 'SOLARIA',
    title: '솔라리아 — 인간의 땅',
    body: '비옥하고 온화하며 대재해가 없다. 교단은 그것을 은총이라 가르친다. 여정은 남부 밀밭 마을 캄포 비에호에서 시작된다.',
  },
  {
    tag: 'KINNERIA',
    title: '킨네리아 — 재의 회랑',
    body: '수백 년째 전선인 띠 모양의 땅. 그리고 800년 전 문명의 유적이 가장 많이 묻힌 곳. 발굴하러 가는 곳이 곧 전선이다.',
  },
  {
    tag: 'SKARD',
    title: '스카르드 — 마족의 땅',
    body: '마족의 말로 「남은 것」. 왜 그렇게 부르는지는 그들 자신도 모른다. 지워도 지워도 돌아오는 자들이 사는 곳.',
  },
  {
    tag: 'AETHERION',
    title: '아이테리온 — 천상계',
    body: '눈부시게 아름답지만 사람이 살 수 없는 아름다움. 절대신은 내려오지 않으므로, 올라가는 수밖에 없다.',
  },
]

export default function About() {
  return (
    <>
      <div
        className="page-cover"
        style={{ backgroundImage: "url('/world/art/covers/about-cover.jpg')" }}
        aria-hidden="true"
      />
      <div className="wrap page">
      <div className="eyebrow">ABOUT</div>
      <h1>게임 소개</h1>
      <p className="lead">
        천상의 주인이 다스리는 완전한 원반 세계. 남쪽의 인간과 북쪽의 마족은
        수백 년째 전쟁 중이고, 교단은 창세력 1347년의 평화를 노래한다. 그런데
        지도는 너무 대칭이고, 태양에는 오차가 없고, 마족은 지워도 지워도
        돌아온다.
      </p>
      <p style={{ marginBottom: '38px' }}>
        <strong>당신은 이 세계가 무엇인지 묻게 된다.</strong> 이 게임은 그
        질문에서 시작한다.
      </p>

      <h2 style={{ marginTop: '48px' }}>네 개의 기둥</h2>
      <div className="grid">
        {PILLARS.map(({ tag, title, body }) => (
          <div className="card" key={tag}>
            <div className="tag">{tag}</div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: '48px' }}>세 개의 땅, 그리고 하늘</h2>
      <div className="grid">
        {LANDS.map(({ tag, title, body }) => (
          <div className="card" key={tag}>
            <div className="tag">{tag}</div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: '48px' }}>개발 상태</h2>
      <div className="notice" style={{ marginBottom: '28px' }}>
        언리얼 엔진 5로 개발 중입니다. 플랫폼과 출시 시기는 아직 정해지지
        않았으며, 정해지는 대로 이 사이트에 공개됩니다.
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link className="btn" to="/world">
          세계관 설정집 읽기
        </Link>
        <Link className="btn" to="/download">
          다운로드 (준비 중)
        </Link>
      </div>
      </div>
    </>
  )
}
