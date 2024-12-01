import { Overlay } from '@components';
import { ContextConsumerProxy, useContextProxy, useTimeout } from '@lesnoypudge/utils-react';
import { GlobalLoaderScreen } from '@pages/screens/GlobalLoaderScreen';
import { createStyles } from '@utils';
import { AnimatePresence, m } from 'motion/react';
import { FC, PropsWithChildren, Suspense } from 'react';



const styles = createStyles({
    animated: 'size-full',
    base: 'pointer-events-auto',
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
        <Overlay.Provider focused initialState>
            <ContextConsumerProxy context={Overlay.Context}>
                {({ isOverlayExist }) => (
                    <AnimatePresence>
                        <If condition={isOverlayExist}>
                            <Overlay.Wrapper>
                                <m.div
                                    className={styles.animated}
                                    initial={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 1.5,
                                    }}
                                >
                                    <GlobalLoaderScreen className={styles.base}/>
                                </m.div>
                            </Overlay.Wrapper>
                        </If>
                    </AnimatePresence>
                )}
            </ContextConsumerProxy>

            <Suspense name='GlobalLoader'>
                <LoaderDisable>
                    {children}
                </LoaderDisable>
            </Suspense>
        </Overlay.Provider>
    );
};