import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
  position: relative;

  @media (max-width: 480px) {
    max-width: 480px;
    margin: 0 auto;
  }
`;

// 그룹: 이미지와 원형 텍스트를 같이 묶음
const GroupWrapper = styled.div`
  position: relative; /* 자식 absolute 기준 */
  width: 350px;
  height: 350px;

  @media (max-width: 480px) {
    width: 250px;
    height: 250px;
  }
`;

const Img = styled.div`
  width: 100%;
  height: 100%;
   background-image: url(${process.env.PUBLIC_URL + '/images/boy.png'});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  body.dark-mode & {
     background-image: url(${process.env.PUBLIC_URL + '/images/darkboy.png'});
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;

const CircleTextWrapper = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ${spin} 13s linear infinite;
  pointer-events: none;
`;

// 글자 하나하나 위치 잡는 wrapper
const CharWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 0 0;
`;

// 글자 스타일 (글자 방향 유지)
const CircleTextChar = styled.span`
  display: inline-block;
  font-size: 18px;
  color: #555;
  user-select: none;
  transform-origin: center center;

  animation: ${keyframes`
    from { transform: rotate(90deg); }
    to { transform: rotate(450deg); }
  `} 13s linear infinite;

  body.dark-mode & {
    color: white;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export default function EmptyPage() {
  useEffect(() => {
    document.title = '빈방 - Moneyrise.net';
  }, []);
  const text = '열심히 밤을 세우..며? 개발중입니다..! 잠시만 기다려주세요!';
  const chars = text.split('');
  const radius = 150; // 반지름 (GroupWrapper 크기 절반보다 조금 작게)
  const degreeIncrement = 360 / chars.length;

  return (
    <Container>
      <GroupWrapper>
        <Img />
        <CircleTextWrapper>
          {chars.map((char, i) => {
            const rotateDegree = i * degreeIncrement;
            return (
              <CharWrapper
                key={i}
                style={{
                  transform: `rotate(${rotateDegree}deg) translate(${radius}px)`,
                }}
              >
                <CircleTextChar>{char}</CircleTextChar>
              </CharWrapper>
            );
          })}
        </CircleTextWrapper>
      </GroupWrapper>
    </Container>
  );
}
