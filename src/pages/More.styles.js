import styled from 'styled-components';

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