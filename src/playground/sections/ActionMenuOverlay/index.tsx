import { JsonView, useConst, useRefManager, useTimeout, useIsFocused, Iterate, useBoolean } from '@lesnoypudge/utils-react';
import { db, Dummies, FakeDB, scenarios, token } from '@/fakeServer';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { deepEqual, isCallable, noop } from '@lesnoypudge/utils';
import { useLocalStorage } from '@/hooks';
import { ActionMenu, Button, Form, Overlay, Scrollable } from '@/components';
import { v4 as uuid } from 'uuid';
import { cn, createStyles } from '@/utils';
import { soundManager } from '@/features';
import { ASSETS } from '@/generated/ASSETS';



export const ActionMenuOverlay: FC = () => {
    const controls = Overlay.useControls();
    const buttonRef = useRefManager<HTMLButtonElement>(null);

    return (
        <div className='flex h-dvh flex-col gap-4'>
            <button onClick={controls.open} ref={buttonRef}>open</button>

            <Overlay.Menu.Provider
                controls={controls}
                label=''
                leaderElementOrRectRef={buttonRef}
                preferredAlignment='bottom'
                centered
            >
                <Overlay.Menu.Wrapper>
                    <ActionMenu.Wrapper className='bg-stone-700'>
                        <ActionMenu.Group>
                            <Button
                                className={ActionMenu.styles.button}
                                {...ActionMenu.buttonProps}
                            >
                                <>qwezxc</>
                            </Button>
                        </ActionMenu.Group>
                    </ActionMenu.Wrapper>
                </Overlay.Menu.Wrapper>
            </Overlay.Menu.Provider>
        </div>
    );
};