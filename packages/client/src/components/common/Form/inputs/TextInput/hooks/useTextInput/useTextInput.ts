import { useId } from 'react';
import { useFunction, useUniqueState } from '@lesnoypudge/utils-react';
import { TextInputTypes } from '../../textInputTypes';



export namespace useTextInput {
    export type Props = TextInputTypes.useTextInputProps;

    export type Return = TextInputTypes.useTextInputReturn;
}

export const useTextInput = ({
    field,
    type,
}: useTextInput.Props): useTextInput.Return => {
    const errorId = useId();
    const [fieldType, setType] = useUniqueState(type);

    const togglePasswordType = useFunction(() => {
        setType((prev) => prev === 'password' ? 'text' : 'password');
    });

    const onChange: useTextInput.Return['onChange'] = useFunction((e) => {
        field.handleChange(e.target.value);
    });

    return {
        type: fieldType,
        errorId,
        onChange,
        togglePasswordType,
    };
};