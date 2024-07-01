import styled from 'styled-components';
import { DEVICE_BREAKPOINTS } from '../../styles/deviceBreakpoints';

export const Container = styled.aside`
    grid-area: none;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;

    position: absolute;
    z-index: 1;

    transition: transform 0.3s ease-in-out;
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 32px 24px;
    border: ${({ theme }) => `1px solid ${theme.COLORS.BROWN_200}`};
`;

export const Title = styled.h1 `
    display: flex;
    align-items: center;
    gap: 7px;
    color: ${({ theme }) => theme.COLORS.BLUE_100};
    font-size: 1.5rem;
`;

export const Button = styled.button`
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    margin-left: 10px;

    > svg {
        font-size: 1.5rem;
        color: ${({ theme }) => theme.COLORS.BROWN_100}
    }
`;

export const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px 40px;

    > a {
        position: relative;
        color: ${({ theme }) => theme.COLORS.WHITE_200};
        display: flex;
        align-items: center;
        gap: 7px;
        padding-left: 24px;
        border-radius: 30px;
        height: 56px;
        font-size: 16px;

        &[data-menu-active="true"] {
            background-color: ${({ theme }) => theme.COLORS.BROWN_200};
            color: ${({ theme }) => theme.COLORS.WHITE_100};
        }

        svg:nth-of-type(2) {
            font-size: 20px;
            position: absolute;
            right: 24px;
        }
    }
`