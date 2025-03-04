import { JsonView, useConst, useRefManager, useTimeout, useIsFocused, Iterate, useBoolean } from '@lesnoypudge/utils-react';
import { db, Dummies, FakeDB, scenarios, token } from '@/fakeServer';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { deepEqual, isCallable, noop } from '@lesnoypudge/utils';
import { useLocalStorage } from '@/hooks';
import { Form, Scrollable } from '@/components';
import { v4 as uuid } from 'uuid';
import { cn, createStyles } from '@/utils';
import { soundManager } from '@/features';
import { ASSETS } from '@/generated/ASSETS';



export const TMP: FC = () => {
    const state = useBoolean(false);

    return (
        <div className='flex h-dvh flex-col gap-4'>
            <button onClick={() => {
                state.toggle();

                (
                    state.value
                        ? soundManager.play('', ASSETS.SOUNDS.DISCORD_MUTE)
                        : soundManager.play('', ASSETS.SOUNDS.DISCORD_UNMUTE)
                );
            }}>
                <>toggle {String(state.value)}</>
            </button>



            <Iterate items={Object.keys<typeof ASSETS.SOUNDS>(ASSETS.SOUNDS)}>
                {(name) => (
                    <div
                        className='flex flex-col gap-2 outline-dashed outline-red-900'

                        key={name}
                    >
                        <button
                            onClick={() => {
                                soundManager.play('', ASSETS.SOUNDS[name]);
                            }}
                        >
                            <>sound on: {name}</>
                        </button>

                        <button
                            onClick={() => {
                                soundManager.stop('', ASSETS.SOUNDS[name]);
                            }}
                        >
                            <>sound off: {name}</>
                        </button>
                    </div>
                )}
            </Iterate>

        </div>
    );
};