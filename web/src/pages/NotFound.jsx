import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="wrap page">
      <div className="eyebrow">404</div>
      <h2>이 자리에는 아무것도 없습니다</h2>
      <p className="lead">주소가 잘못되었거나, 아직 만들어지지 않은 페이지입니다.</p>
      <Link className="btn" to="/">
        홈으로
      </Link>
    </div>
  )
}
