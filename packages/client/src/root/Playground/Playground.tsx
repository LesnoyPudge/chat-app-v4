import { Button, Dialog, Form, Overlay, Tooltip } from '@components';
import { noop } from '@lesnoypudge/utils';
import { ContextConsumerProxy, useBoolean, useContextProxy, useRefManager } from '@lesnoypudge/utils-react';
import { Features } from '@redux/features';
import { useSliceSelector } from '@redux/hooks';
import { AnimatePresence, m } from 'motion/react';
import { ComponentRef, FC, PropsWithChildren, useEffect, useState } from 'react';



export const Playground: FC = () => {
    const test = useBoolean(false);
    const devtools = useBoolean(false);

    return (
        <div className='flex flex-col'>
            <button onClick={test.toggle}>
                toggle test  {String(test.value)}
            </button>

            <Dialog.Provider
                label=''
                withBackdrop
                outerState={test.value}
                onChange={test.setValue}
            >
                <Dialog.Wrapper>
                    <ContextConsumerProxy context={Dialog.Context}>
                        {({ isOverlayExist }) => {
                            console.log({ isOverlayExist });
                            return (
                                <div className='pointer-events-auto absolute left-1/2 top-1/2 bg-red-700'>
                                    wow {String(isOverlayExist)}
                                </div>
                            );
                        }}
                    </ContextConsumerProxy>
                </Dialog.Wrapper>
            </Dialog.Provider>

            <button onClick={devtools.toggle}>
                toggle devtools {String(devtools.value)}
            </button>



            {/* <AnimatePresence>
                <If condition={value}>
                    <m.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                    >
                        <>wow</>
                    </m.div>
                </If>
            </AnimatePresence> */}
        </div>
    );
};