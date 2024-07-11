import { FiChevronDown, FiChevronUp, FiCheck } from "react-icons/fi";

import { Container, SelectButton, Chevrons, OptionsList, Option } from './styles';
import { useState, useEffect }  from 'react';

export function InputSelect({ title, group, options, onSelect, selected, objectValue }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(selected || null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    useEffect(() => {
        setSelectedOption(selected);
    }, [selected]);

    return (
        <Container>
            <SelectButton onClick={toggleDropdown}>
                <div>
                    {selectedOption ? selectedOption[objectValue] : title}
                </div>

                <Chevrons>
                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </Chevrons>
            </SelectButton>

            {isOpen && (
                <OptionsList>
                    {options.map(option => (
                        <Option key={option.id} onClick={() => handleSelect(option)}>
                            <input 
                                type="radio"
                                name={group}
                                value={option[objectValue]}
                                checked={selectedOption && selectedOption[objectValue] === option[objectValue]}
                                readOnly
                            />
                            <span>{option[objectValue]}</span>
                            {selectedOption && selectedOption[objectValue] === option[objectValue] && <FiCheck />}
                        </Option>
                    ))}
                </OptionsList>
            )}
        </Container>
    );
}