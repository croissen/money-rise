// GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    overflow-y: scroll; /* 항상 스크롤바 보이게 */
    font-family: 'Noto Sans KR', sans-serif;
    scroll-behavior: smooth;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;