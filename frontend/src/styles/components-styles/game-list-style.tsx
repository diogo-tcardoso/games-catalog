import styled from "styled-components";

export const Columns = styled.th`
    text-align: center;
    padding: 9px;
    font-weight: bold;
    font-size: 17px;
    color: #ffffff;
    border: 1px solid #005dab;
    background: linear-gradient(180deg, #0095f7 0%, #0076d3 100%);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: "Winky Rough", sans-serif;
`

export const TableHeader = styled.div `
    display: flex;
    justify-content: space-evenly;
    justify-items: center;
    font-family: "Winky Rough", sans-serif;
    align-items: center;
    margin-bottom: 15px;
`

export const GamesData = styled.td`
    text-align: center;
    background: #eff8ff;
    padding-left: 10px;
    font-size: 17px;
    padding-right: 10px;
    color: #021527;
`

export const DeleteButton = styled.button`
    background: white;
    border-radius: 10px;
    border: 2px solid #005dab;
    padding: 2px;
    color: #005dab;
    padding-bottom: -5px;
    margin-left: 10px;

    &:hover {
        color: red;
        border: 2px solid red;
        cursor: pointer;
    }
`

export const AddButton = styled.button`
    border-radius: 20px;
    border: 1px solid #005dab;
    background: linear-gradient(180deg, #0095f7 0%, #0076d3 100%);
    color: #ffffff;
    font-weight: bold;
    font-size: 16px;
    width: 150px;
    padding: 5px;

    &:hover {
        border: 1px solid #004f8d;
        background: linear-gradient(180deg, #0076d3 0%, #005dab 100%);
        cursor: pointer;
    }
`