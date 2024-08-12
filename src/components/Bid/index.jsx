import { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';

import { Container, Details, Status } from './styles';
import { useTheme } from "styled-components";

export function Bid({ data, ...rest }) {
    const { COLORS } = useTheme();

    const [color, setColor] = useState("");

    const formatDate = (dateString) => {
        const [fullDate, fullTime] = dateString.split(' ');
        const [year, month, day] = fullDate.split('-');
        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        switch (data.status) {
            case "Em Andamento":
                return setColor(COLORS.GREEN_100);
            case "Finalizado":
                return setColor(COLORS.BLUE_100);
            default:
                return setColor("");
        }
    }, []);

    return (
        <Container type="button" {...rest}>
            <Details>
                <small>Processo Licitatório N° {data.bidding_process_number}</small>
                <span>{data.bidding_modality} N° {data.modality_process_number}</span>
            </Details>
            <Status>
                <div style={{color: color}}>
                    <FaCircle /> {data.status}
                </div>
                <span>Data: {formatDate(data.realized_at)}</span>
            </Status>
        </Container>
    );
}