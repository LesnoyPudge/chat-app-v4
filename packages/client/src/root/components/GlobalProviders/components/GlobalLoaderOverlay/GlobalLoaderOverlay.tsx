import { Dialog, Overlay } from '@components';
import { useConst, useContextProxy, useTimeout } from '@lesnoypudge/utils-react';
import { GlobalLoaderScreen } from '@pages/screens/GlobalLoaderScreen';
import { createStyles, createVariants } from '@utils';
import { FC, PropsWithChildren, Suspense } from 'react';



const styles = createStyles({
    animated: 'size-full',
    base: 'pointer-events-auto',
});

const variants = createVariants({
    initial: {
        opacity: 1,
        scale: 1,
    },
    animate: {},
    exit: {
        opacity: 0,
        scale: 1.5,
    },
});

type LoaderDisableProps = (
    PropsWithChildren
    & {
        startTime: number;
    }
);

const LoaderDisable: FC<LoaderDisableProps> = ({
    startTime,
    children,
}) => {
    const { closeOverlay } = useContextProxy(Overlay.Context);

    const isInstantSuspense = (Date.now() - startTime) < 100;
    const delay = isInstantSuspense ? 100 : 0;

    useTimeout(closeOverlay, delay);

    return children;
};

export namespace GlobalLoaderOverlay {
    export type Props = PropsWithChildren;
}

export const GlobalLoaderOverlay: FC<GlobalLoaderOverlay.Props> = ({
    children,
}) => {
    const startTime = useConst(() => Date.now());

    return (
        <Dialog.Provider
            label='Loading'
            initialState
            focused={false}
            withBackdrop={false}
            animationVariants={variants}
        >
            <Dialog.Wrapper>
                <GlobalLoaderScreen className={styles.base}/>
            </Dialog.Wrapper>

            <Suspense name='GlobalLoader'>
                <LoaderDisable startTime={startTime}>
                    {children}
                </LoaderDisable>
            </Suspense>
        </Dialog.Provider>
    );
};