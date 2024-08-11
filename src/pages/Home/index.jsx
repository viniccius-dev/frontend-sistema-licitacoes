import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Container, Bids } from './styles';

import { api } from '../../services/api';
import { Fixed } from '../../components/Fixed';
import { Search } from '../../components/Search';
import { Bid } from '../../components/Bid';

export function Home() {
    const [data, setData] = useState([]);
    const [bids, setBids] = useState([]);
    const [filter, setFilter] = useState("Tudo");
    const [search, setSearch] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    function handleLinkClick(bidId) {
        navigate(`/bidding/${bidId}`);
    }

    useEffect(() => {
        async function fetchBids() {
            const params = new URLSearchParams(location.search);
            const modalities = params.get('modalities');
            const years = params.get('years');
            const domains = params.get('domains');

            try {
                const response = await api.get("/bids", {
                    params: {
                        modalities: modalities?.length > 0 ? modalities : undefined,
                        years: years?.length > 0 ? years : undefined,
                        domains: domains?.length > 0 ? domains : undefined,
                        searchText: search
                    }
                });
                setData(response.data);
                setBids(response.data);
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    console.log(error);
                    alert("Não foi acessar os dados das licitações");
                }
            }
        }
        
        fetchBids();
    }, [location.search, search]);  // Adicionando dependências para atualizar quando os filtros mudarem

    useEffect(() => {
        switch (filter) {
            case "Em Andamento":
                return setBids(data.filter((bid) => bid.status === "Em Andamento"));
            case "Finalizado":
                return setBids(data.filter((bid) => bid.status === "Finalizado"));
            case "Suspenso":
                return setBids(data.filter((bid) => bid.status === "Suspenso"));
            default:
                return setBids(data);
        }
    }, [filter, data]);

    return (
        <Fixed title="Licitações" route="/">
            <Container>
                <Search setFilter={setFilter} setSearch={setSearch} data={data} filter={filter}/>

                <Bids>
                    {
                        bids.map((bid) => (
                            <Bid 
                                key={bid.bid_id}
                                data={bid}
                                onClick={() => handleLinkClick(bid.bid_id)} 
                            />
                        ))
                    }
                </Bids>
            </Container>
        </Fixed>
    );
}
