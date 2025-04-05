import { FC, useEffect } from 'react';
import { Types } from '../../types';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { GlobalLoaderContext } from '../../context';
import { logger } from '@/utils';
import { toOneLine } from '@lesnoypudge/utils';



export const GlobalLoaderDisable: FC<Types.ActionComponentProps> = ({
    displayId,
    children,
}) => {
    const { disable } = ContextSelectable.useProxy(GlobalLoaderContext);

    useEffect(() => {
        displayId && logger.globalLoader.log(toOneLine(`
            DISABLE global loader with 
            id: ${displayId}, at: ${Date.now()}
        `));

        disable();
    }, [
        disable,
        displayId,
    ]);

    return children;
};