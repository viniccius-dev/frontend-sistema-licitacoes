import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineComputerDesktop, HiXMark } from "react-icons/hi2";
import { MdAssignment, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaUsers, FaUser } from "react-icons/fa";
import { TbNetwork, TbLogout2 } from "react-icons/tb";

import imgAvatarPlaceholder from "../../assets/avatar_placeholder.svg";
import { api } from "../../services/api";

import { Container, Header, Title, Button, Role, Nav, Footer } from './styles';
import { useAuth } from '../../hooks/auth';

export function SideMenu({ menuIsOpen, onCloseMenu, onLinkClick }) {
    const { user, signOut } = useAuth();
    const navigation = useNavigate();

    const [filtersVisible, setFiltersVisible] = useState(false);
    const [activeLink, setActiveLink] = useState(onLinkClick);
    const [modalities, setModalities] = useState([]);
    const [years, setYears] = useState([]);
    const [domains, setDomains] = useState([]);
    const [selectedModalities, setSelectedModalities] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);
    const [selectedDomains, setSelectedDomains] = useState([]);

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
        if(linkName !== "/" || activeLink !== "/" && linkName === "/") {
            onCloseMenu();
            navigation(linkName)
        }
        setActiveLink(linkName);
    };

    const handleModalitiesChange = (e) => {
        const { value, checked } = e.target;
        setSelectedModalities(prev => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(modality => modality !== value);
            }
        });
    };

    const handleYearsChange = (e) => {
        const { value, checked } = e.target;
        setSelectedYears(prev => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(year => year !== value);
            }
        });
    };

    const handleDomainsChange = (e) => {
        const { value, checked } = e.target;
        setSelectedDomains(prev => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(domain => domain !== value);
            }
        });
    };

    useEffect(() => {
        async function fetchFilters() {
            try {
                const response = await api.get("/bids/filters");
                setModalities(response.data.modalities);
                setYears(response.data.years);
                setDomains(response.data.domains);
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Não foi acessar dados do domínio");
                }
            }
        }
        
        fetchFilters();
    }, [setModalities, setYears]);

    useEffect(() => {
        const queryParams = new URLSearchParams();
        if (selectedModalities.length) {
            queryParams.append('modalities', selectedModalities.join(','));
        }
        if (selectedYears.length) {
            queryParams.append('years', selectedYears.join(','));
        }
        if (selectedDomains.length) {
            queryParams.append('domains', selectedDomains.join(','));
        }
        const queryString = queryParams.toString();
        if (queryString) {
            navigation(`/?${queryString}`);
        } else if (activeLink === "/") {
            navigation('/');
        }
    }, [selectedModalities, selectedYears, selectedDomains, navigation]);

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
                    data-menu-active={activeLink === "/" || activeLink === "/create-bidding"}
                    data-filters-active={filtersVisible}
                    className="bidsButton"
                    style={{cursor: "default"}}
                    onClick={(e) => {
                        handleLinkClick(e, "/");
                    }}
                >
                    <div onClick={toggleFilters} style={{cursor: "pointer"}}>
                        <MdAssignment /> Licitações{" "}
                        {filtersVisible ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                    </div>
                    <div className="bidsFilters">
                        {
                            user.role === "admin" &&
                            <ul>
                                <label>Domínios</label>
                                {domains.map((domain, index) => (
                                    <li key={index}>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                value={domain} 
                                                name="domains" 
                                                onChange={handleDomainsChange}
                                                checked={selectedDomains.includes(domain)}
                                            />
                                            <span>{domain}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        }
                        <ul>
                            <label>Modalidades</label>
                            {modalities.map((modality, index) => (
                                <li key={index}>
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            value={modality} 
                                            name="modalities" 
                                            onChange={handleModalitiesChange}
                                            checked={selectedModalities.includes(modality)}
                                        />
                                        <span>{modality}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <ul>
                            <label>Ano</label>
                            {years.map((year, index) => (
                                <li key={index}>
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            value={year} 
                                            name="years" 
                                            onChange={handleYearsChange}
                                            checked={selectedYears.includes(String(year))}
                                        />
                                        <span>{year}</span>
                                    </label>
                                </li>
                            ))}
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