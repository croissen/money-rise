import styled from 'styled-components';

export const MainWord = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const Container = styled.div`
  width: 400px;
  padding: 24px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  body.dark-mode & {
    background-color: #222;
    color: white;
    border-color: #666;
  }
                       
  @media (max-width: 480px) {
    max-width: 100%;
    padding: 10px;
    margin-left: 5px;
  }
`;
export const Parent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
  display: block;
  text-align: center;
`;

export const ResultText = styled.div`
  margin-top: 32px;
  font-size: 22px;
  color: #6200ee;
  text-align: center;
  font-weight: 700;
  @media (max-width: 480px) {
    padding: 12px;
    font-size: 20px;
    width: 295px;
  }
`;


export const Section = styled.section`
  margin-top: 40px;
  border-top: 1px solid #ccc;
  padding-top: 24px;
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  justify-content: space-between;
  padding: 0 10px;
`;

export const Dropdown = styled.select`
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #aaa;
  cursor: pointer;
`;

export const InputNumber = styled.input`
  width: 60px;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #aaa;
  text-align: center;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background-color: #6200ee;
  color: white;
  font-weight: 700;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #4500bb;
  }
  @media (max-width: 480px) {
    width: 50px;
  }
`;
export const StyledButton2 = styled.button`
  padding: 5px 5px;
  background-color: white;
  color: #6200ee;
  font-weight: 700;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  border: solid 1px #6200ee;

  &:hover {
    color: #4500bb;
    border: solid 1px #4500bb;
  }
`

export const NumberList = styled.div`
  display: flex;
  gap: 14px;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap; /* 한 줄로만 정렬 */
`;

export const NumberBall = styled.div`
  width: 36px;
  height: 36px;
  background-color: ${(props) => props.bgColor || '#6200ee'};
  color: white;
  font-weight: 700;
  font-size: 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  /* 막대기 연결 선 추가 */
  &::after {
    content: '';
    width: 18px;
    height: 4px;
    background-color: #ccc;
    position: absolute;
    right: -18px;
    top: 50%;
    transform: translateY(-50%);
  }

  &:last-child::after {
    display: none;
  }
`;


export const UserNumberInput = styled.input`
  width: 50px;
  height: 40px;
  font-size: 18px;
  text-align: center;
  border-radius: 6px;
  border: 1px solid #aaa;
`;

export const AnalysisResult = styled.div`
  margin-top: 16px;
  background-color: #f3f0ff;
  padding: 12px;
  border-radius: 6px;
`;

export const AnalysisItem = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;
export const ButtonDiv = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: end;
  gap: 5px;
`;
export const Chepter1Right = styled.div`
  display: flex;
  gap: 10px;
`;

export const RandomPhrase = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin-right: 8px;
  white-space: nowrap;
  body.dark-mode & {
    background-color: #222;
    color: white;
    border-color: #666;
  }
  @media (max-width: 480px) {
    width: 100px;
  }
`;

export const StyledSelect = styled.select`
  width: 60px;
  border: 1px solid #aaa;
  border-radius: 6px;
  font-size: 14px;
  
  @media (max-width: 480px) {
    font-size: 14px;
    width: 60px;
  }
`;
export const LastWinningContainer = styled.div`
  width: 400px;
  margin-bottom: 16px;
  padding: 16px 24px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0,0,0,0.03);
  text-align: center;
  body.dark-mode & {
    background-color: #222;
    color: white;
    border-color: #666;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px;
  }
`;

export const LastWinningTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const LastWinningNumbers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
`;
export const Bonus = styled.span`
  margin : 0 0 0 15px; 
  font-size: 35px;
  margin-bottom: 5px;
`;

export const InputBall = styled.input`
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.bgColor || '#ddd'};
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  margin: 0 4px;
  border: none;
  outline: none;
  -moz-appearance: textfield;

  /* 숫자 input 화살표 제거 (크롬, 파이어폭스) */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  color: ${(props) =>
    props.bgColor && props.bgColor !== '#ddd' ? 'white' : '#666'};
`;

export const MatchResult = styled.div`
  margin-top: 12px;
  font-weight: bold;
  color: #444;
  text-align: center;
  body.dark-mode & {
    background-color: #222;
    color: white;
    border-color: #666;
  }
`;
export const EmptyBox1 = styled.div`
  height: 20px;
`;
export const EmptyBox2 = styled.div`
  height: 60px;
`;
