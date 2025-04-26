import { FC, PropsWithChildren, useEffect, useSyncExternalStore } from 'react';
import { LazyModulesContext } from '../../context';
import { Types } from '../../types';
import { useConst } from '@lesnoypudge/utils-react';
import { LazyModules } from '@/features';



export const LazyModulesProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const instance = useConst(() => new LazyModules());
    const isLoaded = useSyncExternalStore(
        (listener) => instance.onUpdate(listener),
        instance.getIsLoaded,
    );

    useEffect(() => {
        void instance.startLoading();
    }, [instance]);

    const value: Types.Context = {
        instance,
        isLoaded,
    };

    return (
        <LazyModulesContext.Provider value={value}>
            {children}
        </LazyModulesContext.Provider>
    );
};