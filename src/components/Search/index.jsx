import { FiSearch } from 'react-icons/fi';

import { Container, Filters } from './styles';
import { Input } from '../Input';
import { Filter } from '../Filter';

export function Search({ data, filter, setFilter }) {

    const inProgress = data.filter((bidding) => bidding.status === "Em andamento");
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
                    onClick={() => setFilter("all")}
                    selected={filter === "all"}
                />

                <Filter 
                    title={`Em andamento (${inProgress.length})`}
                    onClick={() => setFilter("inProgress")}
                    selected={filter === "inProgress"}
                />

                <Filter 
                    title={`Finalizados (${finished.length})`}
                    onClick={() => setFilter("finished")}
                    selected={filter === "finished"}
                />

                <Filter 
                    title={`Suspensos (${suspended.length})`}
                    onClick={() => setFilter("suspended")}
                    selected={filter === "suspended"}
                />
            </Filters>
        </Container>
    );
}