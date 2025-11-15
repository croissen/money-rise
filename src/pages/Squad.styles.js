import styled from "styled-components";

export const FieldContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 20px auto 100px;
  background-color: rgb(14, 128, 21);
  border-radius: 12px;
  padding: 40px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;

  /* 배경 이미지 */
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* 모바일 대응 */
  @media (max-width: 480px) {
    padding: 30px 5px;
  }
`;

export const LineupContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 90px; /* 기본 간격 */
  flex-wrap: wrap; /* 모바일에서 줄바꿈 */
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`;

export const PlayerCircle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;

  .player-ball { 
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ bgColor }) => bgColor};
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 480px) {
      width: 30px;
      height: 30px;
    }
  }
`;

export const PlayerNumber = styled.div`
  font-weight: 700;
  font-size: 1.3rem;
  color: white;
  text-shadow:
    1px 1px 0 black,
   -1px 1px 0 black,
    1px -1px 0 black,
   -1px -1px 0 black;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const PlayerName = styled.div`
  font-size: 1rem;
  color: white;
  margin-top: 4px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;

  @media (max-width: 480px) {
    font-size: 0.75rem;
    max-width: 100px;
  }
`;

export const EmptySpot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .empty-ball {
    width: 40px;
    height: 40px;

    @media (max-width: 480px) {
      width: 30px;
      height: 30px;
    }
  }

  .empty-name-space {
    height: 4px;
    width: 80px;
    font-size: 0.65rem;

    @media (max-width: 480px) {
      width: 60px;
      font-size: 0.55rem;
    }
  }
`;

export const VsText = styled.h2`
  color: white;
  text-align: center;
  margin: 15px 0;
  font-size: 1.5rem;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const BaseTextDisplay = styled.div`
  position: absolute;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
  padding: 8px 10px;
  z-index: 10;

  ${({ side }) => side === 'home' && `top: 0;`}
  ${({ side }) => side === 'away' && `bottom: 0;`}
  ${({ align }) => align === 'left' && `left: 0;`}
  ${({ align }) => align === 'right' && `right: 0;`}

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 5px 8px;
  }
`;

export const TeamNameDisplay = styled(BaseTextDisplay)`
  font-size: 1.2rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const FormationDisplay = styled(BaseTextDisplay)`
  font-size: 1.2rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;
