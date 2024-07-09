import { useState } from 'react';

import { Container, FixedContent } from './styles';

import { SideMenu } from '../../components/SideMenu';
import { Header } from '../../components/Header';
import { Biddings } from '../../components/Biddings';
import { NewBidding } from '../../components/NewBidding';
import { Users } from '../../components/Users';
import { Domains } from '../../components/Domains';

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
                <Header onOpenMenu={() => setMenuIsOpen(true)} />
            </FixedContent>
            
            {renderComponent()}
        </Container>
    );
}