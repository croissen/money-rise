import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.header`
  width: 100%;
  border-bottom: 1px solid gray;
  background: white;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 10px 0;
  body.dark-mode & {
    background-color: #222;
    color: white;
    border-color: #666;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 300px;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 16px;
    display: grid;
    align-items: center;
  }
`;

export const LogoBox = styled.div`
  position: absolute;
  left: 24px;
  top: 40%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
  text-decoration: none;
  color: inherit;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    gap: 8px;
  }
`;

export const Logo = styled.img`
  width: 60px;
  height: 50px;
`;

export const LogoText = styled.span`
  font-weight: 600;
  font-size: 13px;
  font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
  body.dark-mode & {
    background-color: #222;
    color: white;
    border-color: #666;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;



export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 20px;
  cursor: pointer;
  padding: 0 20px;

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 768px) {
    justify-self: end;
  }
`;

export const Center = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ContentText = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
  margin-right: 20px;

  /* PC ~ 약간 좁은 화면까지는 말줄임 */
  @media (max-width: 1024px) and (min-width: 881px) {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  /* 880px 이하: 겹침 방지를 위해 아예 숨김 */
  @media (max-width: 880px) {
    display: none;
  }
`;

export const MobileMenuWrapper = styled.div`
  position: absolute;
  left: 30%;
  
`;

export const MobileDropdown = styled.div`
  position: absolute;
  top: 36px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
  z-index: 10;
  width: 180px;
`;

export const MobileDropdownLink = styled(Link)`
  display: block;
  padding: 12px 16px;
  color: #333;
  text-decoration: none;
  font-weight: ${props => (props.$active ? '700' : '400')};
  background-color: ${props => (props.$active ? '#eee' : 'transparent')};

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const MobileLogoText = styled.span`
  display: none;
  body.dark-mode & {
    background-color: #222;
    color: white;
    border-color: #666;
  }
  @media (max-width: 768px) {
    display: block;
    font-size: 20px;
    font-weight: bold;
    color: #222831;
    grid-column: 2;
    text-align: center;
  }
`;


export const RightSection = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
`;
export const DarkModeToggle = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: inherit;
`;