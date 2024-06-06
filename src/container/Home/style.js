import styled from 'styled-components'

// Todas as cores ultilizadas dentro da página

const DarkBlack = '#1E1F22';
const Black = '#2B2D31'
const LightBlack = '#313338'
const White = '#fff';
const Green = '#248046';
const Red = '#DA373C';

// Todos os tipos de textos ultilizdos dentro da página

export const Container = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: ${LightBlack};
`

export const Container2 = styled.div`
    width: 50%;
    height: auto;

    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;

    gap: 15px;

    &:only-child div {
        flex: none;
        width: 100%;
    }
`

export const Header = styled.header`
    height: 150px;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const HeaderTitle = styled.h1`
    text-transform: uppercase;

    font-family: GGSans, serif;
    font-weight: 700;

    font-size: 35px;
    color: ${White};
`

export const Form1 = styled.div`
    margin-bottom: 15px;
    padding: 20px 30px 30px 30px;
    
    width: 50%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    background-color: ${Black};
`

export const Form2 = styled.div`
    margin-bottom: 100px;
    padding: 20px 30px 30px 30px;
    
    width: 50%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 10px;

    border-radius: 10px;
    background-color: ${Black};
`

export const Form3 = styled.div`
    margin: 30px 0 15px 0 ;
    padding: 10px 30px 10px 30px;
    
    width: 50%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    background-color: ${Black};
`

export const Form4 = styled.div`
    margin-bottom: 15px;
    padding: 10px 0 10px 0;
    
    flex: 1;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    background-color: ${Black};
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
        
        span {
            input {
                font-family: GGSans, serif;
                font-weight: 500;
                border-radius: 5px;
                border: none;
                color: ${White};
                background-color: ${DarkBlack};
                font-size: 16px;
            }
        }
    }
`

export const TitleForm = styled.h2`
    text-transform: uppercase;

    padding: 0 0 10px 0;

    font-family: GGSans, serif;
    font-weight: 600;
    font-size: 23px;
    color: ${White};
`

export const LineForm = styled.div`
    margin-bottom: 15px;
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;

    gap: 10px;
`

export const LabelDataForm = styled.h2`
    margin: 0 0 -5px 0;
    width: 100%;
    height: auto;

    white-space: nowrap;

    font-family: GGSans, serif;
    font-weight: 600;

    color: ${White};

    font-size: 18px;
`

export const InputDataForm = styled.input`
    padding: 10px 10px;

    width: 100%;
    height: 40px;

    font-family: GGSans, serif;
    font-weight: 500;
    border-radius: 5px;
    border: none;
    color: ${White};
    background-color: ${DarkBlack};
    font-size: 16px;

    -webkit-appearance: none;
    outline: none;
    -moz-appearance: textfield;
    appearance: textfield;

    &::-webkit-inner-spin-button { 
        -webkit-appearance: none;
    }
`

export const LineCheckBoxForm = styled.div`
    padding-left: 20px;

    width: calc(100% - 20px);
    height: auto;

    display: flex;
    flex-direction: row;
    align-items: center;
`
export const CheckBoxForm = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
        background-color: ${Green};
    }

    &:checked + span:before {
        transform: translateX(16px);
    }
`;

export const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 38px;
    height: 22px;
`;

export const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${DarkBlack};
    transition: .4s;
    border-radius: 24px;

    &::before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 3px;
        bottom: 3px;
        background-color: ${LightBlack};
        transition: .4s;
        border-radius: 50%;
    }
`;

export const LabelCheckBoxForm = styled.h2`
    margin-right: 15px;
    
    width: auto;
    height: auto;

    font-family: GGSans, serif;
    font-weight: 500;
    font-size: 16px;
    color: ${White};
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

export const SelectedAccusationForm = styled.button`
    padding: 10px 15px 10px 15px;
    margin-bottom: 5px;
    border: none;
    background-color: ${DarkBlack};

    border-radius: 10px;
    font-family: GGSans, serif;
    font-weight: 400;
    font-size: 16px;
    color: ${White};
    text-align: left;

    &:hover {
        cursor: pointer;
        text-decoration: line-through;
    }
`

export const ImageContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`

export const PastedImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border: 2px solid #ccc;
  border-radius: 4px;
`

export const GreenButton = styled.button`
    padding: 0 15px 0 15px;

    width: auto;
    height: 40px;

    font-family: GGSans, serif;
    font-weight: 500;
    border-radius: 5px;
    border: none;
    color: ${White};
    background-color: ${Green};

    color: ${White};
`

export const RedButton = styled.button`
    padding: 0 15px 0 15px;

    width: auto;
    height: 40px;

    font-family: GGSans, serif;
    font-weight: 500;
    border-radius: 5px;
    border: none;
    color: ${White};
    background-color: ${Red};

    color: white;
`

export const Report = styled.pre`
    margin: 10px;
    padding: 15px 20px;

    color: ${White};
    font-family: GGSans, serif;
    font-weight: 500;

    font-size: 16px;
    background-color: ${DarkBlack};
    border-radius: 5px;
`