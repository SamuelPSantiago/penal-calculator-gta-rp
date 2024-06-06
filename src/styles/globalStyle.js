import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    // Importação das fontes ultilizadas

    @font-face {
        font-family: 'GGSans';
        src: url('/fonts/ggsans-Regular.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'GGSans';
        src: url('/fonts/ggsans-Medium.ttf') format('truetype');
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: 'GGSans';
        src: url('/fonts/ggsans-Semibold.ttf') format('truetype');
        font-weight: 600;
        font-style: normal;
    }

    @font-face {
        font-family: 'GGSans';
        src: url('/fonts/ggsans-Bold.ttf') format('truetype');
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: 'Abcgintonord';
        src: url('/fonts/ABCGintoNordCondensed-Black-Trial-BF651b7b77b5cf2.otf') format('opentype');
        font-weight: 800;
        font-style: normal;
    }
    
    // Configuração geral da página

    * {
        margin: 0;
        padding: 0;
    }
`

export default GlobalStyles