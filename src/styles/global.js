import { createGlobalStyle } from 'styled-components';
import { DEVICE_BREAKPOINTS } from './deviceBreakpoints';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        font-size: 12px;

        @media (min-width: ${DEVICE_BREAKPOINTS.MD}) {
            font-size: 16px;
        }
    }

    body {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_100};
        color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

        --webkit-font-smoothing: antialiased;
    }

    body, input, button, textarea {
        font-family: "Open Sans", sans-serif;
        font-size: 1rem;
        outline: none;
    }

    * {
        text-decoration: none;
    }

    button, a {
        cursor: pointer;
        transition: filter 0.2s;
    }

    button:hover, a:hover {
        filter: brightness(0.9);
    }
`;