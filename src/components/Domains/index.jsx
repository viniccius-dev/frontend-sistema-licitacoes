import { Container, W50, InputWrapper } from "./styles";

import { Section } from "../Section";
import { InputSelect } from "../InputSelect";
import { Button } from "../Button";
import { Input } from "../Input";

export function Domains() {
    return (
        <Container>
            <Section title="Domínios Registrados">
                <W50>
                    <InputWrapper>
                        <label>URL do domínio</label>

                        <InputSelect 
                            title="Selecione o URL do domínio"
                            group="domain"
                        />
                    </InputWrapper>
                    <Button className="button" title="Exportar Banco de Dados" />
                </W50>
                <W50>
                    <Button background="admin" title="Excluir" />
                    <Button title="Editar" />
                </W50>
            </Section>
            <Section title="Editar Domínio">
                <W50>
                    <InputWrapper>
                        <label>Nome</label>

                        <Input 
                            placeholder="Digite o nome do domínio"
                            background="admin"
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <label>URL do domínio</label>

                        <Input 
                            placeholder="Digite o URL do domínio"
                            background="admin"
                        />
                    </InputWrapper>
                </W50>
                <Button title="Salvar"/>
            </Section>
        </Container>
    );
}