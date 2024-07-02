import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    user-select: none;
    margin-bottom: 8px;
`;

export const SelectButton = styled.div`
    height: 3.5rem;
    display: flex;
    padding: 0.75rem;
    align-items: center;
    justify-content: space-between;

    border-radius: 10px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_100};
    color: ${({ theme }) => theme.COLORS.WHITE_100};
`

export const Chevrons = styled.div`
    color: ${({ theme }) => theme.COLORS.WHITE_100};
    font-size: 1.25rem;
`;

export const OptionsList = styled.div`
    z-index: 2;
    position: absolute;
    width: 100%;

    max-height: 12.5rem;
    overflow-y: auto;

    margin-top: 0.25rem;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_300};
    color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
`;

export const Option = styled.li`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;

    padding: 0.75rem;

    &:not(:nth-last-of-type(1)) {
        border-bottom: ${({ theme }) => `1px solid ${theme.COLORS.WHITE_200}`};
    }

    svg {
        margin-left: auto;
        color: ${({ theme }) => theme.COLORS.BROWN_200}
    }

    > input[type="radio"] {
        all: unset;
        position: absolute;
        inset: 0;
        cursor: pointer;
    }

    &:has(input:checked),
    &:hover {
        background: ${({ theme }) => theme.COLORS.GRAY_500};
        color: ${({ theme }) => theme.COLORS.BROWN_200};
    }

    &:has(input:focus) {
        outline: ${({ theme }) => `1px solid ${theme.COLORS.BROWN_200}`};
    }
`;