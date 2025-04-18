import styled from "styled-components";

export const Section = styled.section`
    display: grid;
    grid-template-columns: 1fr, auto;
    grid-template-rows: repeat(5, 1fr);
    margin-top: 2.5rem;
`

export const Aside = styled.aside`
    display: block;
    grid-area: 1/1/6/2;
    width: 250px;
    height: 45vh;
    background-color: #eff8ff;
    padding: 20px;
    margin-right: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const Table = styled.div`
    grid-area: 1/2/6/3;
    width: 100%;
`