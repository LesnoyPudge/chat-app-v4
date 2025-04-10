import { Button, Scrollable } from '@/components';
import { createSleep, lazyLoad, useBoolean } from '_@lesnoypudge/utils-react';
import { FC, PropsWithChildren, Suspense, useEffect } from 'react';



const Sleep = createSleep(3_000);

const Enable: FC = () => {
    useEffect(() => {
        console.log('loading enabled');

        return () => {
            //
        };
    }, []);

    return 'LOADING';
};

const Disable: FC<PropsWithChildren> = ({ children }) => {
    useEffect(() => {
        console.log('loading disabled');
    }, []);

    return children;
};

// lazyLoad.basePreloadedComponent(() => {})

const load = lazyLoad.createBasePreloadedComponent({
    delay: {
        delay: 3_000,
        enable: true,
    },
});

// const LazyA = load(() => {
//     console.log('LOAD LazyA');
//     return import('./LazyA').then((v) => ({ default: v.LazyA }));
// });

// const LazyB = load(() => {
//     console.log('LOAD LazyB');
//     return import('./LazyB').then((v) => ({ default: v.LazyB }));
// });


const { withPreloadGroup } = lazyLoad.createPreloadGroup();

const LazyA = lazyLoad.modifiedReactLazy(withPreloadGroup(() => {
    // console.log('LOAD LazyA');
    return import('./LazyA').then((v) => ({ default: v.LazyA }));
}));

const LazyB = lazyLoad.modifiedReactLazy(withPreloadGroup(() => {
    // console.log('LOAD LazyB');
    return import('./LazyB').then((v) => ({ default: v.LazyB }));
}));

// console.log(LazyA, LazyB);

export const LazyLoad: FC = () => {
    const bool = useBoolean(true);
    // useEffect(() => {
    //     console.clear();
    // }, []);
    return (
        <div className='flex flex-col gap-2'>
            <div className='text-center'>wow</div>

            <Scrollable>
                <div className='flex flex-col gap-2'>

                    <Button onAnyClick={bool.toggle}>
                        <>toggle: {String(bool.value)}</>
                    </Button>

                    <Suspense fallback={<Enable/>}>
                        <Disable>
                            <If condition={bool.value}>
                                <LazyA/>
                            </If>

                            <If condition={!bool.value}>
                                <LazyB/>
                            </If>
                        </Disable>
                    </Suspense>
                </div>
            </Scrollable>
        </div>
    );
};