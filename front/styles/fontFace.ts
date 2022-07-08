import reset from 'styled-reset';

export const fontFace = `
  ${reset}
  @font-face {
    font-display: swap;
    font-family: "BMeuljiro";
    font-weight: 900;
    src: url("/fonts/BMEULJIRO.woff") format("woff");
  }
  @font-face {
    font-display: swap;
    font-family: "BMJUA";
    font-weight: 600;
    src: url("/fonts/BMJUA.woff") format("woff");
  }
  @font-face {
    font-display: swap;
    font-family: "BMHANNA";
    font-weight: 600;
    src: url("/fonts/BMHANNA_11yrs.woff") format("woff");
  }
  @font-face {
    font-display: swap;
    font-family: "BMHANNAAir";
    src: url("/fonts/BMHANNAAir.woff") format("woff");
  }
`;

export default fontFace;
