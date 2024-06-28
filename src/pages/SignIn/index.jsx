import { FiMail, FiLock } from 'react-icons/fi';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import logo from '../../assets/logo.png';

import { Container, Form, Background } from './styles';

export function SignIn() {
    return (
        <Container>
            <Background />
            <Form>
                <img src={logo} />
                <h2>Acesse sua conta</h2>

                <Input 
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                />

                <Input 
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                />
                
                <Button title="Entrar" />
            </Form>
        </Container>
        
    );
};