// src/pages/AdsPage.js
import React from 'react';
import AdsBanner from '../components/AdsBanner';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

export default function AdsPage() {
  return (
    <Container>
      <h1>광고 공간 관리 페이지</h1>

      <Section>
        <h2>상단 배너 광고</h2>
        <AdsBanner />
      </Section>

      <Section>
        <h2>사이드바 광고</h2>
        <AdsBanner />
      </Section>

      <Section>
        <h2>본문 중간 광고</h2>
        <AdsBanner />
      </Section>
    </Container>
  );
}
