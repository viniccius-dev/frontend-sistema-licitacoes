import { FiSearch } from 'react-icons/fi';

import { Container, Filters } from './styles';
import { Input } from '../Input';
import { Filter } from '../Filter';

export function Search({ data, filter, setFilter }) {

    const inProgress = data.filter((bidding) => bidding.status === "Em Andamento");
    const finished = data.filter((bidding) => bidding.status === "Finalizado");
    const suspended = data.filter((bidding) => bidding.status === "Suspenso");

    return (
        <Container>
            <Input 
                icon={FiSearch}
                placeholder="Pesquisar licitação..."
                background="admin"
            />

            <Filters>
                <Filter 
                    title={`Tudo (${data.length})`}
                    onClick={() => setFilter("Tudo")}
                    selected={filter === "Tudo"}
                />

                <Filter 
                    title={`Em andamento (${inProgress.length})`}
                    onClick={() => setFilter("Em Andamento")}
                    selected={filter === "Em Andamento"}
                />

                <Filter 
                    title={`Finalizados (${finished.length})`}
                    onClick={() => setFilter("Finalizado")}
                    selected={filter === "Finalizado"}
                />

                <Filter 
                    title={`Suspensos (${suspended.length})`}
                    onClick={() => setFilter("Suspenso")}
                    selected={filter === "Suspenso"}
                />
            </Filters>
        </Container>
    );
}