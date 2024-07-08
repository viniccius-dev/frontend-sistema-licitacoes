import styled from 'styled-components';

export const Container = styled.section`
    margin: 1.75rem 0;

    > h2 {
        border: ${({ theme }) => `1px solid ${theme.COLORS.GRAY_500}`};
        padding-bottom: 1rem;
        margin-bottom: 1.75rem;

        color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
        font-size: 1.25rem;
        font-weight: 400;
    }
`;