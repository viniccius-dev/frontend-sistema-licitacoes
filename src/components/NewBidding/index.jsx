import { Container, W50, InputWrapper } from './styles';

import { Input } from '../Input';
import { InputSelect } from '../InputSelect';
import { Textarea } from '../Textarea';

export function NewBidding() {
    const listModalities = [
        {id: 1, name: "Chamada Pública"},
        {id: 2, name: "Pregão Eletrônico"}
    ];

    const listStatus = [
        {id: 1, name: "Em Andamento"},
        {id: 2, name: "Finalizado"},
        {id: 3, name: "Suspenso"}
    ]

    return (
        <Container>
            <W50>
                <InputWrapper>
                    <label>Modalidade</label>

                    <InputSelect 
                        title="Selecione a Modalidade da Licitação"
                        group="modalidades"
                        options={listModalities}
                    />
                </InputWrapper>
                <InputWrapper>
                    <label>N° do processo da modalidade</label>

                    <Input 
                        placeholder="Digite o n° do processo da modalidade" 
                        background="admin"
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
                    />
                </InputWrapper>
                <InputWrapper>
                    <label>N° do processo licitatório</label>

                    <Input 
                        placeholder="Digite o n° do processo licitatório" 
                        background="admin"
                    />
                </InputWrapper>
            </W50>
            <W50>
                <InputWrapper>
                    <label>Data</label>

                    <Input
                        placeholder="Digite a data de realização"
                        background="admin"
                    />
                </InputWrapper>
                <InputWrapper>
                    <label>Horário</label>

                    <Input 
                        placeholder="Digite o horário de realização" 
                        background="admin"
                    />
                </InputWrapper>
            </W50>

            <InputWrapper>
                <label>Objeto</label>
                <Textarea placeholder="Digite a descrição do objeto da licitação" />
            </InputWrapper>

            <InputWrapper>
                <label>Observações</label>
                <Textarea placeholder="Digite observações referentes ao processo de licitação" />
            </InputWrapper>
        </Container>
    );
}