import { FaPlus, FaArrowLeft, FaList } from 'react-icons/fa';

import { Button } from '../Button';

import { Container, Menu } from './styles';

export function Header({ onLinkClick, title, onOpenMenu }) {
    function handleLinkClick() {
        onLinkClick("Nova Licitação");
    }

    return (
        <Container>
            <Menu onClick={onOpenMenu}>
                <FaList />
            </Menu>

            <h1>{title}</h1>
            {
                title !== "Licitações" 
                ?
                <Button icon={FaArrowLeft} title="Voltar" /> 
                :
                <Button icon={FaPlus} title="Adicionar Licitação" onClick={handleLinkClick} />
            }
        </Container>
    );
}