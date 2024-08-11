import { useState, useEffect } from 'react';
import { TfiDropboxAlt } from "react-icons/tfi";
import { FaXmark } from "react-icons/fa6";
import { useParams } from 'react-router-dom';

import { Container, W50, InputWrapper, Archive, NotFound } from './styles';

import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import { listModalities, listStatus } from '../../utils/biddingVar';

import { Input } from '../../components/Input';
import { InputSelect } from '../../components/InputSelect';
import { Textarea } from '../../components/Textarea';
import { Uploads } from '../../components/Uploads';
import { Button } from '../../components/Button';
import { Fixed } from '../../components/Fixed';
import { File } from '../../components/File';

export function EditBidding() {
    const { user } = useAuth();
    const params = useParams();

    const [bid, setBid] = useState(null);
    const [attachments, setAttachments] = useState([]);
    const [deleteAttachments, setDeleteAttachments] = useState([]); 
    const [domains, setDomains] = useState([]);
    const [selectedModality, setSelectedModality] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedDomain, setSelectedDomain] = useState(null);

    const [numModalityProcess, setNumModalityProcess] = useState("");
    const [numBidProcess, setNumBidProcess] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [object, setObject] = useState("");
    const [observations, setObservations] = useState("");
    const [files, setFiles] = useState([]);

    function getFileExtension(filename) {
        return filename.split('.').pop();
    };

    function handleLinkClick(pathFile) {
        window.open(`${api.defaults.baseURL}/files/${pathFile}`, '_blank');
    }

    const handleFilesChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleFilesDelete = (file) => {
        const confirm = window.confirm(`Deseja deletar o arquivo ${file.name}?`);

        if(confirm) {
           setDeleteAttachments(files => [...files, file.id]);
           setAttachments(attachments.filter(attachment => attachment.id !== file.id))
        }
    }

    const isValidDateTime = (dateString, timeString) => {
        const [day, month, year] = dateString.split('/');
        const [hours, minutes] = timeString.split(':');
        const date = new Date(year, month - 1, day, hours, minutes);
        return !isNaN(date.getTime());
    };

    const formatDateTime = (dateString, timeString) => {
        const [day, month, year] = dateString.split('/');
        const [hours, minutes] = timeString.split(':');
        
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        
        return `${formattedDate} ${formattedTime}`;
    };

    const handleSubmit = async () => {
        if(!isValidDateTime(date, hour)) {
            alert("Data ou hora inválida. Por favor, verifique os valores inseridos.");
            return;
        }

        const formattedDateTime = formatDateTime(date, hour);

        const biddingData = {
            bidding_modality: selectedModality.name,
            bidding_process_number: numBidProcess,
            modality_process_number: numModalityProcess,
            status: selectedStatus.name,
            object,
            observations,
            realized_at: formattedDateTime
        };

        try {
            const biddingResponse = await api.put(`/bids/${params.id}`, biddingData);
            const deleteFiles = { attachments: deleteAttachments };

            if(deleteAttachments.length > 0) {
                await api.delete(`/bids/attachments`, { data: deleteFiles });
            }

            if(files.length > 0) {
                const formData = new FormData();
                files.forEach(fileObj => {
                    formData.append("attachment", fileObj.file);
                });

                await api.post(`/bids/attachments/${params.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            alert("Licitação atualizada com sucesso!");
            location.reload();
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Erro ao atualizar a licitação.");
            }
        }

    };

    useEffect(() => {
        api.get(`/bids/attachments/${params.id}`)
        .then((response) => setAttachments(response.data))
        .catch(error => {
            if(error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível acessar dados dos anexos da licitação");
            }
        });

        api.get(`/bids/${params.id}`)
        .then((response) => {
            const [fullDate, fullTime] = response.data.realized_at.split(' ');
            const [year, month, day] = fullDate.split('-');
            const formattedDate = `${day}/${month}/${year}`;

            setBid(response.data);
            setSelectedModality(listModalities.find(modality => modality.name === response.data.bidding_modality));
            setNumModalityProcess(response.data.modality_process_number);
            setSelectedStatus(listStatus.find(status => status.name === response.data.status));
            setNumBidProcess(response.data.bidding_process_number);
            setDate(formattedDate);
            setHour(fullTime);
            setObject(response.data.object);
            setObservations(response.data.observations);
        })
        .catch(error => {
            if(error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível acessar dados da licitação");
            }
        });
    }, [user.role]);

    return (
        <Fixed title="Editar Licitação" route="/edit-bidding">

            {
                bid ?
                <Container>
                    <W50>
                        <InputWrapper>
                            <label>Modalidade</label>

                            <InputSelect 
                                title="Selecione a Modalidade da Licitação"
                                group="modalities"
                                options={listModalities}
                                objectValue="name"
                                onSelect={option => setSelectedModality(option)}
                                selected={selectedModality}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <label>N° do processo da modalidade</label>

                            <Input 
                                placeholder="Digite o n° do processo da modalidade" 
                                background="admin"
                                maskType="identification"
                                value={numModalityProcess}
                                onChange={(e) => setNumModalityProcess(e.target.value)}
                            />
                        </InputWrapper>
                    </W50>
                    <W50>
                        <InputWrapper>
                            <label>Status</label>

                            <InputSelect 
                                title="Selecione o status do processo"
                                group="status"
                                options={listStatus}
                                objectValue="name"
                                onSelect={option => setSelectedStatus(option)}
                                selected={selectedStatus}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <label>N° do processo licitatório</label>

                            <Input 
                                placeholder="Digite o n° do processo licitatório" 
                                background="admin"
                                maskType="identification"
                                value={numBidProcess}
                                onChange={(e) => setNumBidProcess(e.target.value)}
                                disabled
                            />
                        </InputWrapper>
                    </W50>
                    <W50>
                        <InputWrapper>
                            <label>Data</label>

                            <Input
                                placeholder="Digite a data de realização"
                                background="admin"
                                maskType="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <label>Horário</label>

                            <Input 
                                placeholder="Digite o horário de realização" 
                                background="admin"
                                maskType="time"
                                value={hour}
                                onChange={(e) => setHour(e.target.value)}
                            />
                        </InputWrapper>
                    </W50>

                    <InputWrapper>
                        <label>Objeto</label>
                        <Textarea 
                            placeholder="Digite a descrição do objeto da licitação" 
                            onChange={(e) => setObject(e.target.value)}
                            value={object}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <label>Observações</label>
                        <Textarea 
                            placeholder="Digite observações referentes ao processo de licitação" 
                            onChange={(e) => setObservations(e.target.value)}
                            value={observations || undefined}
                        />
                    </InputWrapper>

                    {
                        attachments.length > 0 &&
                        <InputWrapper>
                            <label>Anexos Salvos</label>
                            <div className="savedUploads">
                                {
                                    attachments.map((file, index) => (
                                        <Archive key={index}>
                                            <File 
                                                title={file.name} 
                                                extension={getFileExtension(file.attachment)} 
                                                onClick={() => handleLinkClick(file.attachment)}
                                            />
                                            <FaXmark onClick={() => handleFilesDelete(file)} />
                                        </Archive>
                                    ))
                                }
                            </div>
                        </InputWrapper>
                    }

                    <InputWrapper>
                        <label>Upload de Novos Anexos</label>
                        <Uploads onFilesChange={handleFilesChange} />
                    </InputWrapper>

                    <InputWrapper>
                        <Button 
                            title="Cadastrar" 
                            onClick={handleSubmit}    
                        />
                    </InputWrapper>
                </Container>

                :

                <NotFound>
                    <h2><TfiDropboxAlt /> Licitação Não Encontrada</h2>
                </NotFound>
            }

            
        </Fixed>
    );
}
