import React, { useState, useEffect } from 'react';
import * as S from './Header.styles';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { path: '/goal-amount-calculator', label: '목표 금액 계산기' },
  { path: '/auto-number', label: '로또 번호 채굴' },
  { path: '/golden-items', label: '황금아이템' },
  { path: '/squad', label: '축구 스쿼드' },
];

const getPageName = (pathname) => {
  const found = menuItems.find(item => item.path === pathname);
  return found ? found.label : 'MoneyRise';
};

export default function Header() {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const currentPageName = getPageName(location.pathname);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const handleLinkClick = () => setDropdownOpen(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return (
    <S.HeaderWrapper>
      <S.Wrapper>
        <S.LogoBox as={Link} to="/">
          <S.Logo src={`${process.env.PUBLIC_URL}/images/rabbit.png`} alt="Logo" />
          <S.LogoText className="pc-only">MoneyRi$e</S.LogoText>
        </S.LogoBox>

        <S.Center className="pc-only">
          {menuItems.map(item => (
            <S.StyledLink key={item.path} to={item.path}>
              {item.label}
            </S.StyledLink>
          ))}
        </S.Center>

        <S.RightSection>
          <S.DarkModeToggle onClick={toggleDarkMode}>
            {isDarkMode ? '🌙' : '🌞'}
          </S.DarkModeToggle>
        </S.RightSection>

        {/* 모바일 */}
        <S.MobileMenuWrapper className="mobile-only">
          <S.MobileLogoText onClick={toggleDropdown} style={{ cursor: 'pointer', userSelect: 'none' }}>
            {currentPageName} <span style={{ marginLeft: 4, fontSize: '10px' }}>﹀</span>
          </S.MobileLogoText>

          {dropdownOpen && (
            <S.MobileDropdown>
              {menuItems.map(item => (
                <S.MobileDropdownLink
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  $active={location.pathname === item.path}
                >
                  {item.label}
                </S.MobileDropdownLink>
              ))}
            </S.MobileDropdown>
          )}
        </S.MobileMenuWrapper>
      </S.Wrapper>
    </S.HeaderWrapper>
  );
}
