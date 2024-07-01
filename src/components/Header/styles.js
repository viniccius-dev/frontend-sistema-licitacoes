import styled from 'styled-components';
import { DEVICE_BREAKPOINTS } from '../../styles/deviceBreakpoints';

export const Container = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 1.5rem;
    padding: 1rem 0;
    border-bottom: ${({ theme }) => `1px solid ${theme.COLORS.BACKGROUND_900}`};

    > h1 {
        font-size: 1.5rem;
        flex: 1;
        padding: 0 1rem;
    }

    > button:nth-last-of-type(n) {
        max-width: 130px;
    }

    @media (min-width: ${DEVICE_BREAKPOINTS}) {
        > h1 {
            font-size: 2rem;
        }
    }
`;

export const Menu = styled.button`
    background: none;
    border: none;

    > svg {
        font-size: 2rem;
        color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    }

    @media (min-width: ${DEVICE_BREAKPOINTS.XS}) {
        > svg {
            font-size: 2.5rem;
        }
    }

    @media (min-width: ${DEVICE_BREAKPOINTS.MD}) {
        display: none;
    }
`;