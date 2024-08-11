import { FaClock } from 'react-icons/fa';
import { TfiDropboxAlt } from "react-icons/tfi";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Container, NotFound } from './styles';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import { Fixed } from '../../components/Fixed';
import { File } from '../../components/File';

import { api } from '../../services/api';

export function Details() {
    const [bid, setBid] = useState(null);
    const [attachments, setAttachments] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    function handleLinkClick(pathFile) {
        window.open(`${api.defaults.baseURL}/files/${pathFile}`, '_blank');
    }

    async function handleDeleteBid() {
        try {
            const confirm = window.confirm("Tem certeza que deseja deletar essa licitação e os documentos anexados a ela? Esta ação não poderá ser desfeita.");

            if(confirm) {
                const files = { attachments: attachments.map(attachment => attachment.id) };

                await api.delete(`/bids/${params.id}`, { data: files });
                alert("Licitação deletada com sucesso.");
                navigate("/");
            }
        } catch(error) {
            if(error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível deletar a licitação.");
            }
        }
    }

    function handleLinkEdit() {
        navigate(`/edit-bidding/${params.id}`);
    }

    function formatDateTime(dateTime) {
        return format(new Date(dateTime), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    }

    function getFileExtension(filename) {
        return filename.split('.').pop();
    }

    useEffect(() => {
        async function fetchBid() {
            const responseBid = await api.get(`/bids/${params.id}`);
            const responseAttachments = await api.get(`/bids/attachments/${params.id}`);
            setBid(responseBid.data);
            setAttachments(responseAttachments.data);
        }

        fetchBid();
    }, []);

    return (
        <Fixed title="Licitação" route="/details">
            {
                bid ?
                <Container>
                    <header>
                        <h2>Chamada Pública N° {bid.modality_process_number}</h2>
                        <strong>Processo Licitatório N° {bid.bidding_process_number} - {bid.status}</strong>
                        <small><FaClock /> Data e hora de realização: {formatDateTime(bid.realized_at)}</small>
                    </header>
                    
                    <Section title="Objeto">
                        <p>{bid.object}</p>
                    </Section>

                    {
                        bid.observations &&
                        <Section title="Observações">
                            <p>{bid.observations}</p>
                        </Section>
                    }

                    <Section title="Anexos">
                        {
                            attachments &&
                            attachments.map((file, index) => (
                                <File 
                                    key={index} 
                                    title={file.name} 
                                    extension={getFileExtension(file.attachment)} 
                                    onClick={() => handleLinkClick(file.attachment)}
                                />
                            ))
                        }
                    </Section>

                    <footer>        
                        <Button title="Editar" onClick={handleLinkEdit} />
                        <Button background="admin" title="Excluir" onClick={handleDeleteBid} />
                    </footer>
                </Container>
                :
                <NotFound>
                    <h2><TfiDropboxAlt /> Licitação Não Encontrada</h2>
                </NotFound>
            }
        </Fixed>
    );
}