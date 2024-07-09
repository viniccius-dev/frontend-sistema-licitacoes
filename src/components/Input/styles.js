import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${({ theme, $background }) => $background === "default" ? theme.COLORS.WHITE_200 : theme.COLORS.GRAY_100};
    color: ${({ theme }) => theme.COLORS.GRAY_300};

    margin-bottom: .5rem;
    border-radius: .63rem;
    border: ${({ theme, $background }) => $background === "default" ? `1px solid ${theme.COLORS.GRAY_100}` : "none"};

    > input {
        width: 100%;
        height: 3rem;

        padding: .75rem;

        color: ${({ theme, $background  }) => $background === "default" ? theme.COLORS.BACKGROUND_900 : theme.COLORS.WHITE_100};
        background: transparent;
        border: 0;

        &::placeholder {
            color: ${({ theme }) => theme.COLORS.GRAY_300};
        }
    }

    svg {
        margin-left: 1rem;
    }
`;