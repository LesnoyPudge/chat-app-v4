import { useFunction } from '@lesnoypudge/utils-react';
import { isHtmlElement } from '@lesnoypudge/utils-web';
import { ChangeEvent, useDeferredValue, useState } from 'react';



export const useSearchControls = (initialValue?: string) => {
    const [value, setValue] = useState(initialValue ?? '');
    const deferredValue = useDeferredValue(value);

    const handleChange = useFunction((e: Event | ChangeEvent) => {
        const target = e.target;
        if (!isHtmlElement(target)) return;
        if (!('value' in target)) return;
        if (typeof target.value !== 'string') return;

        setValue(target.value);
    });

    return {
        value,
        deferredValue,
        setValue,
        handleChange,
    };
};