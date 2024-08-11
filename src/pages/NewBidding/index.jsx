import { useState, useEffect } from 'react';

import { Container, W50, InputWrapper } from './styles';

import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import { listModalities, listStatus } from '../../utils/biddingVar';

import { Input } from '../../components/Input';
import { InputSelect } from '../../components/InputSelect';
import { Textarea } from '../../components/Textarea';
import { Uploads } from '../../components/Uploads';
import { Button } from '../../components/Button';
import { Fixed } from '../../components/Fixed';

export function NewBidding() {
    const { user } = useAuth();

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

    const handleFilesChange = (newFiles) => {
        setFiles(newFiles);
    };

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
            realized_at: formattedDateTime,
            domain_id: selectedDomain?.id
        };

        try {
            const biddingResponse = await api.post("/bids", biddingData);

            if(files.length > 0) {
                const formData = new FormData();
                files.forEach(fileObj => {
                    formData.append("attachment", fileObj.file);
                });

                await api.post(`/bids/attachments/${biddingResponse.data.bid.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            alert("Licitação cadastrada com sucesso!");
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Erro ao cadastrar a licitação.");
            }
        }

    };

    useEffect(() => {
        if (user.role === "admin") {
            api.get("/domains")
            .then((response) => setDomains(response.data))
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Não foi possível acessar dados do domínio");
                }
            });
        }
    }, [user.role]);

    return (
        <Fixed title="Nova Licitação" route="/create-bidding">
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
                    />
                </InputWrapper>

                <InputWrapper>
                    <label>Observações</label>
                    <Textarea 
                        placeholder="Digite observações referentes ao processo de licitação" 
                        onChange={(e) => setObservations(e.target.value)}
                    />
                </InputWrapper>

                <InputWrapper>
                    <label>Anexos</label>
                    <Uploads onFilesChange={handleFilesChange} />
                </InputWrapper>

                <W50>
                    {
                        user.role == "admin" &&

                        <InputWrapper>
                            <label>Domínio Vinculado</label>

                            <InputSelect 
                                title="Selecione o domínio vinculado"
                                group="domains"
                                options={domains}
                                objectValue="domain_name"
                                onSelect={option => setSelectedDomain(option)}
                                selected={selectedDomain}
                            />
                        </InputWrapper>
                    }
                    <InputWrapper>
                        <Button 
                            title="Cadastrar" 
                            onClick={handleSubmit}    
                        />
                    </InputWrapper>
                </W50>
            </Container>
        </Fixed>
    );
}
