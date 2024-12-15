import { Dialog, Overlay } from '@components';
import { useContextProxy } from '@lesnoypudge/utils-react';
import { GlobalLoaderScreen } from '@pages/screens/GlobalLoaderScreen';
import { createStyles, createVariants, logger } from '@utils';
import { FC, PropsWithChildren, Suspense, useEffect } from 'react';



const styles = createStyles({
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

type LoaderActionProps = (
    PropsWithChildren
    & {
        id?: string;
    }
);

export const LoaderDisable: FC<LoaderActionProps> = ({
    id,
    children,
}) => {
    const { setOverlay } = useContextProxy(Overlay.Context);

    useEffect(() => {
        id && logger.log(`disable global loader: ${id}`);
        setOverlay(false);
    }, [id, setOverlay]);

    return children;
};

export const LoaderEnable: FC<LoaderActionProps> = ({
    id,
    children,
}) => {
    const { setOverlay } = useContextProxy(Overlay.Context);

    useEffect(() => {
        id && logger.log('enable global loader');
        setOverlay(true);
    }, [setOverlay, id]);

    return children;
};

export namespace GlobalLoaderWrapper {
    export type Props = PropsWithChildren;
}

export const GlobalLoaderWrapper: FC<GlobalLoaderWrapper.Props> = ({
    children,
}) => {
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
                {/* <LoaderDisable> */}
                {/* <Pass> */}
                {children}
                {/* </Pass> */}
                {/* </LoaderDisable> */}
            </Suspense>
        </Dialog.Provider>
    );
};