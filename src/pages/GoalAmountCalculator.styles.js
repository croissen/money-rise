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
    background-color: #1e1e1e;
    color: #e0e0e0;
  }

  @media (max-width: 480px) {
    max-width: 325px;
    padding: 10px;
  }
`;
export const Parent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @media (max-width: 480px) {
    justify-content: flex-start;
    align-items: stretch;
  }

`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
`;

export const Label = styled.label`
  font-weight: 600;
  margin-top: 10px;
  display: block;
`;
export const MissonTitle = styled.div`
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  justify-content: space-between;

  @media (max-width: 480px) {
    width: 120px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
`;

// 다른 버튼, 인풋도 비슷하게 조절 가능
export const StyledInput = styled.input`
  border: 1px solid #aaa;
  padding: 12px;
  border-radius: 6px;
  font-size: 16px;
  width: 150px;
  height:20px;

  @media (max-width: 480px) {
    width: 120px;
    padding: 10px;
    font-size: 14px;
    margin-right: 3px;
  }
`;

export const TitleInput = styled.input`
  border: 1px solid #aaa;
  padding: 12px;
  border-radius: 6px;
  font-size: 18px;
  width: 100%;
  height: 24px;

  @media (max-width: 480px) {
    font-size: 16px;
    height: 20px;
    width: 295px;
  }
`;
export const AmountButton = styled.button`
  padding: 8px 12px;
  background-color: #6200ee;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
  margin: 0 2px;

  &:hover {
    background-color: #4500bb;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin: 0 1px;
    width: 38px;
  }
`;
export const MobileOneLine = styled.div`  
  @media (max-width: 480px) {
    display: flex;
  }
`;

export const StyledSelect = styled.select`
  width: 120px;
  padding: 12px;
  border: 1px solid #aaa;
  border-radius: 6px;
  font-size: 16px;
  
  @media (max-width: 480px) {
    font-size: 14px;
    width: 90px;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 25px;
  background-color: #6200ee;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background-color: #4500bb;
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 16px;
    width: 322px;
  }
`;
export const StyledButton2 = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 25px;
  color: #6200ee;
  background-color: white;
  font-size: 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  border: solid 1px #6200ee;
`

export const ResultText = styled.div`
  margin-top: 32px;
  font-size: 22px;
  color: #6200ee;
  text-align: center;
  font-weight: 700;
  body.dark-mode & {
    background-color: #222;
    color: white;
    border-color: #666;
  }
  @media (max-width: 480px) {
    padding: 12px;
    font-size: 20px;
  }
`;
export const CalenderDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: solid 1px gray;
  width: 170px;
  height: 40px;
  border-radius: 5px;
  padding-left:5px;
  body.dark-mode & {
    background-color: white;
  }

  @media (max-width: 480px) {
    width: 138px;
    font-size: 16px;
  }
`;
export const ResultText2 = styled.span`
 font-size: 16px;
 color: #555;
  body.dark-mode & {
    color: yellow;
  }
`;
