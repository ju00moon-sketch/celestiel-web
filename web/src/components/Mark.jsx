// CELESTIEL 로고 마크
// 바깥 고리 = 아이테리온(뚜껑) · 헤일로 / 안쪽 원반 = 원반 세계
// 원반을 가르는 틈 = 킨네리아 재의 회랑 / 고리 위의 점 = 오차 없는 태양
// 색은 currentColor를 따르므로 놓이는 자리의 색과 호버를 그대로 물려받는다.
export default function Mark({ size = 20, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M7.56 15A8.5 8.5 0 0 1 24.44 15Z" />
      <path d="M7.56 17A8.5 8.5 0 0 0 24.44 17Z" />
      <circle cx="25.9" cy="6.1" r="2.6" />
    </svg>
  )
}
