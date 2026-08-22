// 설정집은 React로 옮기지 않고 원본 HTML을 그대로 연다.
// 자체 내비게이션과 「진실 보기」 토글을 가진 독립 문서라서,
// 페이지 안에 끼워 넣으면 내비가 두 겹이 된다.
const CODEX_URL = '/world/celestiel-codex.html'

const TOPICS = [
  {
    tag: 'THE WORLD',
    title: '완전한 원반',
    body: '남쪽에 인간의 땅, 북쪽에 마족의 땅, 그 사이에 재의 회랑. 가장자리는 「끝」이라 불린다.',
  },
  {
    tag: 'CAUSALITY',
    title: '인과율과 카르마',
    body: '순리와 역리, 그리고 갚지 못한 인과가 쌓이는 장부. 이 세계의 법은 세 개의 조문으로 되어 있다.',
  },
  {
    tag: 'CELESTIAL ORDER',
    title: '천족의 위계',
    body: '절대신부터 이름 없는 하위천사까지 여섯 계급. 보는 자와 판단하는 자가 갈라져 있다.',
  },
  {
    tag: 'THE GENERATIONS',
    title: '세대 연표',
    body: '창세와 심판이 반복되어 온 시간의 기록. 지금은 창세력 1347년이다.',
  },
]

export default function World() {
  return (
    <>
      <div
        className="page-cover"
        style={{ backgroundImage: "url('/world/art/covers/world-cover.jpg')" }}
        aria-hidden="true"
      />
      <div className="wrap page">
        <div className="eyebrow">CODEX</div>
        <h1>세계관 설정집</h1>
        <p className="lead">
          CELESTIEL의 설정 전문입니다. 세계 구조, 인과율, 천족과 마족, 세대
          연표, 지리, 그리고 콘텐츠 로드맵까지 담겨 있습니다.
        </p>

        <p style={{ marginBottom: '20px' }}>
          문서 안에는 <strong>「진실 보기」</strong> 토글이 있습니다. 켜면
          교단이 가르치는 내용 아래에 실제로 무슨 일이 벌어지고 있는지가 함께
          보입니다.
        </p>

        <div className="notice" style={{ marginBottom: '28px' }}>
          주의 — 설정집은 개발 문서 전문이라{' '}
          <strong>게임의 핵심 반전을 포함한 강한 스포일러</strong>가 있습니다.
          스포일러 없이 즐기고 싶다면 게임을 먼저 플레이하세요.
        </div>

        <a className="btn" href={CODEX_URL}>
          설정집 전문 읽기 →
        </a>

        <div className="grid" style={{ marginTop: '48px' }}>
          {TOPICS.map(({ tag, title, body }) => (
            <div className="card" key={title}>
              <div className="tag">{tag}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
