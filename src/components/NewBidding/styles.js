import styled from "styled-components";
import { DEVICE_BREAKPOINTS } from "../../styles/deviceBreakpoints";

export const Container = styled.form`
    grid-area: content;
    padding: 2rem;
`;

export const W50 = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    flex-direction: column;

    @media (min-width: ${DEVICE_BREAKPOINTS.MD}) {
        flex-direction: row;
    }
`;

export const InputWrapper = styled.div`
    width: 100%;

    > label {
        font-size: 1.3rem;
        font-weight: 600;
    }

    > div {
        margin-top: 5px;
    }
`;