// 배포할 빌드가 생기면 이 배열에 항목을 추가하면 목록이 채워진다.
// { platform: 'Windows', version: '0.1.0', size: '1.2 GB', href: '/builds/...' }
const BUILDS = []

export default function Download() {
  return (
    <div className="wrap page">
      <div className="eyebrow">DOWNLOAD</div>
      <h2>다운로드</h2>

      {BUILDS.length === 0 ? (
        <>
          <p className="lead">아직 배포된 빌드가 없습니다.</p>
          <div className="notice">
            빌드가 준비되면 이 자리에 플랫폼별 내려받기 목록이 표시됩니다.
            <br />
            추가 방법 — <code>src/pages/Download.jsx</code>의{' '}
            <code>BUILDS</code> 배열에 항목을 넣으면 됩니다.
          </div>
        </>
      ) : (
        <div className="grid">
          {BUILDS.map((b) => (
            <a className="card" key={`${b.platform}-${b.version}`} href={b.href}>
              <div className="tag">{b.platform}</div>
              <h3>v{b.version}</h3>
              <p>{b.size}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
