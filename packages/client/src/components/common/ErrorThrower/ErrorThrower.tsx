import { isDev } from '@vars';
import { FC } from 'react';



export const ErrorThrower: FC = () => {
    if (isDev) {
        throw new Error('ErrorThrower');
    }

    return null;
};