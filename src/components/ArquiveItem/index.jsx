import { FiX, FiUpload } from "react-icons/fi";

import { Container } from './styles';

export function ArquiveItem({ isNew, value, fileUrl, onClick, onFileChange, ...rest }) {
    const handleOpenFile = () => {
        if(fileUrl) {
            window.open(fileUrl, '_blank');
        }
    }

    return (
        <Container $isNew={isNew}>
            {
                !isNew ?

                <input 
                    type="text"
                    value={value}
                    readOnly={!isNew}
                    onClick={handleOpenFile}
                    {...rest}
                    title={value}
                />

                :

                <label htmlFor="arquive">
                    <span>Selecionar um arquivo <FiUpload /></span>
                    <input 
                        id="arquive"
                        type="file"
                        onChange={onFileChange}
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                    />
                </label>
            }

            {
                !isNew &&
                <button
                    type="button"
                    onClick={onClick}
                    className="button-delete"
                >
                    <FiX />
                </button>
            }
        </Container>
    );
}