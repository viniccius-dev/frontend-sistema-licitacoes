import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.WHITE_200};
    color: ${({ theme }) => theme.COLORS.GRAY_300};

    margin-bottom: .5rem;
    border-radius: .63rem;
    border: ${({ theme }) => `1px solid ${theme.COLORS.BACKGROUND_900}`};

    > input {
        width: 100%;
        height: 3.5rem;

        padding: .75rem;

        color: ${({ theme }) => theme.COLORS.WHITE_100};
        background: transparent;
        border: 0;

        &:placeholder {
            color: ${({ theme }) => theme.COLORS.GRAY_300};
        }
    }

    svg {
        margin-left: 1rem;
    }
`;