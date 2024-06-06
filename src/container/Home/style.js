import styled from 'styled-components'

// Todas as cores ultilizadas dentro da página

const Black = '#000'
const Grey = '#4D4D4D'

// Todos os tipos de textos ultilizdos dentro da página

export const Container = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Header = styled.header`
    margin: 50px 0 0 0;
    width: 50%;
    height: 150px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 4px dotted ${Black};
`

export const HeaderTitle = styled.h1`
    text-transform: uppercase;

    font-family: SourceSerif, serif;
    font-weight: 900;

    font-size: 45px;
`

export const Form1 = styled.div`
    padding: 20px 0 30px 0;
    
    width: 50%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-bottom: 4px dotted ${Black};
`

export const Form2 = styled.div`
    margin-bottom: 100px;
    padding: 20px 0 30px 0;
    
    width: 50%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 10px;
`

export const HeaderForm1 = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const HeaderForm2 = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
        width: 100%;
        margin-bottom: 10px;
    }
`

export const TitleForm = styled.h2`
    padding: 0 0 10px 0;

    text-transform: uppercase;

    font-family: SourceSerif, serif;
    font-weight: 900;
    font-size: 23px;
    color: ${Black};
`

export const LineForm = styled.div`
    margin-bottom: 10px;
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;

    gap: 10px;
`

export const LabelDataForm = styled.h2`
    margin: 0 0 -8px 0;
    width: 100%;
    height: auto;

    text-transform: uppercase;
    white-space: nowrap;

    font-family: SourceSerif, serif;
    font-weight: 900;

    font-size: 18px;
`

export const InputDataForm = styled.input`
    padding: 0 0 0 4px;

    width: 100%;
    height: 30px;

    border: none;
    border-bottom: 1px solid ${Black};

    font-family: SourceSerif, serif;
    font-weight: 400;

    font-size: 18px;
`

export const LineCheckBoxForm = styled.div`
    padding-left: 20px;
    margin-bottom: -10px;

    width: calc(100% - 20px);
    height: auto;

    display: flex;
    flex-direction: row;
    align-items: center;
`
export const CheckBoxForm = styled.input``

export const LabelCheckBoxForm = styled.h2`
    margin-left: 10px;
    
    width: 300px;
    height: auto;

    font-family: SourceSerif, serif;
    font-weight: 400;
    font-size: 16px;
    color: ${Black};
    text-align: left;
`

export const LineAccusationForm = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;

    gap: 10px;
`

export const CrimeAccusationForm = styled.button`
    border: none;
    background-color: #fff;

    font-family: SourceSerif, serif;
    font-weight: 400;
    font-size: 17px;
    color: ${Black};
    text-align: left;

    &:hover {
        cursor: pointer;
        text-decoration: line-through;
        color: ${Grey};
    }
`

export const ImageContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export const PastedImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border: 2px solid #ccc;
  border-radius: 4px;
`;