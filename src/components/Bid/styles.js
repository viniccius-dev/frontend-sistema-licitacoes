import styled from "styled-components";

export const Container = styled.a`
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    color: ${({ theme }) => theme.COLORS.GRAY_200};

    padding: 1.5rem 1rem;
    border-radius: .43rem;

    display: flex;
    align-items: center;
    gap: 7px;
`;

export const Details = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;

    > small {
        font-size: .75rem;
        font-weight: 500;
    }

    > span {
        font-size: .87rem;
        font-weight: 700;
        color: ${({ theme }) => theme.COLORS.BACKGROUND_100};
    }
`;

export const Status = styled.div`
    display: flex;
    flex-direction: column;
    font-size: .6rem;
    font-weight: 500;

    > div {
        display: flex;
        align-items: center;
        gap: 3px;
    }
`;