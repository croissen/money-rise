import styled from 'styled-components';

export const Container = styled.div`
  padding: 1.5rem;
  max-width: 72rem; /* 6xl */
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 1.5rem; /* 2xl */
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
`;

export const TabButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 9999px; /* full */
  font-size: 0.875rem; /* sm */
  font-weight: 500;
  transition: background-color 0.3s ease;
  color: ${(props) => (props.active ? 'white' : '#4B5563')}; /* gray-600 */
  background-color: ${(props) => (props.active ? '#2563EB' : '#F3F4F6')}; /* blue-600 / gray-100 */

  &:hover {
    background-color: ${(props) =>
      props.active ? '#2563EB' : '#E5E7EB'}; /* hover:bg-gray-200 */
  }

  border: none;
  cursor: pointer;
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 기본은 모바일 2열 */
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr); /* PC에서 5열 (1024px 이상) */
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const ItemTitle = styled.p`
  margin-top: 0.5rem;
  font-size: 14px;
  height: 40px;
  max-height: calc(20px * 2); 
  text-align: center;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Notice = styled.p`
  font-size: 0.85rem;
  color: #777;
  margin-top: 1.5rem;
  text-align: center;
  line-height: 1.4;
`;

export const ItemPrice = styled.p`
  font-size: 0.9rem;
  color: #333;
  font-weight: bold;
  margin-top: -0.5rem;
`;