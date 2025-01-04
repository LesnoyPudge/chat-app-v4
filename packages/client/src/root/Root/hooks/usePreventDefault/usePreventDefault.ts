import { useHotKey } from '@hooks';
import { KEY } from '@lesnoypudge/utils';
import { useEventListener } from '@lesnoypudge/utils-react';



const preventDefault = (e: Event) => e.preventDefault();

export const usePreventDefault = () => {
    useEventListener(document, 'contextmenu', preventDefault);
    useEventListener(document, 'drop', preventDefault);
    useEventListener(document, 'dragover', preventDefault);

    useHotKey(document, [KEY.P, KEY.Control], preventDefault);
};