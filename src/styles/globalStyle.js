import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    // Importação das fontes ultilizadas

    @font-face {
        font-family: 'SourceSerif';
        src: url('/src/assets/fonts/SourceSerif4-Medium.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'SourceSerif';
        src: url('/src/assets/fonts/SourceSerif4-Black.ttf') format('truetype');
        font-weight: 900;
        font-style: normal;
    }

    // Configuração geral da página

    * {
        margin: 0;
        padding: 0;
    }
`

export default GlobalStyles