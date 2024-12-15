import { sleep } from '@lesnoypudge/utils';
import { FC, PropsWithChildren } from 'react';
import { logger } from '@utils';



export const createSleep = (duration: number) => {
    let isResolved = false;
    let isLoading = false;

    const Sleep: FC<PropsWithChildren> = ({ children }) => {
        if (!isResolved && !isLoading) {
            isLoading = true;
            logger.log(`sleeping for: ${duration}`);
            // eslint-disable-next-line @typescript-eslint/only-throw-error, promise/always-return
            throw sleep(duration).then(() => {
                isResolved = true;
                isLoading = false;
            });
        }

        return children;
    };

    return Sleep;
};