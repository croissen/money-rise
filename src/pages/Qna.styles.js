import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
`;

export const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 24px;
  color: #333;
  body.dark-mode & {
    background-color: #1e1e1e;
    color: #e0e0e0;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 500px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  height: 120px;
  resize: none;
`;

export const Button = styled.button`
  padding: 12px;
  background: #333;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: none;

  &:hover {
    background: #555;
  }
`;

export const InquiryList = styled.div`
  width: 100%;
  max-width: 500px;
`;

export const InquiryItem = styled.div`
  background: white;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Answer = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #ccc;
  color: #444;
`;
export const QnaTitle = styled.strong`
  max-width: 400px;
  body.dark-mode & {
    color: #444;
  }
`;
export const QnaContent = styled.div`
  max-width: 400px;
  white-space: pre-wrap; /* 줄바꿈 있는 텍스트도 보이게 */
  word-break: break-word; /* 긴 단어도 줄바꿈되게 */
  overflow-wrap: break-word;
  overflow: hidden; /* 넘치는 건 숨김 처리 */

  body.dark-mode & {
    color: #444;
  }

  @media (max-width: 480px) {
    max-width: 300px;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;
`;

export const PageButton = styled.button`
  padding: 6px 12px;
  background-color: ${({ $active }) => ($active ? '#007bff' : '#e0e0e0')};
  color: ${({ $active }) => ($active ? '#fff' : '#000')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;