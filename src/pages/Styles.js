import styled from 'styled-components';

export const AdWrapper = styled.div`
  display: flex;
  justify-content: space-between;  /* 양쪽 끝에 배치 */
  gap: 20px;

  position: fixed;      /* 화면에 고정 */
  top: 120px;            /* 상단에서 20px 띄우기 */
  left: 0;
  right: 0;
  width: 100%;
  max-width: 1200px;    /* 필요에 따라 최대폭 지정 */
  margin: 0 auto;       /* 가운데 정렬 */

  padding: 0 20px;
  box-sizing: border-box;
  pointer-events: none; /* 광고 주변 빈 공간 클릭 막음 */

  z-index: 9999;        /* 다른 요소 위에 표시 */
  
  @media (max-width: 768px) {
    position: static;   /* 모바일에서는 일반 흐름으로 */
    width: auto;
    max-width: none;
    margin: 20px auto 0;
    pointer-events: auto;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

export const AdsArea = styled.div`
  pointer-events: auto; /* 배너 자체는 클릭 가능하게 */
  width: 320px;
  height: 600px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    height: 120px;
  }
`;

export const LiTitle = styled.li`
    font-size: 20px;
    padding: 5px;
`;
export const Bold = styled.span`
    font-weight: 500;
    font-size: 18px;
    margin-bottom: -10px;
`;
export const ExempleImg = styled.img`
    width: 100%;
`;
export const StaticText = styled.div`
  font-size: 16px;
  padding: 10px 0;
`;