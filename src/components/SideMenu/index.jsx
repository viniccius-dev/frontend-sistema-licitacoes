import { HiOutlineComputerDesktop, HiXMark } from "react-icons/hi2";
import { MdAssignment, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaUser, FaUsers } from "react-icons/fa";
import { TbNetwork, TbLogout2 } from "react-icons/tb"

import { Container, Header, Title, Button, Nav, Footer } from './styles';

export function SideMenu({ menuIsOpen, onCloseMenu }) {
    return (
        <Container data-menu-is-open={menuIsOpen}>
            <Header>
                <Title><HiOutlineComputerDesktop /> Painel Administrativo</Title>

                {
                    menuIsOpen &&
                    <Button>
                        <HiXMark onClick={onCloseMenu} />
                    </Button>
                }
            </Header>

            <Nav>
                <a href="#" data-menu-active="true"><MdAssignment /> Licitações <MdOutlineKeyboardArrowDown /></a>
                <a href="#"><FaUsers /> Usuários</a>
                <a href="#"><TbNetwork /> Domínios</a>
                <a href="#"><TbLogout2 /> Sair da Conta</a>
            </Nav>
            
            <Footer>
                <img src="https://github.com/viniccius-dev.png" alt="Foto do usuário" />
                <div>
                    <strong>Marcos Vinícius</strong>
                    <small>vinicciusdev@gmail.com</small>
                </div>

                <Button type="button">
                    <TbLogout2 />
                </Button>
            </Footer>
        </Container>
    );
};