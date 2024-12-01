import { Button, Overlay } from '@components';
import { ContextConsumerProxy, useBoolean, useContextProxy } from '@lesnoypudge/utils-react';
import { AnimatePresence, m } from 'motion/react';
import { FC, PropsWithChildren, useEffect, useState } from 'react';



const HiddenComp: FC<PropsWithChildren> = ({
    children,
}) => {
    const { isOverlayExist } = useContextProxy(Overlay.Context);
    return (
        <AnimatePresence>
            <If condition={isOverlayExist}>
                {children}
            </If>
        </AnimatePresence>
    );
};

const Animated: FC = () => {
    return (
        <m.div
            className='bg-black'
            exit={{ opacity: 0, transition: { duration: 3 } }}
        >qwezxc
        </m.div>
    );
};

const Disable: FC = () => {
    const { closeOverlay, isOverlayExist } = useContextProxy(Overlay.Context);

    useEffect(() => {
        console.log({ isOverlayExist });
        closeOverlay();
    }, []);

    return null;
};

export const Playground: FC = () => {
    return (
        <>
            <Overlay.Provider initialState>
                <ContextConsumerProxy context={Overlay.Context}>
                    {({ toggleOverlay, isOverlayExist }) => (
                        <Button stylingPreset='brand' onLeftClick={toggleOverlay}>
                            <>state: {String(isOverlayExist)}</>
                        </Button>
                    )}
                </ContextConsumerProxy>

                <ContextConsumerProxy context={Overlay.Context}>
                    {({ isOverlayExist }) => (
                        <>
                            <AnimatePresence>
                                <If condition={isOverlayExist}>
                                    <div>
                                        <Animated/>
                                    </div>
                                </If>
                            </AnimatePresence>

                            <AnimatePresence>
                                <HiddenComp>
                                    <Animated/>
                                </HiddenComp>
                            </AnimatePresence>
                        </>
                    )}
                </ContextConsumerProxy>

            </Overlay.Provider>
        </>
    );
};