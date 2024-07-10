import { Container, W50, InputWrapper } from './styles';

import { Fixed } from '../../components/Fixed';
import { Section } from '../../components/Section';
import { InputSelect } from '../../components/InputSelect';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function Users() {

    return (
        <Fixed title="Usuários" route="/users">
            <Container>
                <Section title="Usuários Registrados">
                    <W50>
                        <InputWrapper>
                            <label>E-mail</label>

                            <InputSelect 
                                title="Selecione o e-mail atual do usuário"
                                group="email"
                            />
                        </InputWrapper>
                        <InputWrapper className="buttons">
                            <Button title="Excluir" background="admin" />
                            <Button title="Editar"/>
                        </InputWrapper>
                    </W50>
                </Section>

                <Section title="Editar Perfil">
                    <W50>
                        <InputWrapper>
                            <label>Nome</label>

                            <Input 
                                placeholder="Digite o nome"
                                background="admin"
                            />
                        </InputWrapper>
                        
                        <InputWrapper>
                            <label>E-mail</label>

                            <Input
                                type="email"
                                placeholder="Digite o e-mail"
                                background="admin"
                            />
                        </InputWrapper>
                    </W50>
                    
                    <W50>
                        <InputWrapper>
                            <label>Senha Antiga</label>

                            <Input 
                                type="password"
                                placeholder="Digite a senha antiga"
                                background="admin"
                            />
                        </InputWrapper>
                        
                        <InputWrapper>
                            <label>Nova Senha</label>

                            <Input
                                type="password"
                                placeholder="Digite a nova senha"
                                background="admin"
                            />
                        </InputWrapper>
                    </W50>
                    <Button title="Salvar"/>
                </Section>
            </Container>
        </Fixed>
        
    );
}