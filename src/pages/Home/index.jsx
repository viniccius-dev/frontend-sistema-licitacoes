import { useState,  useEffect } from 'react';

import { Container, Bids } from './styles';

import { Fixed } from '../../components/Fixed';
import { Search } from '../../components/Search';
import { Bid } from '../../components/Bid';

export function Home() {
    const biddings = [
        { id: 1, modality_process_number: "01/2023", bidding_process_number: "90/2023", status: "Em andamento", realized_at: "2023-12-15 09:30"},
        { id: 2, modality_process_number: "01/2023", bidding_process_number: "90/2023", status: "Suspenso", realized_at: "2023-12-15 09:30"},
        { id: 3, modality_process_number: "01/2023", bidding_process_number: "90/2023", status: "Finalizado", realized_at: "2023-12-15 09:30"},
        { id: 4, modality_process_number: "01/2023", bidding_process_number: "90/2023", status: "Em andamento", realized_at: "2023-12-15 09:30"},
    ];
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        switch (filter) {
            case "inProgress":
                return setData(biddings.filter((bidding) => bidding.status === "Em andamento"));
            case "finished":
                return setData(biddings.filter((bidding) => bidding.status === "Finalizado"));
            case "suspended":
                return setData(biddings.filter((bidding) => bidding.status === "Suspenso"));
            default:
                return setData(biddings);
        }
    }, [filter]);

    return(
        <Fixed title="Licitações" route="/">
            <Container>
                
                <Search setFilter={setFilter} data={biddings} filter={filter}/>

                <Bids>
                    {
                        data.map((bid) => (
                            <Bid 
                                key={bid.id}
                                data={bid} 
                            />
                        ))
                    }
                </Bids>
            </Container>
        </Fixed>
    );
}