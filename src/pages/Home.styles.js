import styled, { keyframes } from 'styled-components';

// 궤도 회전
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// 행성 내부 텍스트 반대 방향 회전
const counterSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

export const Container = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 50px auto;
  border-radius: 200px;
  overflow: visible; /* 추가 */
  body.dark-mode & {
    background-color: yellow;
  }
`;

export const Logo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 150px;
  transform: translate(-50%, -50%);
`;
export const Wizard = styled.img`
  position: absolute;
  top: 105%;
  left: 52%;
  height: 600px;
  transform: translate(-50%, -50%);
  pointer-events: none; // 클릭 이벤트 무시
  @media (max-width: 480px) {
    height: 550px;
    top: 100%;
  }
`;

export const Orbit = styled.div`
  position: absolute;
    height: 300px;
    width: 300px;
    top: 1%;
    left: 0%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  animation: ${spin} 12s linear infinite;
    pointer-events: none; // 🔹 Orbit 자체는 클릭 막음
  & > div {
    pointer-events: auto; // 🔹 행성은 클릭 가능
  }
    
`;

export const Planet = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #4a90e2;
  border-radius: 50%;
  box-shadow: 0 0 8px #4a90e2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 10; // 🔹 앞으로 보내기
  cursor: pointer; // 🔹 마우스 포인터 변경
  will-change: transform; // 🔹 transform 애니메이션 최적화

  ${({ $pos }) => {
    switch ($pos) {
      case 'top':
        return `top: 0; left: 50%; transform: translateX(-50%);`;
      case 'right':
        return `top: 50%; right: 0; transform: translateY(-50%);`;
      case 'bottom':
        return `bottom: 0; left: 50%; transform: translateX(-50%);`;
      case 'left':
        return `top: 50%; left: 0; transform: translateY(-50%);`;
      default:
        return '';
    }
  }}
`;

export const PlanetInner = styled.div`
  color: white;
  font-size: 11px;
  font-weight: bold;
  animation: ${counterSpin} 12s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

