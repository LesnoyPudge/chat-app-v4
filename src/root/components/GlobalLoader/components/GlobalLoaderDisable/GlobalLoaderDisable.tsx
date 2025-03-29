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
    const {
        disable,
        isEnabled,
    } = ContextSelectable.useProxy(GlobalLoaderContext);

    useEffect(() => {
        if (!isEnabled) return;

        displayId && logger.log(toOneLine(`
            DISABLE global loader with 
            id: ${displayId}, at: ${Date.now()}
        `));

        disable();
    }, [disable, displayId, isEnabled]);

    return children;
};