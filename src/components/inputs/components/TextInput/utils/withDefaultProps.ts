import { TextInputTypes } from '../types';



type Options = Partial<TextInputTypes.Provider.PropsWithDefaultValues>;

type Return = TextInputTypes.Provider.PropsWithDefaultValues;

export const withDefaultProps = ({
    disabled = false,
    inputMode = 'text',
    maxLength = 32,
    minLength = 0,
    placeholder = '',
    readOnly = false,
    autoComplete = 'off',
    required = false,

}: Options): Return => {
    return {
        autoComplete,
        disabled,
        inputMode,
        maxLength,
        minLength,
        placeholder,
        readOnly,
        required,
    };
};