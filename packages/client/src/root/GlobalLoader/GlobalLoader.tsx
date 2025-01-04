import { Dialog } from '@components';
import { useContextProxy } from '@lesnoypudge/utils-react';
import { GlobalLoaderScreen } from '@screens/bundled';
import { createStyles, createVariants, logger } from '@utils';
import { FC, PropsWithChildren, useEffect } from 'react';



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
    const { setOverlay } = useContextProxy(Dialog.Context);

    useEffect(() => {
        id && logger.log(`${Date.now()} disable global loader: ${id}`);

        setOverlay(false);
    }, [id, setOverlay]);

    return children;
};

export const LoaderEnable: FC<LoaderActionProps> = ({
    id,
    children,
}) => {
    const { setOverlay } = useContextProxy(Dialog.Context);

    useEffect(() => {
        id && logger.log(`${Date.now()} enable global loader ${id}`);

        setOverlay(true);

        return () => {
            id && logger.log(`${Date.now()} toggle off global loader ${id}`);

            setOverlay(false);
        };
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
            focused
            animationVariants={variants}
        >
            <Dialog.Wrapper>
                <GlobalLoaderScreen className={styles.base}/>
            </Dialog.Wrapper>

            {children}
        </Dialog.Provider>
    );
};