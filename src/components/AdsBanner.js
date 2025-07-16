// src/components/AdsBanner.js
import React from 'react';
import styled from 'styled-components';

const BannerDesktop = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #eee;
  justify-content: center;
  align-items: center;
  color: #666;
  font-size: 1.2rem;
  border: 1px dashed #ccc;

  @media (max-width: 768px) {
    display: none;
  }
`;

const BannerMobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    width: 728px;
    height: 90px;
    background-color: #e0e0e0;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 1rem;
    border: 1px dashed #aaa;
  }
`;

export default function AdsBanner() {
  // 광고 존재 여부에 따라 표시 여부 결정 (추후 외부 조건으로 대체 가능)
  const isAdAvailable = true; // ← false로 바꾸면 아무 것도 렌더링되지 않음

  if (!isAdAvailable) return null;

  return (
    <>
      <BannerDesktop>PC 광고 배너 (100%)</BannerDesktop>
      <BannerMobile>모바일 광고 배너 (728x90)</BannerMobile>
    </>
  );
}
