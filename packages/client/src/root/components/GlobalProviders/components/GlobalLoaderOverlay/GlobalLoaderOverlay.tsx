import { Dialog, Overlay } from '@components';
import { useContextProxy, useTimeout } from '@lesnoypudge/utils-react';
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

const LoaderDisable: FC<PropsWithChildren> = ({
    children,
}) => {
    const { closeOverlay } = useContextProxy(Overlay.Context);

    useTimeout(closeOverlay, 50);

    return children;
};

export namespace GlobalLoaderOverlay {
    export type Props = PropsWithChildren;
}

export const GlobalLoaderOverlay: FC<GlobalLoaderOverlay.Props> = ({
    children,
}) => {
    return (
        <Dialog.Provider
            label='Loading'
            initialState
            withBackdrop={false}
            animationVariants={variants}
        >
            <Dialog.Wrapper>
                <GlobalLoaderScreen className={styles.base}/>
            </Dialog.Wrapper>

            <Suspense name='GlobalLoader'>
                <LoaderDisable>
                    {children}
                </LoaderDisable>
            </Suspense>
        </Dialog.Provider>
    );
};