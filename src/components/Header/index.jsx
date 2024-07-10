import { useNavigate } from 'react-router-dom';

import { FaPlus, FaArrowLeft, FaList } from 'react-icons/fa';

import { Button } from '../Button';

import { Container, Menu } from './styles';

export function Header({ title, onOpenMenu }) {
    const navigate = useNavigate();

    function handleLinkClick() {
        navigate("/create-bidding");
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