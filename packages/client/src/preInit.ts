import { i18nInit } from '@i18n';
import { scan } from 'react-scan';



export const preInit = async () => {
    scan({
        enabled: true,
        log: true,
    });

    await i18nInit();
};