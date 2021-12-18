export const size = {
    pc: '1300px',
    laptop: '1024px',
    tablet: '768px',
    mobileL: '500px',
    mobileM: '425px',
    mobileS: '375px',
};

const theme = {
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
