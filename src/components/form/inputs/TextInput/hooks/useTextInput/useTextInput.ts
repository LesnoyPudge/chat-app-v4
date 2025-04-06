import { useId, useState } from 'react';
import { useFunction } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export namespace useTextInput {
    export type Props = Types.useTextInputProps;

    export type Return = Types.useTextInputReturn;
}

export const useTextInput = ({
    field,
    type,
}: useTextInput.Props): useTextInput.Return => {
    const errorId = useId();
    const [fieldType, setType] = useState(type);

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