import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const MainContent = styled.main`
  min-height: 80vh;
  padding: 20px;
  background: #f8f9fa;

  body.dark-mode & {
    background-color: #1e1e1e;
    color: #e0e0e0;
  }
`;

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </>
  );
}
