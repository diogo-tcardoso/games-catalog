import styled from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalStyle = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    padding: 2rem;
    width: 90%
    max-width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`

export const CloseButton = styled.button`
    position: absolute;
    top: 63px;
    right: 550px;
    background: #444444;
    border: 2px solid #444444;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
        background-color: #888888;
    }
`;