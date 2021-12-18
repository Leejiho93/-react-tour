import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        window: {
            pc: string;
            laptop: string;
            tablet: string;
            mobileL: string;
            mobileM: string;
            mobileS: string;
        };
    }
}
