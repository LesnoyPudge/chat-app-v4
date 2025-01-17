import { Button, Dialog, Form, Overlay, Placeholder, Tooltip, ContextMenu, Avatar, Image, Scrollable, Modal, RelativelyPositioned, Iterate, PresenceStatus } from '@components';
import { usePropsChange } from '@hooks';
import { Screen } from '@layouts/bundled';
import { isCallable, noop } from '@lesnoypudge/utils';
import { ContextConsumerProxy, Focus, useBoolean, useContextProxy, useEventListener, useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { Features } from '@redux/features';
import { useSliceActions, useSliceSelector, useStoreSelector } from '@redux/hooks';
import { RootState } from '@redux/store';
import { formatNotificationCount } from '@utils';
import { MASK_ID } from '@vars';
import { AnimatePresence, m } from 'motion/react';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';



export const Playground: FC = () => {
    return (
        <Screen className='flex flex-col'>
            <Scrollable className='flex flex-col gap-2'>
                <PresenceStatus
                    extraStatus='default'
                    status='online'
                />
            </Scrollable>
        </Screen>
    );
};