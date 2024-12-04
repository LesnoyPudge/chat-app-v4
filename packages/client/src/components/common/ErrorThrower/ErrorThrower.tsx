import { never } from '@lesnoypudge/utils';
import { isDev } from '@vars';
import { FC } from 'react';



export const ErrorThrower: FC = () => {
    if (isDev) {
        never('ErrorThrower');
    }

    return null;
};