import { Container, FixedContent } from './styles';

import { SideMenu } from '../../components/SideMenu';
import { Header } from '../../components/Header';
import { NewBidding } from '../../components/NewBidding';

export function Home() {

    return(
        <Container>
            <SideMenu />

            <FixedContent>
                <Header />
            </FixedContent>

            <NewBidding />
        </Container>
    );
}