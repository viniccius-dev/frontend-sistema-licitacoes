import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-columns: auto;
    grid-template-areas:
        "top"
        "content";
`;

export const FixedContent = styled.section`
    grid-area: top;
`;