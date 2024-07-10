import { useState } from 'react';

import { Container, FixedContent } from './styles';

import { SideMenu } from '../../components/SideMenu';
import { Header } from '../../components/Header';
import { Biddings } from '../../components/Biddings';
import { NewBidding } from '../../components/NewBidding';
import { Users } from '../../components/Users';
import { Domains } from '../../components/Domains';
import { Details } from '../../components/Details';

export function Home() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [activeComponent, setActiveComponent] = useState("Licitações");

    const renderComponent = () => {
        switch(activeComponent) {
            case "Licitações":
                return <Biddings />;
            case "Usuários":
                return <Users />;
            case "Domínios":
                return <Domains />;
            case "Nova Licitação":
                return <NewBidding />;
            default:
                return null;
        }
    }

    return(
        <Container>
            <SideMenu 
                menuIsOpen={menuIsOpen}
                onCloseMenu={() => setMenuIsOpen(false)}
                onLinkClick={setActiveComponent}
            />

            <FixedContent>
                <Header 
                    title={activeComponent} 
                    onOpenMenu={() => setMenuIsOpen(true)} 
                    onLinkClick={setActiveComponent}
                />
            </FixedContent>
            
            <Details />
            {/* {renderComponent()} */}
        </Container>
    );
}