import { FC, PropsWithChildren } from 'react';
import { logger } from '@utils';



export const createSleep = (duration: number, log = false) => {
    let isResolved = false;
    let timeoutId: number;

    const Sleep: FC<PropsWithChildren> = ({ children }) => {
        if (!isResolved) {
            log && logger.log(`sleeping for: ${duration}`);

            // eslint-disable-next-line @typescript-eslint/only-throw-error
            throw new Promise<void>((res) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    isResolved = true;

                    log && logger.log('sleep resolve');
                    res();
                }, duration);
            });
        }

        return children;
    };

    return Sleep;
};