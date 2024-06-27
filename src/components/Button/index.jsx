import { Container } from './styles';

export function Button({ title, loading = false, background = "default", ...rest }) {
    return (
        <Container
            type="button"
            disabled={loading}
            $background={background}
            {...rest}
        >
            {title}
        </Container>
    );
}