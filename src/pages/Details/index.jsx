import { FaClock } from 'react-icons/fa';
import { TfiDropboxAlt } from "react-icons/tfi";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Container, NotFound } from './styles';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import { Fixed } from '../../components/Fixed';
import { File } from '../../components/File';
import { LoadingSpinner } from '../../components/LoadingSpinner';

import { api } from '../../services/api';

export function Details() {
    const [bid, setBid] = useState(null);
    const [attachments, setAttachments] = useState([]);

    const [animationLoading, setAnimationLoading] = useState(false);
    const [deleteLoading, setDeletenLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    function handleLinkClick(pathFile) {
        window.open(`${api.defaults.baseURL}/files/${pathFile}`, '_blank');
    }

    async function handleDeleteBid() {
        try {
            
            const confirm = window.confirm("Tem certeza que deseja deletar essa licitação e os documentos anexados a ela? Esta ação não poderá ser desfeita.");
            
            if(confirm) {
                setDeletenLoading(true);
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
        } finally {
            setDeletenLoading(false);
        }
    }

    function handleLinkEdit() {
        navigate(`/edit-bidding/${params.id}`);
    }

    function formatDateTime(dateTime) {
        const [fullDate, fullTime] = dateTime.split(' ');
        const [year, month, day] = fullDate.split('-');
        return `${day}/${month}/${year} às ${fullTime}`;
    }

    function getFileExtension(filename) {
        return filename.split('.').pop();
    }

    useEffect(() => {
        setAnimationLoading(true);
        async function fetchBid() {
            const responseBid = await api.get(`/bids/${params.id}`);
            const responseAttachments = await api.get(`/bids/attachments/${params.id}`);
            setBid(responseBid.data);
            setAttachments(responseAttachments.data);
            setAnimationLoading(false);
        }

        fetchBid();
    }, []);

    return (
        <Fixed title="Licitação" route="/details">
            {
                animationLoading ?

                    <LoadingSpinner loading={animationLoading} />

                :

                    bid ?
                    
                    <Container>
                        <header>
                            <h2>{bid.bidding_modality} N° {bid.modality_process_number}</h2>
                            <strong>
                                {bid.bidding_process_number.split("/")[0] > 0 && `Processo Administrativo N° ${bid.bidding_process_number} - `}
                                {bid.status}
                            </strong>
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
                            <Button background="admin" title="Excluir" onClick={handleDeleteBid} loading={deleteLoading} />
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