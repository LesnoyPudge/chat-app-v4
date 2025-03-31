import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { LazyModulesContext } from '../../context';
import { Types } from '../../types';
import { promiseRetry, promiseTimeout } from '@lesnoypudge/utils';
import { logger } from '@/utils';



const setupPromise = <_Value,>(
    fn: () => Promise<_Value>,
): Promise<_Value> => {
    const TIMEOUT = 5_000;
    const ATTEMPTS = 3;

    return promiseRetry(() => promiseTimeout(fn(), TIMEOUT), ATTEMPTS);
};

const i18nCreatePromise = async () => {
    const { initI18n } = await import('@/features');

    await initI18n();
};

const serverCreatePromise = async () => {
    const { fakeServer } = await import('@/fakeServer');

    await fakeServer.init();
};

const getLoadedState = () => ({
    isLoaded: true,
});

export const LazyModulesProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const [i18n, setI18n] = useState<Types.Context['i18n']>({
        isLoaded: false,
    });
    const [server, setServer] = useState<Types.Context['server']>({
        isLoaded: false,
    });

    const areAllModulesLoaded = ([
        i18n,
        server,
    ].every((module) => {
        return module.isLoaded;
    }));

    useEffect(() => {
        void setupPromise(i18nCreatePromise).then(() => {
            setI18n(getLoadedState());
            logger.lazyModules.log('LazyModules: "i18n" ready');
        });

        void setupPromise(serverCreatePromise).then(() => {
            setServer(getLoadedState());
            logger.lazyModules.log('LazyModules: "server" ready');
        });
    }, []);

    return (
        <LazyModulesContext.Provider value={{
            i18n,
            server,
            areAllModulesLoaded,
        }}>
            {children}
        </LazyModulesContext.Provider>
    );
};