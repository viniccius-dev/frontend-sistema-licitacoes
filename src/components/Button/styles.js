import styled from 'styled-components';

export const Container = styled.button`
    width: 100%;

    background-color: ${({ theme, $background }) => $background === "default" ? theme.COLORS.BLUE_100 : theme.COLORS.BROWN_200};
    color: ${({ theme, $background }) => $background === "default" ? theme.COLORS.BACKGROUND_900 : theme.COLORS.WHITE_100};

    height: 3.5rem;
    border: 0;
    padding: 0 1rem;
    margin-top: 1rem;
    border-radius: .63rem;
    font-weight: 700;

    &:disabled {
        opacity: 0.8;
    }
`;