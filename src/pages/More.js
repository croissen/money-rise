import { useNavigate } from 'react-router-dom';
import * as S from './More.styles';

export default function More() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <h2>More 메뉴</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ margin: '10px 0', cursor: 'pointer', color: 'blue' }} onClick={() => navigate('/faq')}>
          📘 FAQ
        </li>
        <li style={{ margin: '10px 0', cursor: 'pointer', color: 'blue' }} onClick={() => navigate('/notice')}>
          📢 공지사항
        </li>
        <li style={{ margin: '10px 0', cursor: 'pointer', color: 'blue' }} onClick={() => navigate('/event')}>
          🎉 이벤트
        </li>
        <li style={{ margin: '10px 0', cursor: 'pointer', color: 'blue' }} onClick={() => navigate('/terms')}>
          📄 약관 및 정책
        </li>
      </ul>
    </S.Container>
  );
}
