import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    flex-wrap: wrap;
    border: 2px solid #444;
    padding: 0.2rem;
`

export const FormGroup = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0.2rem;
`

export const Label = styled.label`
    display: flex;
    margin: 2px;
    font-weight: bold;
    color: #000000;
    justify-content: space-between;
`

export const Button = styled.button`
    background-color: #444;
    color: #eeeeee;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    font-weight: bold;
    margin: 0.5rem;

    &:hover {
        background-color:rgb(23, 2, 130);
    }
`