import { useState } from "react";
import { HiOutlineComputerDesktop, HiXMark } from "react-icons/hi2";
import { MdAssignment, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { TbNetwork, TbLogout2 } from "react-icons/tb";

import imgAvatarPlaceholder from "../../assets/avatar_placeholder.svg";

import { Container, Header, Title, Button, Role, Nav, Footer } from './styles';

export function SideMenu({ menuIsOpen, onCloseMenu, onLinkClick }) {
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [activeLink, setActiveLink] = useState("Licitações");
    const modalities = ["Chamada Pública", "Concorrência", "Credenciamento", "Pregão Eletrônico", "Pregão Presencial", "Tomada de Preços"];

    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        onLinkClick(linkName);
        if(linkName !== "Licitações") {
            setFiltersVisible(false);
        }
    };

    return (
        <Container data-menu-is-open={menuIsOpen}>
            <Header>
                <Title><HiOutlineComputerDesktop /> Painel Administrativo</Title>

                {menuIsOpen && (
                    <Button>
                        <HiXMark onClick={onCloseMenu} />
                    </Button>
                )}
            </Header>

            <Nav>
                <a
                    href="#"
                    data-menu-active={activeLink === "Licitações"}
                    data-filters-active={filtersVisible}
                    className="bidsButton"
                    onClick={() => {
                        handleLinkClick("Licitações");
                        toggleFilters();
                    }}
                >
                    <div>
                        <MdAssignment /> Licitações{" "}
                        {filtersVisible ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                    </div>
                    <div className="bidsFilters">
                        <ul>
                            <label>Modalidades</label>
                            {modalities.map((modality, index) => (
                                <li key={index}>
                                    <label>
                                        <input type="checkbox" value={modality} name="modalities" />
                                        <span>{modality}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <ul>
                            <label>Ano</label>
                            <li>
                                <label>
                                    <input type="checkbox" value="2024" name="year" />
                                    <span>2024</span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="checkbox" value="2023" name="year" />
                                    <span>2023</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </a>
                <a
                    href="#"
                    data-menu-active={activeLink === "Usuários"}
                    onClick={() => handleLinkClick("Usuários")}
                >
                    <FaUsers /> Usuários
                </a>
                <a
                    href="#"
                    data-menu-active={activeLink === "Domínios"}
                    onClick={() => handleLinkClick("Domínios")}
                >
                    <TbNetwork /> Domínios
                </a>
                <a
                    href="#"
                    data-menu-active={activeLink === "Sair"}
                    onClick={() => handleLinkClick("Sair")}
                >
                    <TbLogout2 /> Sair da Conta
                </a>
            </Nav>

            <Footer>
                <img src={imgAvatarPlaceholder} alt="Foto do usuário" />
                <div>
                    <strong>Marcos Vinícius</strong>
                    <small>vinicciusdev@gmail.com</small>
                </div>

                <Role type="button">admin</Role>
            </Footer>
        </Container>
    );
}
