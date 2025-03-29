import { FC, useEffect } from 'react';
import { Types } from '../../types';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { GlobalLoaderContext } from '../../context';
import { logger } from '@/utils';
import { toOneLine } from '@lesnoypudge/utils';



export const GlobalLoaderEnable: FC<Types.ActionComponentProps> = ({
    displayId,
    children,
}) => {
    const {
        enable,
        isEnabled,
    } = ContextSelectable.useProxy(GlobalLoaderContext);

    useEffect(() => {
        if (isEnabled) return;

        displayId && logger.log(toOneLine(`
            ENABLE global loader with 
            id: ${displayId}, at: ${Date.now()}
        `));

        enable();
    }, [displayId, enable, isEnabled]);

    return children;
};