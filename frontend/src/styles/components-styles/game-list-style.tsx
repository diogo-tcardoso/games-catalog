import styled from "styled-components";

export const Columns = styled.th`
    text-align: center;
    padding: 3px;
    border: 1px solid #FFFFFF;
    font-weight: bold;
    font-size: 17px;
    color: #f2f2f2;
    background-color:rgb(0, 60, 164);
    text-transform: uppercase;
    letter-spacing: 1px;
`

export const TableHeader = styled.div `
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 10px;
`

export const GamesData = styled.td`
    text-align: center;
    border: 2px solid #FFFFFF;
    padding-left: 5px;
    padding-right: 5px;
    color:rgb(255, 255, 255);
`

export const DeleteButton = styled.button`
    background: white;
    border-radius: 10px;
    border: 2px solid rgb(0, 60, 164);
    padding: 2px;
    color: rgb(0, 60, 164);
    padding-bottom: -5px;
    margin-left: 10px;

    &:hover {
        color: red;
        border: 2px solid red;
        cursor: pointer;
    }
`

export const AddButton = styled.button`
    background: white;
    border-radius: 20px;
    border: 2px solid rgb(0, 60, 164);
    color: rgb(0, 60, 164);
    font-weight: bold;
    font-size: 16px;
    padding: 5px;

    &:hover {
        background-color: rgb(0, 60, 164);
        cursor: pointer;
        color: #ffffff;
    }
`