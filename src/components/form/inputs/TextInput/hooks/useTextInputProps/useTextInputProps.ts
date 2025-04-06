import { Types } from '../../types';



export namespace useTextInputDefaults {
    export type Props = Types.useTextInputDefaultsProps;

    export type Return = Types.useTextInputDefaultsReturn;
}

export const useTextInputDefaults = ({
    className = '',
    placeholder = '',
    minLength = 0,
    maxLength = 32,
    inputMode = 'text',
    required = false,
    readOnly = false,
    disabled = false,
    autoComplete = false,
    spellCheck = false,
}: useTextInputDefaults.Props): useTextInputDefaults.Return => {
    return {
        className,
        placeholder,
        minLength,
        maxLength,
        inputMode,
        required,
        readOnly,
        disabled,
        autoComplete,
        spellCheck,
    };
};