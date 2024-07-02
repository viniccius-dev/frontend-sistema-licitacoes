import { FiPlus, FiX, FiUpload } from "react-icons/fi";

import { Container } from './styles';

export function ArquiveItem({ isNew, value, onClick, ...rest }) {
    return (
        <Container $isNew={isNew}>
        {/* TO DO: Mudar esse input do tipo text para type 'file' */}
            {
                !isNew ?

                <input 
                    type="text"
                    value={value}
                    readOnly={!isNew}
                    {...rest}
                />

                :

                <label htmlFor="arquive">
                    <span>Selecionar um arquivo <FiUpload /></span>
                    <input 
                        id="arquive"
                        type="file"
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