import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: "BMeuljiro";
    font-weight: 900;
    src: url("/fonts/BMEULJIROTTF.ttf") format("truetype");
  }
  @font-face {
    font-family: "InkLipquid";
    font-weight: 200;
    src: url("/fonts/InkLipquidFonts.ttf") format("truetype");
  }
  @font-face {
    font-family: "BMJUA";
    font-weight: 600;
    src: url("/fonts/BMJUA_ttf.ttf") format("truetype");
  }
  @font-face {
    font-family: "BMHANNA";
    font-weight: 600;
    src: url("/fonts/BMHANNA_11yrs_ttf.ttf") format("truetype");
  }
  @font-face {
    font-family: "BMHANNAAir";
    src: url("/fonts/BMHANNAAir_ttf.ttf") format("truetype");
  }
`;

export default GlobalStyle;
