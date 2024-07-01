import { HiOutlineComputerDesktop, HiXMark } from "react-icons/hi2";
import { MdAssignment, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaUser, FaUsers } from "react-icons/fa";
import { TbNetwork, TbLogout2 } from "react-icons/tb"

import { Container, Header, Title, Button, Nav } from './styles';

export function SideMenu() {
    return (
        <Container>
            <Header>
                <Title><HiOutlineComputerDesktop /> Painel Administrativo</Title>

                <Button>
                    <HiXMark />
                </Button>
            </Header>

            <Nav>
                <a href="#" data-menu-active="true"><MdAssignment /> Licitações <MdOutlineKeyboardArrowDown /></a>
                <a href="#"><FaUsers /> Usuários</a>
                <a href="#"><TbNetwork /> Domínios</a>
                <a href="#"><TbLogout2 /> Sair da Conta</a>
            </Nav>
        </Container>
    );
};