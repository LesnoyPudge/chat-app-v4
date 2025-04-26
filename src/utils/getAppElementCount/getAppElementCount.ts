import { getHTMLElement } from '@/utils';



export const getAppElementCount = () => {
    const { appRoot, overlayRoot } = getHTMLElement;

    const appCount = appRoot.querySelectorAll('*')?.length ?? 0;
    const overlayCount = overlayRoot.querySelectorAll('*')?.length ?? 0;

    return appCount + overlayCount;
};