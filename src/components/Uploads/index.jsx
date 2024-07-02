import { Container } from './styles';

import { ArquiveItem } from '../ArquiveItem';

export function Uploads({ data }) {
    return (
        <Container>
            <ArquiveItem value="Arquivo.pdf" />
            <ArquiveItem 
                isNew
                placeholder="Novo arquivo"
            />
        </Container>
    );
}