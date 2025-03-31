import { FC, useEffect } from 'react';
import { Types } from '../../types';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { GlobalLoaderContext } from '../../context';
import { logger } from '@/utils';
import { toOneLine } from '@lesnoypudge/utils';



export const GlobalLoaderToggle: FC<Types.ActionComponentProps> = ({
    displayId,
    children,
}) => {
    const {
        enable,
        disable,
        isEnabled,
    } = ContextSelectable.useProxy(GlobalLoaderContext);

    useEffect(() => {
        if (isEnabled) return;

        displayId && logger.globalLoader.log(toOneLine(`
            ENABLE global loader with 
            id: ${displayId}, at: ${Date.now()}
        `));

        enable();

        return () => {
            displayId && logger.globalLoader.log(toOneLine(`
                DISABLE global loader with 
                id: ${displayId}, at: ${Date.now()}
            `));

            disable();
        };
    }, [disable, displayId, enable, isEnabled]);

    return children;
};