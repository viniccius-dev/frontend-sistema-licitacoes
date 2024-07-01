import { Container } from './styles';

import { SideMenu } from '../../components/SideMenu';
import { Header } from '../../components/Header';

export function Home() {
    return(
        <Container>
            <SideMenu />

            <Header />
        </Container>
    );
}