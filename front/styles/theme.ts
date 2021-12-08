export const size = {
  pc: '1300px',
  laptop: '1024px',
  tablet: '768px',
  mobileL: '500px',
  mobileM: '425px',
  mobileS: '375px',
};

const theme = {
  color: {
    primary: '#344E5C',
    secondary: '#4AB19D',
    point: '#EFC958',
    black: '#000000',
    gray5: '#444444',
    gray4: '#767676',
    gray3: '#C6C6C6',
    gray2: '#E6E6E6',
    gray1: '#E5E5E5',
    gray0: '#FAFAFA',
    white: '#FFFFFF',
    success: '#22bb33',
    danger: '#bb2124',
    warning: '#f0ad4e',
    info: '#5bc0de',
  },
  window: {
    pc: `@media screen and (max-width: ${size.pc})`,
    laptop: `@media screen and (max-width: ${size.laptop})`,
    tablet: `@media screen and (max-width: ${size.tablet})`,
    mobileL: `@media screen and (max-width: ${size.mobileL})`,
    mobileM: `@media screen and (max-width: ${size.mobileM})`,
    mobileS: `@media screen and (max-width: ${size.mobileS})`,
  },
};

export default theme;
