import { useLocalStorage } from '@/hooks';
import { useEffect } from 'react';



export const useHTMLVars = () => {
    const {
        messageFontSize,
    } = useLocalStorage('messageFontSize', 16);

    const {
        messageGroupSpacing,
    } = useLocalStorage('messageGroupSpacing', 20);

    const {
        theme,
    } = useLocalStorage('theme', 'dark');

    useEffect(() => {
        const html = document.documentElement;

        html.dataset.messageFontSize = String(messageFontSize.value);
        html.dataset.messageGroupSpacing = String(messageGroupSpacing.value);
        html.dataset.theme = theme.value;
    }, [
        messageFontSize.value,
        messageGroupSpacing.value,
        theme.value,
    ]);
};