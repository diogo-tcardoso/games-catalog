import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    justify-content: center;
    max-width: 600px;
    flex-wrap: wrap;
    border: 1px solid #444;
    padding: 1rem;
`

export const FormGroup = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: 1rem;
    border: 1px solid #444;
`

export const Label = styled.label`
    display: flex;
    margin: 2px;
    font-weight: bold;
    color: #EEEEEE;
    justify-content: space-between;
`

export const Button = styled.button`
    background-color: #444;
    color: #FFFFFF;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    font-weight: bold;
    margin-left: 1rem;

    &:hover {
        background-color: #555;
    }
`