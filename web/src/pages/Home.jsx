import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1 className="display">CELESTIEL</h1>
          <div className="sub">셀레스티엘</div>
          <p className="tagline">
            세계는 처음이 아니다. 이번이 스물다섯 번째다.
          </p>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: '96px' }}>
        <div className="grid">
          <Link to="/world" className="card">
            <div className="tag">CODEX</div>
            <h3>세계관 설정집</h3>
            <p>
              원반형 세계, 인과율과 카르마, 천족의 위계, 스물다섯 번의 세대.
              설정 전문을 읽습니다.
            </p>
          </Link>

          <Link to="/download" className="card">
            <div className="tag">DOWNLOAD</div>
            <h3>다운로드</h3>
            <p>빌드 배포 예정입니다. 아직 받을 수 있는 파일이 없습니다.</p>
          </Link>
        </div>
      </section>
    </>
  )
}
