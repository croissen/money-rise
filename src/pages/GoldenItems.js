import React, { useState, useEffect } from 'react';
import * as S from './GoldenItems.styles';

const TABS = ['케데헌', '장마', '자취생 꿀템', '머니머니 앤 힐링'];

export default function GoldenKeyword() {
  const [activeTab, setActiveTab] = useState('케데헌');
  const [itemsData, setItemsData] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/goldenItems.json`)
      .then((res) => res.json())
      .then((data) => setItemsData(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (itemsData && itemsData[activeTab]) {
      setItems(itemsData[activeTab]);
    }
  }, [activeTab, itemsData]);

  return (
    <S.Container>
      <S.Title>관심있는 키워드를 찾아보세요!</S.Title>

      <S.TabsContainer>
        {TABS.map((tab) => (
          <S.TabButton
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </S.TabButton>
        ))}
      </S.TabsContainer>

      <S.ItemsGrid>
        {items.map((item) => (
          <S.Item key={item.id}>
            <S.ItemLink href={item.link} target="_blank" rel="noopener noreferrer">
              <S.ItemImage src={item.image} alt={item.title} />
              <S.ItemTitle>{item.title}</S.ItemTitle>
              <S.ItemPrice>{item.price}</S.ItemPrice>
            </S.ItemLink>
          </S.Item>
        ))}
      </S.ItemsGrid>

      <S.Notice>
        '머니라이즈'에는 쿠팡파트너스 등의 제휴링크가 포함되어 있으며 수수료를 제공받을 수 있습니다.
      </S.Notice>
    </S.Container>
  );
}
