import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="hero hero-art">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('/world/art/key-visual.jpg')" }}
          aria-hidden="true"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-copy">
          <h1 className="display">CELESTIEL</h1>
          <div className="sub">셀레스티엘</div>
          <div className="orna" aria-hidden="true" />
          <p className="tagline">
            세계는 처음이 아니다. 이번이 스물다섯 번째다.
          </p>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: '56px' }}>
        <div className="grid">
          <Link to="/about" className="card card-art">
            <img src="/world/art/arenas/oculus.jpg" alt="" loading="lazy" />
            <div className="card-body">
              <div className="tag">ABOUT</div>
              <h3>게임 소개</h3>
              <p>
                모든 행동이 장부에 적히는 세계. 진실은 숨겨져 있지 않고,
                레이드는 세계를 영구히 바꿉니다.
              </p>
            </div>
          </Link>

          <Link to="/world" className="card card-art">
            <img src="/world/art/places/celestia-capital.jpg" alt="" loading="lazy" />
            <div className="card-body">
              <div className="tag">CODEX</div>
              <h3>세계관 설정집</h3>
              <p>
                원반형 세계, 인과율과 카르마, 천족의 위계, 스물다섯 번의 세대.
                설정 전문을 읽습니다.
              </p>
            </div>
          </Link>

          <Link to="/download" className="card card-art">
            <img src="/world/art/lands/kinneria.jpg" alt="" loading="lazy" />
            <div className="card-body">
              <div className="tag">DOWNLOAD</div>
              <h3>다운로드</h3>
              <p>빌드 배포 예정입니다. 아직 받을 수 있는 파일이 없습니다.</p>
            </div>
          </Link>
        </div>
      </section>

      <section
        className="band"
        style={{ backgroundImage: "url('/world/art/lands/meseta-region.jpg')" }}
      >
        <div className="wrap">
          <p>“셀레스 님의 품 안에서 우리는 안전하다.”</p>
          <small>안긴 것과 갇힌 것은, 안쪽에서는 구별되지 않는다</small>
        </div>
      </section>
    </>
  )
}
