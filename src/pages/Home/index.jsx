import { useState } from 'react';

import { Container, FixedContent } from './styles';

import { SideMenu } from '../../components/SideMenu';
import { Header } from '../../components/Header';
import { NewBidding } from '../../components/NewBidding';
import { Users } from '../../components/Users';

export function Home() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [activeComponent, setActiveComponent] = useState("Licitações");

    const renderComponent = () => {
        switch(activeComponent) {
            case "Licitações":
                return <NewBidding />;
            case "Usuários":
                return <Users />;
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