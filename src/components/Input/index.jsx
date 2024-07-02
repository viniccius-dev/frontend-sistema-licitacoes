import { Container } from './styles';

export function Input({ icon: Icon, background = "default", ...rest }) {
    return(
        <Container $background={background}>
            {Icon && <Icon size={20} />}
            <input {...rest} />
        </Container>
    );
}