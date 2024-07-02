import { FiPlus, FiX } from "react-icons/fi";

import { Container } from './styles';

export function ArquiveItem({ isNew, value, onClick, ...rest }) {
    return (
        <Container isNew={isNew}>
        {/* TO DO: Mudar esse input do tipo text para type 'file' */}
            <input 
                type="text"
                value={value}
                readOnly={!isNew}
                {...rest}
            />

            <button
                type="button"
                onClick={onClick}
                className={isNew ? 'button-add' : 'button-delete'}
            >
                { isNew ? <FiPlus /> : <FiX />}
            </button>
        </Container>
    );
}