import { Button, Dialog, Form, Overlay, Placeholder, Tooltip, ContextMenu, Avatar, Image, Scrollable } from '@components';
import { Modal } from '@entities';
import { usePropsChange } from '@hooks';
import { Screen } from '@layouts/bundled';
import { isCallable, noop } from '@lesnoypudge/utils';
import { ContextConsumerProxy, Focus, useBoolean, useContextProxy, useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { Features } from '@redux/features';
import { useSliceActions, useSliceSelector, useStoreSelector } from '@redux/hooks';
import { RootState } from '@redux/store';
import { formatNotificationCount } from '@utils';
import { MASK_ID } from '@vars';
import { AnimatePresence, m } from 'motion/react';
import { ComponentRef, FC, PropsWithChildren, useEffect, useRef, useState } from 'react';



export const Playground: FC = () => {
    const controls = Modal.useModalControls();


    return (
        <Screen className='flex flex-col'>
            <Scrollable className='flex flex-col gap-2'>
                <button>
                    <>first button</>
                </button>

                <button onClick={controls.open}>
                    <>open menu</>
                </button>

                <button>
                    <>last button</>
                </button>

                <Modal.Base.Provider
                    controls={controls}
                    label=''
                >
                    <Modal.Base.Wrapper>
                        <button
                            className='focus-visible:bg-orange-800'
                            onClick={controls.close}
                        >
                            <>qwezxc</>
                        </button>
                    </Modal.Base.Wrapper>
                </Modal.Base.Provider>
            </Scrollable>
        </Screen>
    );
};