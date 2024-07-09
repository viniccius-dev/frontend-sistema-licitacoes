import styled from 'styled-components';

export const Container = styled.section`
    padding: 1.75rem 1.5rem;
`;

export const Filters = styled.div`
    margin-top: 2.5rem;
    display: flex;
    gap: 1rem;
    margin-right: 10px;
    border-bottom: ${({ theme }) => `2px solid ${theme.COLORS.GRAY_200}`};
`;