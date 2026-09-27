import { useEffect, useState } from 'react'

// 개발 진행 현황 — 2026년 9월 기준. 이미지는 이 페이지에서만 쓴다(art/progress/).
const ART = '/world/art/progress/'

const SECTIONS = [
  {
    id: 'combat',
    tag: 'COMBAT',
    title: '전투 시스템',
    status: '시제품 완성 · 다음 단계 설계 중',
    body: [
      '적의 공격에 박자를 맞춰 막고 피하는 반응형 전투를 시제품으로 완성했습니다. 아군은 위치와 구역(정면·측면·배후)을 골라 행동하고, 경직·연계·엄호가 판정에 얽힙니다.',
      '캄포 비에호 마을 옆 공터에서 여섯 단계로 전투를 익히는 튜토리얼이 들어갔습니다. 카메라는 인물이 적을 가리지 않는 각도를 스스로 찾고, 모든 전투는 사건·입력 기록으로 다시 재생해 결과가 같은지 검증합니다.',
      '다음은 속도에 따라 차례가 오는 턴 구조, 여러 몬스터를 상대하는 일반 전투, 전장을 움직이며 패턴을 쓰는 보스, 차례마다 움직이는 카메라입니다. 설계서를 쓰는 단계입니다.',
    ],
    shots: [
      { src: 'tut-clearing-overview.jpg', alt: '공터 튜토리얼 조망과 안내', cap: '공터 튜토리얼 — 조망과 단계 안내' },
      { src: 'tut-combat-action.jpg', alt: '전투 행동 장면', cap: '행동 장면 — 대역 인물과 적' },
      { src: 'tut-combat-result.jpg', alt: '라운드 결과와 대응 박자 줄', cap: '라운드 결과와 대응 박자' },
      { src: 'tut-camera-react.jpg', alt: '카메라가 인물 가림을 피해 돌아간 구도', cap: '카메라 — 인물 가림 회피' },
    ],
  },
  {
    id: 'character',
    tag: 'CHARACTER',
    title: '캐릭터 모델링',
    status: '여주인공 얼굴 확정 · 헤어·체형 조정 중',
    body: [
      '여주인공의 얼굴을 확정하고, 그 얼굴을 그대로 지키면서 헤어와 체형을 다듬고 있습니다. 헤어는 반묶음에 긴 물결 머리로 다시 만드는 중이고, 목·손목·골반 비율을 여러 판으로 비교해 조정했습니다.',
      '몸은 열네 조각의 모듈로 나누어 리그와 함께 엔진 쪽에 넘겼고, 게임 안에서 외형을 붙이는 연결 코드가 1단계까지 들어갔습니다. 옷과 장신구는 그다음 단계입니다.',
    ],
    links: [
      { href: '/review/heroine-hair/', label: '헤어·얼굴 작업 비교(레퍼런스 v2 첫 판, 미세조정, 귀 정리, 목·손목)' },
      { href: '/review/render-compare/', label: '렌더 실행 담당 비교(같은 요청서를 두 세션이 실행)' },
      { href: '/review/body-v003/', label: '체형 v003 비교 페이지(1차·2차 전후)' },
    ],
    shots: [
      { src: 'heroine-face-front.jpg', alt: '여주인공 얼굴 정면', cap: '확정 얼굴 — 정면' },
      { src: 'heroine-face-45.jpg', alt: '여주인공 얼굴 45도', cap: '확정 얼굴 — 45°' },
      { src: 'heroine-hair-front.jpg', alt: '헤어 작업 정면', cap: '헤어 작업 — 정면' },
      { src: 'heroine-hair-34.jpg', alt: '헤어 작업 45도', cap: '헤어 작업 — 45°' },
      { src: 'heroine-hair-side.jpg', alt: '헤어 작업 측면', cap: '헤어 작업 — 측면' },
      { src: 'heroine-hair-back.jpg', alt: '헤어 작업 뒤', cap: '헤어 작업 — 뒤' },
      { src: 'heroine-body-v3a-compare.jpg', alt: '체형 v003 전후 비교 — 레퍼런스, 이전 판, 이번 판을 정면·45°·옆·뒤로 비교', cap: '체형 v003 1차 — 레퍼런스 / 이전(v2d) / 이번(v3a), 회색 점검 재질' },
      { src: 'heroine-body-v3a-hips.jpg', alt: '골반·엉덩이 근접 4방향 전후', cap: '체형 v003 — 골반·엉덩이 근접 전후(둔부 아래 접힘은 다음 판에서 보완)' },
      { src: 'heroine-body-v3a-face.jpg', alt: '얼굴 확대 전후 — 변화 없음', cap: '체형 작업 중 얼굴 불변 확인' },
    ],
  },
  {
    id: 'level',
    tag: 'LEVEL',
    title: '레벨 디자인 — 캄포 비에호',
    status: '블록아웃 완성 · 준완성 단계 진행 중',
    body: [
      '첫 마을 캄포 비에호를 집 열세 채, 예배당, 우물, 밭, 전투 공터까지 블록아웃으로 세웠습니다. 해질녘 조명과 흙길의 물웅덩이·젖은 흙 재질을 넣었고, 초가집·우물·팻말은 사실풍 모델로 바꾸는 1단계를 마쳤습니다.',
      '이어서 풀·덤불·나무와 마을 소품을 채우고, 패키지에서 프레임 시간을 재어 성능 기준을 정합니다.',
    ],
    shots: [
      { src: 'campo-village-start.jpg', alt: '캄포 비에호 입구', cap: '마을 입구 — 팻말·우물·물웅덩이' },
      { src: 'campo-lighting-kv.jpg', alt: '캄포 비에호 조명 시험', cap: '해질녘 조명' },
      { src: 'campo-top.jpg', alt: '마을 위에서 본 배치', cap: '위에서 본 마을 배치' },
      { src: 'campo-square.jpg', alt: '마을 광장', cap: '광장과 우물' },
      { src: 'prop-cottage.jpg', alt: '초가집 모델', cap: '사실풍 소품 — 초가집' },
      { src: 'prop-well.jpg', alt: '우물 모델', cap: '사실풍 소품 — 우물' },
      { src: 'prop-sign.jpg', alt: '입구 팻말 모델', cap: '사실풍 소품 — 입구 팻말' },
    ],
  },
]

const DOCS = [
  {
    title: '결정 기록',
    file: 'decisions.html',
    desc: '기획 방향·수치·외형에 대한 확정 결정을 날짜순으로 모은 기록.',
  },
  {
    title: '속도 턴·다수 적·보스 이동 설계서 v0.2',
    file: 'combat-speedturn-design-v0-2.html',
    desc: '다음 전투 구조의 통합 설계서. 확인 대기 항목 여섯 가지 포함.',
  },
  {
    title: '캄포 비에호 준완성 계획 v0.1',
    file: 'level-campoviejo-semicomplete-plan-v0-1.html',
    desc: '첫 마을을 준완성으로 끌어올리는 단계·에셋·검증 계획.',
  },
  {
    title: '전투 규칙 사양 v0.3',
    file: 'features-combat-tactics-v0-3.html',
    desc: '전술 전투의 판정·구역·경직·연계 규칙(개발팀 승인본).',
  },
]

export default function Progress() {
  const [open, setOpen] = useState(null) // { src, alt, cap }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <div
        className="page-cover"
        style={{ backgroundImage: "url('/world/art/covers/progress-cover.jpg')" }}
        aria-hidden="true"
      />
      <div className="wrap page">
        <div className="eyebrow">PROGRESS</div>
        <h1>개발 진행 현황</h1>
        <p className="lead">
          2026년 9월 기준으로 만들어진 것을 모았습니다. 화면은 모두 개발 중인
          블록아웃과 시제품이라 최종 모습과 다릅니다.
        </p>
        <p>
          <a className="btn" href="/status/">
            목표 현황판(목표 세 가지 진행·결정 대기·오늘 결과)
          </a>
        </p>

        {SECTIONS.map(({ id, tag, title, status, body, shots, links }) => (
          <section key={id} id={id} className="progress-section">
            <div className="tag">{tag}</div>
            <h2>{title}</h2>
            <div className="status">{status}</div>
            {body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {links && (
              <p>
                {links.map((l) => (
                  <a className="btn" key={l.href} href={l.href} style={{ marginRight: '10px' }}>
                    {l.label}
                  </a>
                ))}
              </p>
            )}
            <div className="shots">
              {shots.map((s) => (
                <button
                  type="button"
                  className="shot"
                  key={s.src}
                  onClick={() => setOpen(s)}
                  aria-label={`${s.cap} 크게 보기`}
                >
                  <img src={ART + s.src} alt={s.alt} loading="lazy" />
                  <span>{s.cap}</span>
                </button>
              ))}
            </div>
          </section>
        ))}

        <section id="docs" className="progress-section">
          <div className="tag">DOCUMENTS</div>
          <h2>기획 문서</h2>
          <p>
            기획·설계·검토·결정 문서 전체는 문서 보관함에 있습니다. 확정된 것과
            제안·초안 단계인 것이 함께 있으니 상태 표시를 보고 읽어 주세요.
          </p>
          <p>
            <a className="btn" href="/docs/">
              문서 보관함 전체 보기
            </a>
          </p>
          <div className="grid">
            {DOCS.map(({ title, file, desc }) => (
              <a className="card" key={file} href={`/docs/${file}`}>
                <div className="tag">DOC</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </a>
            ))}
          </div>
        </section>
      </div>

      {open && (
        <div className="lightbox" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={ART + open.src} alt={open.alt} />
            <figcaption>{open.cap}</figcaption>
          </figure>
          <button type="button" className="lightbox-close" onClick={() => setOpen(null)} aria-label="닫기">
            ×
          </button>
        </div>
      )}
    </>
  )
}
