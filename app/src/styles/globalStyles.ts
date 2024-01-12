import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: K2D, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-family: Open-Sans, Helvetica, Sans-Serif;
    font-family: Inter;
    /* overflow: hidden; */
  }
  * {
    margin:0;
    padding:0;
    box-sizing: border-box;
    color: #1F1F1F;
  }
  ::-webkit-scrollbar {
  width: 2px;
  height: 2px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    background: transparent
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    /* background-image: linear-gradient(45deg, #00aeff, #a68eff); */
    border-radius: 10px;
  }
 
 
`;

export default GlobalStyle;
