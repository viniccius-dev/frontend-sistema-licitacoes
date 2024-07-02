import { FaArrowLeft, FaList } from 'react-icons/fa';

import { Button } from '../Button';

import { Container, Menu } from './styles';

export function Header({ onOpenMenu }) {
    return (
        <Container>
            <Menu onClick={onOpenMenu}>
                <FaList />
            </Menu>

            <h1>Nova Licitação</h1>
            <Button icon={FaArrowLeft} title="Voltar" />
        </Container>
    );
}