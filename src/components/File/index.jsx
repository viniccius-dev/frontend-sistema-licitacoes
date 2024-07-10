import { FaFilePdf, FaFileWord, FaFileExcel, FaFileAlt } from 'react-icons/fa';
import { Container } from './styles';

export function File({ title, extension }) {
    const getIcon = (extension) => {
        switch (extension) {
            case '.pdf':
                return <FaFilePdf />;
            case '.doc':
            case '.docx':
                return <FaFileWord />;
            case '.xls':
            case '.xlsx':
                return <FaFileExcel />;
            default:
                return <FaFileAlt />;
        }
    };

    return (
        <Container>
            {getIcon(extension)}
            <span>{title}</span>
        </Container>
    );
}
