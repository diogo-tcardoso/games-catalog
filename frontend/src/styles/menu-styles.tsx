import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Link = styled(RouterLink)`
    color: #ffffff;
    font-size: 18px;
    padding: 3px;
    text-align: center;
`

export const MenuPages = styled.li`
    display:flex;
    justify-content: center;
    margin-bottom: 13px;
    border: 1px solid #005dab;
    background: linear-gradient(180deg, #0095f7 0%, #0076d3 100%);
    align-items: center;
    border-radius: 20px;

    &:hover {
        border: 1px solid #004f8d;
        background: linear-gradient(180deg, #0076d3 0%, #005dab 100%);
    }
`

export const MenuTitle = styled.h1`
    color: #064274;
    font-size: 30px;
    margin-top: -10px;
    margin-bottom: -20px;
    font-family: "Winky Rough", sans-serif;
`