import { Button, Dialog, Form, Overlay, Placeholder, Tooltip, ContextMenu } from '@components';
import { usePropsChange } from '@hooks';
import { isCallable, noop } from '@lesnoypudge/utils';
import { ContextConsumerProxy, useBoolean, useContextProxy, useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { Features } from '@redux/features';
import { useSliceActions, useSliceSelector, useStoreSelector } from '@redux/hooks';
import { RootState } from '@redux/store';
import { AnimatePresence, m } from 'motion/react';
import { ComponentRef, FC, PropsWithChildren, useEffect, useState } from 'react';



export const Playground: FC = () => {
    const leaderElementRef = useRefManager<HTMLButtonElement>(null);
    return (
        <div className='flex flex-col'>
            <div>
                <button ref={leaderElementRef}>
                    <>open menu</>
                </button>

                <ContextMenu.Node
                    leaderElementRef={leaderElementRef}
                    preferredAlignment='right'
                >
                    <ContextMenu.Container
                        label=''
                    >
                        <Button
                            className={ContextMenu.menuItemStyles}
                            {...ContextMenu.menuItemProps}
                        >
                            <>qwezxc</>
                        </Button>
                    </ContextMenu.Container>
                </ContextMenu.Node>
            </div>
        </div>
    );
};