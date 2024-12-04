import { useFunction, useUniqueState } from '@lesnoypudge/utils-react';



type FieldType = 'password' | 'text';

export const usePasswordToggle = (
    initialType: FieldType = 'password',
) => {
    const [type, setType] = useUniqueState(initialType);

    const toggleType = useFunction(() => {
        setType((prev) => prev === 'password' ? 'text' : 'password');
    });

    return {
        type,
        setType,
        toggleType,
    };
};