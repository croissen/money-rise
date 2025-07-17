import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as S from './Home.styles';

export default function Home() {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    document.title = '머니머니 - Moneyrise.net';
  }, []);

  const handleLogoClick = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const newCount = clickCount + 1;

    if (newCount === 5) {
      // 비밀번호 체크 없이 바로 이동
      navigate('/bin-page');
      setClickCount(0);
      return;
    }

    setClickCount(newCount);

    timerRef.current = setTimeout(() => {
      setClickCount(0);
    }, 1000);
  };

  return (
    <S.Container>
      <S.Orbit>
        <S.Planet $pos="top" style={{ cursor: 'pointer' }} onClick={() => navigate('/goal-amount-calculator')}>
          <S.PlanetInner>계산기</S.PlanetInner>
        </S.Planet>
        <S.Planet $pos="right" style={{ cursor: 'pointer' }} onClick={() => navigate('/auto-number')}>
          <S.PlanetInner>로또</S.PlanetInner>
        </S.Planet>
        <S.Planet $pos="bottom" style={{ cursor: 'pointer' }} onClick={() => navigate('/empty-page')}>
          <S.PlanetInner>소개</S.PlanetInner>
        </S.Planet>
        <S.Planet $pos="left" style={{ cursor: 'pointer' }} onClick={() => navigate('/qna')}>
          <S.PlanetInner>건의</S.PlanetInner>
        </S.Planet>
      </S.Orbit>

      <S.Wizard src={`${process.env.PUBLIC_URL}/images/wizard.png`} alt="Logo" />
      <S.Logo src={`${process.env.PUBLIC_URL}/images/rabbit.png`} onClick={handleLogoClick} />
    </S.Container>
  );
}
