import { useTranslation } from 'react-i18next';



export const useTrans = (
    ...args: Parameters<typeof useTranslation>
) => {
    const res = useTranslation(...args);

    return {
        t: res[0],
        i18n: res[1],
        ready: res[2],
    };
};