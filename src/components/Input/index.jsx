import React from 'react';
import { Container } from './styles';
import MaskedInput from 'react-text-mask';

export function Input({ icon: Icon, maskType, background = "default", ...rest }) {
    let mask;
    let guide = true;

    switch(maskType) {
        case 'identification':
            mask = (inputValue) => {
                if (inputValue.length <= 7) {
                    return [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
                } else {
                    return [/\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
                }
            }
            guide = false; // Disable guide so it will only show the mask when input changes
            break;
        case 'date':
            mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
            break;
        case 'time':
            mask = [/\d/, /\d/, ':', /\d/, /\d/];
            break;
        default:
            mask = null;
            break;
    }

    return (
        <Container $background={background}>
            {Icon && <Icon size={20} />}
            {
                mask ? (
                    <MaskedInput
                        mask={mask}
                        guide={guide}
                        {...rest}
                    />
                ) : (
                    <input {...rest} />
                )
            }
        </Container>
    );
}
