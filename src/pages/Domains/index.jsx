import { useCallback, useEffect, useState } from 'react';
import { Container, W50, InputWrapper } from "./styles";

import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { Section } from "../../components/Section";
import { InputSelect } from "../../components/InputSelect";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Fixed } from "../../components/Fixed";

export function Domains() {
    const { user } = useAuth();

    const [domains, setDomains] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [modeEdit, setModeEdit] = useState(false);

    const [nameDomain, setNameDomain] = useState("");
    const [url, setUrl] = useState("");

    const clearFields = useCallback(() => {
        setSelectedDomain(null);
        setNameDomain("");
        setUrl("");
        setModeEdit(false);
    }, []);

    const fetchGetDomains = useCallback(async () => {
        if(user.role === "admin") {
            const responseDomains = await api.get("/domains");
            setDomains(responseDomains.data);
        }
    }, [user.role]);

    const handleModeUpdate = useCallback(() => {
        if (selectedDomain) {
            setModeEdit(!modeEdit);
            if (!modeEdit) {
                setNameDomain(selectedDomain.domain_name);
                setUrl(selectedDomain.url);
            } else {
                clearFields();
            }
        }
    }, [selectedDomain, modeEdit, domains, clearFields]);

    const handleSelectDomain = useCallback((option) => {
        setSelectedDomain(option);
    }, []);

    const handleSendForm = useCallback(async () => {
        if (!modeEdit) {
            api.post("/domains", {
                domain_name: nameDomain,
                url
            })
            .then(() => {
                alert("Domínio cadastrado com sucesso!");
                fetchGetDomains();
                clearFields();
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Não foi possível cadastrar o domínio");
                }
            });
        } else {
            api.put(`/domains/${selectedDomain.id}`, {
                domain_name: nameDomain,
                url,
            })
            .then(() => {
                alert("Domínio atualizado com sucesso!");
                fetchGetDomains();
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Não foi possível atualizar o domínio");
                }
            });
        }
    }, [nameDomain, url, selectedDomain, modeEdit, user, fetchGetDomains, clearFields]);


    const handleExportDatabase = useCallback(async () => {
        if(!selectedDomain) {
            alert("Selecione um domínio para exportar.");
            return;
        }

        try {
            const response = await api.get(`domains/export/${selectedDomain.id}`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `export_${selectedDomain.id}.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Erro ao exportar o banco de dados", error);
            alert("Erro ao exportar o banco de dados. Tente novamente.");
        }
    }, [selectedDomain]);

    const handleDeleteDomain = useCallback(async () => {
        try {
            const confirm = window.confirm("Tem certeza que deseja deletar o domínio? Todos os usuários, licitações e anexos vinculados a ele também serão excluídos permanentemente. É recomendado a exportação do banco de dados como cópia backup antes de realizar a exclusão.");

            if(confirm) {
                await api.delete(`/domains/${selectedDomain?.id}`);
                alert("Domínio deletado com sucesso.");
                fetchGetDomains();
                clearFields();
            }
        } catch(error) {
            if(error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível deletar o domínio.");
            }
        }
    }, [selectedDomain, fetchGetDomains, clearFields]);

    useEffect(() => {
        if (user.role === "admin") {
            fetchGetDomains();
        }
    }, [user.role, fetchGetDomains]);

    return (
        <Fixed title="Domínios" route="/domains">
            <Container>
                <Section title="Domínios Registrados">
                    <W50>
                        <InputWrapper>
                            <label>URL do domínio</label>

                            <InputSelect 
                                title="Selecione o URL do domínio"
                                group="domain"
                                options={domains}
                                objectValue="url"
                                onSelect={handleSelectDomain}
                                selected={selectedDomain}
                            />
                        </InputWrapper>
                        <Button 
                            className="button" 
                            title="Exportar Banco de Dados" 
                            onClick={handleExportDatabase}
                        />
                    </W50>
                    <W50>
                        <Button 
                            background="admin" 
                            title="Excluir" 
                            onClick={handleDeleteDomain}
                        />
                        <Button 
                            title={modeEdit ? "Limpar" : "Editar"}
                            onClick={handleModeUpdate}
                        />
                    </W50>
                </Section>
                <Section title={modeEdit ? "Editar Domínio" : "Criar Domínio"}>
                    <W50>
                        <InputWrapper>
                            <label>Nome</label>

                            <Input 
                                placeholder="Digite o nome do domínio"
                                background="admin"
                                value={nameDomain}
                                onChange={e => setNameDomain(e.target.value)}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <label>URL do domínio</label>

                            <Input 
                                placeholder="Digite o URL do domínio"
                                background="admin"
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                            />
                        </InputWrapper>
                    </W50>
                    <Button title="Salvar" onClick={handleSendForm} />
                </Section>
            </Container>
        </Fixed>
    );
}