import { useState } from 'react';

import { Container, FixedContent } from './styles';

import { SideMenu } from '../../components/SideMenu';
import { Header } from '../../components/Header';
import { NewBidding } from '../../components/NewBidding';

export function Home() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    return(
        <Container>
            <SideMenu 
                menuIsOpen={menuIsOpen}
                onCloseMenu={() => setMenuIsOpen(false)}
            />

            <FixedContent>
                <Header onOpenMenu={() => setMenuIsOpen(true)} />
            </FixedContent>

            <NewBidding />
        </Container>
    );
}