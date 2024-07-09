import styled from 'styled-components';

export const Container = styled.section`
    padding: 1.75rem 0 1rem 0;
`;

export const Filters = styled.div`
    margin-top: 2.5rem;
    display: flex;
    gap: 1rem;
    border-bottom: ${({ theme }) => `2px solid ${theme.COLORS.GRAY_200}`};
`;