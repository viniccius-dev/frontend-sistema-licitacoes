import { FiSearch } from 'react-icons/fi';

import { Container, Filters } from './styles';
import { Input } from '../Input';
import { Filter } from '../Filter';

export function Search({ filter, setFilter }) {
    const biddings = [
        {modality_process_number: "01/2023", bidding_process_number: "90/2023", status: "Em andamento", realized_at: "2023-12-15 09:30"},
        {modality_process_number: "01/2023", bidding_process_number: "90/2023", status: "Suspenso", realized_at: "2023-12-15 09:30"},
        {modality_process_number: "01/2023", bidding_process_number: "90/2023", status: "Finalizado", realized_at: "2023-12-15 09:30"},
        {modality_process_number: "01/2023", bidding_process_number: "90/2023", status: "Em andamento", realized_at: "2023-12-15 09:30"},
    ];

    const inProgress = biddings.filter((bidding) => bidding.status === "Em andamento");
    const finished = biddings.filter((bidding) => bidding.status === "Finalizado");
    const suspended = biddings.filter((bidding) => bidding.status === "Suspenso");

    return (
        <Container>
            <Input 
                icon={FiSearch}
                placeholder="Pesquisar licitação..."
                background="admin"
            />

            <Filters>
                <Filter 
                    title={`Tudo (${biddings.length})`}
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