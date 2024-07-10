import { useState } from 'react';

import { Container, FixedContent } from './styles';

import { SideMenu } from '../../components/SideMenu';
import { Header } from '../../components/Header';

export function Fixed({ title, route, children }) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    return (
        <Container>
            <SideMenu 
                menuIsOpen={menuIsOpen}
                onCloseMenu={() => setMenuIsOpen(false)}
                onLinkClick={route}
            />

            <FixedContent>
                <Header 
                    title={title}
                    onOpenMenu={() => setMenuIsOpen(true)} 
                />
            </FixedContent>

            {children}
        </Container>
    );
}