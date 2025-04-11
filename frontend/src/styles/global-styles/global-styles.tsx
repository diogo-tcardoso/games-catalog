import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    a {
        text-decoration: none;
        color: #ffffff
    }
    
    li {
        list-style: none;
    }
    
    root {
        max-width: 100%;
        margin: 0 auto;
        padding: 0;
        font-family: 'Roboto', sans-serif;
    }

    ul {
        padding: 15px;
        list-style-type: none;
    }
`;