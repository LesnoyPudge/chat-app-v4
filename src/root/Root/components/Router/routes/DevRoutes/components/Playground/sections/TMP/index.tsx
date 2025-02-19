import { JsonView, useConst, useRefManager, useTimeout } from '@lesnoypudge/utils-react';
import { db, Dummies, FakeDB, scenarios, token } from '@fakeServer';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { deepEqual, isCallable, noop } from '@lesnoypudge/utils';
import { useLocalStorage } from '@hooks';
import { Form, Scrollable } from '@components';
import { v4 as uuid } from 'uuid';
import { cn, createStyles } from '@utils';



const styles = createStyles({});

export const TMP: FC = () => {
    return (
        <div className='h-dvh'>
            <Scrollable autoHide>
                <div className='min-h-[2999px]'></div>
            </Scrollable>
        </div>
    );
};