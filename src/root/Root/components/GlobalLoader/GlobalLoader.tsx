import { Overlay, Popover } from '@components';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { GlobalLoaderScreen } from '@screens/bundled';
import { getAnimationVariants, logger } from '@utils';
import { m } from 'motion/react';
import { FC, PropsWithChildren, useEffect } from 'react';



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

type GlobalLoaderContext = Overlay.Types.Controls;

const GlobalLoaderContext = ContextSelectable.createContext<
    GlobalLoaderContext
>();

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

    useEffect(() => {
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
    const controls = Overlay.useControls(true);

    return (
        <GlobalLoaderContext.Provider value={controls}>
            <Overlay.Provider
                outerState={controls.isOpen}
                onChange={controls.onChange}
            >
                <Popover.Provider
                    focused
                    blockable
                    blocking
                >
                    <Overlay.Wrapper>
                        <Popover.Wrapper>
                            <m.div
                                variants={animationVariants}
                                initial={animationVariants.initial.key}
                                animate={animationVariants.animate.key}
                                exit={animationVariants.exit.key}
                            >
                                <GlobalLoaderScreen/>
                            </m.div>
                        </Popover.Wrapper>
                    </Overlay.Wrapper>
                </Popover.Provider>
            </Overlay.Provider>

            {children}
        </GlobalLoaderContext.Provider>
    );
};