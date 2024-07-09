import { Container, W50, InputWrapper } from './styles';

import { Section } from '../Section';
import { InputSelect } from '../InputSelect';
import { Button } from '../Button';
import { Input } from '../Input';

export function Users() {
    return (
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
    );
}