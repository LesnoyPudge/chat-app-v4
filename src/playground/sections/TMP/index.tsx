import { JsonView, useConst, useRefManager, useTimeout, useIsFocused } from '@lesnoypudge/utils-react';
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
    const handleClick = () => {
        soundManager.play(ASSETS.SOUNDS.DISCORD_MUTE);
    };

    return (
        <div className='flex h-dvh flex-col gap-2'>
            <button onClick={handleClick}>
                <>sound</>
            </button>
        </div>
    );
};