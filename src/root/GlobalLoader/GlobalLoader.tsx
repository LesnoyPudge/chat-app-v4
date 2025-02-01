import { Dialog, Overlay } from '@components';
import { useTrans } from '@i18n';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { GlobalLoaderScreen } from '@screens/bundled';
import { getAnimationVariants, logger } from '@utils';
import { FC, PropsWithChildren, useEffect, useLayoutEffect, useTransition } from 'react';


const { animationVariants } = getAnimationVariants.custom({
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

type GlobalLoaderContext = Overlay.Types.WithControls['controls'];

const GlobalLoaderContext = ContextSelectable.createContext<GlobalLoaderContext>();

export const LoaderDisable: FC<LoaderActionProps> = ({
    id,
    children,
}) => {
    const { close } = ContextSelectable.useProxy(GlobalLoaderContext);

    useEffect(() => {
        id && logger.log(`${Date.now()} disable global loader: ${id}`);

        close();
    }, [id, close]);

    return children;
};

export const LoaderEnable: FC<LoaderActionProps> = ({
    id,
    children,
}) => {
    const { open, close } = ContextSelectable.useProxy(GlobalLoaderContext);

    useLayoutEffect(() => {
        id && logger.log(`${Date.now()} enable global loader ${id}`);

        open();

        return () => {
            id && logger.log(`${Date.now()} toggle off global loader ${id}`);

            close();
        };
    }, [id, open, close]);

    return children;
};

export namespace GlobalLoaderWrapper {
    export type Props = PropsWithChildren;
}

export const GlobalLoaderWrapper: FC<GlobalLoaderWrapper.Props> = ({
    children,
}) => {
    const { t } = useTrans();
    const controls = Overlay.useOverlayControls(true);


    return (
        <GlobalLoaderContext.Provider value={controls}>
            <Dialog.Provider
                label={t('COMMON.Loading')}
                focused
                animationVariants={animationVariants}
                outerState={controls.isOpen}
                onChange={controls.onChange}
            >
                <Dialog.Wrapper>
                    <GlobalLoaderScreen/>
                </Dialog.Wrapper>
            </Dialog.Provider>

            {children}
        </GlobalLoaderContext.Provider>
    );
};