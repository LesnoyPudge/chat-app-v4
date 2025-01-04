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

    const NotificationCountBadge: FC<{ count: number }> = ({ count }) => {
        const formattedCount = formatNotificationCount(count);

        return (
            <div
                className={`
                        pointer-events-none
                        absolute
                        bottom-0
                        right-0
                        flex
                        h-1/3
                        w-[62.5%]
                        items-center
                        justify-center
                        rounded-lg
                        bg-danger
                        font-[sans-serif]
                        text-[25cqi]
                        font-bold
                        leading-none
                        text-white
                    `}
            >
                {formattedCount}
            </div>
        );
    };

    return (
        <Screen className='flex flex-col'>
            <Scrollable>
                <button>
                    <>first button</>
                </button>

                <button onClick={controls.open}>
                    <>open menu</>
                </button>

                <button>
                    <>last button</>
                </button>

                <Avatar.WithBadge.Notifications
                    className='size-12'
                    count={5}
                >
                    <Image
                        className='size-full rounded-full'
                        src='https://i.pravatar.cc/200?img=3'
                    />
                </Avatar.WithBadge.Notifications>

                <Avatar.WithBadge.Notifications
                    className='size-12'
                    count={60}
                >
                    <Image
                        className='size-full rounded-full'
                        src='https://i.pravatar.cc/200?img=3'
                    />
                </Avatar.WithBadge.Notifications>

                <Avatar.WithBadge.Notifications
                    className='size-12'
                    count={100}
                >
                    <Image
                        className='size-full rounded-full'
                        src='https://i.pravatar.cc/200?img=3'
                    />
                </Avatar.WithBadge.Notifications>

                <Avatar.WithBadge.Status
                    className='size-12'
                    status='online'
                    extraStatus='default'
                    withTooltip
                >
                    <Avatar.Base id='' className='size-full'/>
                </Avatar.WithBadge.Status>


                <Avatar.WithBadge.Status
                    className='size-12'
                    status='online'
                    extraStatus='afk'
                    withTooltip
                >
                    <Image
                        className='size-full rounded-full'
                        src='https://i.pravatar.cc/200?img=3'
                    />
                </Avatar.WithBadge.Status>


                <Avatar.WithBadge.Status
                    className='size-12'
                    status='online'
                    extraStatus='dnd'
                    withTooltip
                >
                    <Image
                        className='size-full rounded-full'
                        src='https://i.pravatar.cc/200?img=3'
                    />
                </Avatar.WithBadge.Status>

                <Avatar.WithBadge.Status
                    className='size-12'
                    status='online'
                    extraStatus='invisible'
                    withTooltip
                >
                    <Image
                        className='size-full rounded-full'
                        src='https://i.pravatar.cc/200?img=3'
                    />
                </Avatar.WithBadge.Status>

                {/* <div className='relative size-12 rounded-full @container'>
                    <Image
                        className='size-full rounded-full'
                        src='https://i.pravatar.cc/200?img=3'
                        style={{
                            maskImage: `url(#${MASK_ID.NOTIFICATION_BADGE_BIG})`,
                        }}
                    />

                    <NotificationCountBadge count={101}/>
                </div> */}

                <svg
                    className='size-0 overflow-hidden bg-red-600'
                >
                    {/* <foreignObject
                        x={0}
                        y={0}
                        className='size-full'
                        mask={`url(#${MASK_ID.AVATAR_WITH_STATUS_MASK})`}
                        style={{
                            maskSize: '100%',
                        }}
                    > */}
                    {/* <Image
                        className='size-full'
                        src='https://i.pravatar.cc/200?img=3'
                        style={{
                            maskImage: `url(#${MASK_ID.AVATAR_WITH_STATUS_MASK})`,
                        }}
                    /> */}
                    {/* </foreignObject> */}
                </svg>

                <AnimatePresence>
                    <If condition={controls.isOpen}>
                        <Focus.Lock
                            returnFocus
                            onActivation={(node) => {
                                console.log('activation', node);
                            }}
                            onDeactivation={() => {
                                console.log('deactivation');
                            }}
                            autoFocus={true}
                            enabled={true}
                            focusLock
                            preventScrollOnFocus
                            scrollLock
                            onClickOutside={controls.close}
                            onEscapeKey={controls.close}
                        >
                            <m.div
                                initial={{
                                    opacity: 0,
                                    scale: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0,
                                }}
                                transition={{
                                    duration: 5,
                                }}
                            >
                                <button
                                    className='focus-visible:bg-orange-800'
                                    onClick={controls.close}
                                >
                                    <>qwezxc</>
                                </button>
                            </m.div>
                        </Focus.Lock>
                    </If>
                </AnimatePresence>

                {/* <Modal.Base.Provider controls={controls} label=''>
                    <Modal.Base.Wrapper>
                        <button className='focus-visible:bg-orange-800'>
                            qwezxc
                        </button>
                    </Modal.Base.Wrapper>
                </Modal.Base.Provider> */}
            </Scrollable>
        </Screen>
    );
};