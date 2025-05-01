import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    max-width: 600px;
    border: 2px solid #005dab;
    border-radius: 10px;
    padding: 0.2rem;
`

export const FormGroup = styled.div`
    display: flex;
    flex-direction: row;
    font-family: 'Roboto', sans-serif;
    margin: 0.1rem;
`

export const Label = styled.label`
    display: flex;
    margin: 2px;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    color: #000000;
    justify-content: space-between;
`

export const Button = styled.button`
    background-color: #444;
    color: #ffffff;
    border: 1px solid #005dab;
    background: linear-gradient(180deg, #0095f7 0%, #0076d3 100%);
    border-radius: 20px;
    font-family: 'Roboto', sans-serif;
    padding: 0.5rem;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin: 0.5rem;

    &:hover {
        border: 1px solid #004f8d;
        background: linear-gradient(180deg, #0076d3 0%, #005dab 100%);
    }
`

export const DataInput = styled.input`
    background: #ffffff;
    color: #000000;
    border: 2px solid #004f8d;
    border-radius: 7px;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
`

export const CalendarInput = styled.input`
background: #ffffff;
    color: #000000;
    border: 2px solid #004f8d;
    border-radius: 7px;
    font-family: 'Roboto', sans-serif;
    padding: 0.1rem;
    backgroun-image: none;
    font-size: 1rem;
    cursor: pointer;
`

export const SystemSelect = styled.select`
    background: #ffffff;
    color: #000000;
    border: 2px solid #004f8d;
    border-radius: 7px;
    font-family: 'Roboto', sans-serif;
`

export const GenreSelect = styled.select`
    background: #ffffff;
    color: #000000;
    border: 2px solid #004f8d;
    border-radius: 7px;
    font-family: 'Roboto', sans-serif;
`