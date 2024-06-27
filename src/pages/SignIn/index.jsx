import { FiMail, FiLock } from 'react-icons/fi';

import { Input } from '../../components/Input';

import { Container } from './styles';

export function SignIn() {
    return (
        <Container>
            <Input 
                placeholder="Nome"
                type="text"
                icon={FiMail}
            />  
        </Container>
        
    );
};