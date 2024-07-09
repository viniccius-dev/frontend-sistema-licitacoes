import { FaCircle } from 'react-icons/fa';

import { Container, Details, Status } from './styles';
import { useTheme } from "styled-components";

export function Bid({ data, ...rest }) {
    const { COLORS } = useTheme();

    return (
        <Container type="button" {...rest}>
            <Details>
                <small>Chamada Pública N° 01/2024</small>
                <span>Processo Licitatório n° 10/2024</span>
            </Details>
            <Status>
                <div>
                    <FaCircle /> Em andamento
                </div>
                <span>Data: 13/04/2024</span>
            </Status>
        </Container>
    );
}