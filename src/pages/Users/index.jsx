import { useCallback, useEffect, useState, useRef } from 'react';
import { Container, W50, InputWrapper } from './styles';

import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { Fixed } from '../../components/Fixed';
import { Section } from '../../components/Section';
import { InputSelect } from '../../components/InputSelect';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function Users() {
    const { user } = useAuth();
    
    const [users, setUsers] = useState([]);
    const [domains, setDomains] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [modeEdit, setModeEdit] = useState(user.role === "admin" ? false : true);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleModeUpdate = useCallback(() => {
        if(selectedUser) {
            setModeEdit(!modeEdit);
            if(!modeEdit) {
                nameRef.current.value = selectedUser.name;
                emailRef.current.value = selectedUser.email;
            } else {
                nameRef.current.value = "";
                emailRef.current.value = "";
                setSelectedUser(null);
            }
        }
    }, [selectedUser, modeEdit]);

    function handleSendForm() {
        if(!modeEdit) {
            if(!name || !email || !newPassword || !selectedDomain) {
                return alert("Preencha todos os campos!");
            }

            api.post("/users", { 
                name, 
                email, 
                password: newPassword,
                domain_id: selectedDomain.id 
            })
            .then(() => {
                alert("Usuário cadastro com sucesso!");
            })
            .catch(error => {
                if(error.response){
                    alert(error.response.data.message);
                } else {
                    alert("Não foi possível cadastrar");
                }
            })
        }
    }
    
    const handleSelectUser = useCallback((option) => {
        setSelectedUser(option);
    }, []);

    const handleSelectDomain = useCallback((option) => {
        setSelectedDomain(option);
    }, []);

    useEffect(() => {
        if(user.role === "admin") {
            async function fetchGetUsersAndDomains() {
                const responseUsers = await api.get("/users");
                const responseDomains = await api.get("/domains");
                setUsers(responseUsers.data);
                setDomains(responseDomains.data);
            }

            fetchGetUsersAndDomains();
        }
    }, [handleSendForm]);

    return (
        <Fixed title="Usuários" route="/users">
            <Container>
                {
                    user.role === "admin" &&
                    <Section title="Usuários Registrados">
                        <W50>
                            <InputWrapper>
                                <label>E-mail</label>

                                <InputSelect 
                                    title="Selecione o e-mail atual do usuário"
                                    group="email"
                                    options={users}
                                    objectValue="email"
                                    onSelect={handleSelectUser}
                                    selected={selectedUser}
                                />
                            </InputWrapper>
                            <InputWrapper className="buttons">
                                <Button title="Excluir" background="admin" />
                                <Button 
                                    title={modeEdit ? "Limpar" : "Editar"}
                                    onClick={handleModeUpdate}
                                />
                            </InputWrapper>
                        </W50>
                    </Section>
                }

                <Section title={modeEdit ? "Editar Perfil" : "Criar Perfil"}>
                    <W50>
                        <InputWrapper>
                            <label>Nome</label>

                            <Input 
                                placeholder="Digite o nome"
                                background="admin"
                                onChange={e => setName(e.target.value)}
                                ref={nameRef}
                            />
                        </InputWrapper>
                        
                        <InputWrapper>
                            <label>E-mail</label>

                            <Input
                                type="email"
                                placeholder="Digite o e-mail"
                                background="admin"
                                onChange={e => setEmail(e.target.value)}
                                ref={emailRef}
                            />
                        </InputWrapper>
                    </W50>
                    
                    <W50>
                        {
                            modeEdit &&                        
                            <InputWrapper>
                            <label>Senha Antiga</label>

                            <Input
                                type="password"
                                placeholder="Digite a nova senha"
                                background="admin"
                                onChange={e => setOldPassword(e.target.value)}
                                ref={oldPasswordRef}
                            />
                        </InputWrapper>
                        }

                        <InputWrapper>
                            <label>{modeEdit ? "Nova Senha" : "Senha"}</label>

                            <Input 
                                type="password"
                                placeholder={modeEdit ? "Digite a senha antiga" : "Digite a senha"}
                                background="admin"
                                onChange={e => setNewPassword(e.target.value)}
                                ref={newPasswordRef}
                            />
                        </InputWrapper>
                    </W50>
                    <W50>
                        {
                            user.role === "admin" &&
                            <InputWrapper>
                                <label>Domínio Vinculado</label>

                                <InputSelect 
                                    title="Selecione o domínio para vincular"
                                    group="domain"
                                    options={domains}
                                    objectValue="domain_name"
                                    onSelect={handleSelectDomain}
                                    selected={selectedDomain}
                                />
                            </InputWrapper>
                        }
                    </W50>
                    <Button title="Salvar" onClick={handleSendForm} />
                </Section>
            </Container>
        </Fixed>
        
    );
}