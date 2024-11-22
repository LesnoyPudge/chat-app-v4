import { scan } from 'react-scan';



export const preInit = () => {
    scan({
        enabled: true,
        log: true,
    });
};