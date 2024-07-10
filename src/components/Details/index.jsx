import { FaClock } from 'react-icons/fa';

import { Container } from './styles';
import { Section } from '../Section';

export function Details() {
    return (
        <Container>
            <header>
                <h2>Processo Licitatório N° 10/2024</h2>
                <strong>Chamada Pública N° 01/2024 - Em andamento</strong>
                <small><FaClock /> 15/04/2024 às 09:30</small>
            </header>
            
            <Section title="Objeto">
                <p>Credenciamento de profissionais para atuarem na área de saúde, enfermeiros, técnicos em enfermagem, nutricionista, farmacêutico, assistente em farmácia e fisioterapeuta.</p>
            </Section>

            <Section title="Observações">
                <p>Observação número 05</p>
            </Section>

            <Section title="Anexos">
                
            </Section>
        </Container>
    );
}