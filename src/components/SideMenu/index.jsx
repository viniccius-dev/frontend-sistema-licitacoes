import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineComputerDesktop, HiXMark } from "react-icons/hi2";
import { MdAssignment, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaUsers, FaUser } from "react-icons/fa";
import { TbNetwork, TbLogout2 } from "react-icons/tb";

import imgAvatarPlaceholder from "../../assets/avatar_placeholder.svg";

import { Container, Header, Title, Button, Role, Nav, Footer } from './styles';
import { useAuth } from '../../hooks/auth';

export function SideMenu({ menuIsOpen, onCloseMenu, onLinkClick }) {
    const { user, signOut } = useAuth();
    const navigation = useNavigate();

    const [filtersVisible, setFiltersVisible] = useState(false);
    const [activeLink, setActiveLink] = useState(onLinkClick);
    const modalities = ["Chamada Pública", "Concorrência", "Credenciamento", "Pregão Eletrônico", "Pregão Presencial", "Tomada de Preços"];

    const toggleFilters = () => {
        if(activeLink === "/"){
            setFiltersVisible(!filtersVisible);
        }
    };

    function handleSignOut() {
        navigation("/");
        signOut();
    }

    const handleLinkClick = (e, linkName) => {
        e.preventDefault();
        if(linkName !== "/" || activeLink !== "/" && linkName === "/") {
            onCloseMenu();
            navigation(linkName)
        }
        setActiveLink(linkName);
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
                    data-menu-active={activeLink === "/"}
                    data-filters-active={filtersVisible}
                    className="bidsButton"
                    onClick={(e) => {
                        handleLinkClick(e, "/");
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
                    data-menu-active={activeLink === "/users"}
                    onClick={(e) => handleLinkClick(e, "/users")}
                >
                    {user.role !== "admin" ? <FaUser />  : <FaUsers /> }
                    {user.role !== "admin" ? "Perfil" : "Usuários"}
                </a>
                {
                    user.role === "admin" &&
                    <a
                        data-menu-active={activeLink === "/domains"}
                        onClick={(e) => handleLinkClick(e, "/domains")}
                    >
                        <TbNetwork /> Domínios
                    </a>
                }
                <a
                    data-menu-active={activeLink === "/logout"}
                    onClick={handleSignOut}
                >
                    <TbLogout2 /> Sair da Conta
                </a>
            </Nav>

            <Footer>
                <img src={imgAvatarPlaceholder} alt="Foto do usuário" />
                <div>
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                </div>

                <Role type="button">{user.role}</Role>
            </Footer>
        </Container>
    );
}
