import { JsonView, useConst, useRefManager, useTimeout } from '_@lesnoypudge/utils-react';
import { db, Dummies, FakeDB, scenarios, token } from '@fakeServer';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { deepEqual, isCallable, noop } from '@lesnoypudge/utils';
import { useLocalStorage } from '@hooks';
import { Form, Scrollable } from '@components';
import { v4 as uuid } from 'uuid';
import { cn, createStyles } from '@utils';
import { useIsFocused } from './useIsFocused';



const styles = createStyles({});

export const TMP: FC = () => {
    const ref = useRefManager<HTMLDivElement>(null);

    const options = {
        within: false,
        visible: true,
    };

    const { isFocused, isFocusedRef } = useIsFocused(ref, {
        stateless: false,
        ...options,
    });

    useEffect(() => {
        return isFocusedRef.effect((isFocused) => {
            console.log('isFocused:', isFocused);
        });
    }, [isFocusedRef]);


    return (
        <div className='flex h-dvh flex-col gap-2'>
            <div>isFocused {String(isFocused)} {
                JSON.stringify(options, null, 4)
            }
            </div>

            <button>before outer</button>

            <div
                className='flex flex-col gap-2 bg-green-800 p-4'
                tabIndex={0}
                ref={ref}
            >
                <button className='bg-red-900'>first</button>

                <button className='bg-red-900'>second</button>
            </div>

            <button>after outer</button>

            {/* <Scrollable autoHide>
                <div className='min-h-[2999px]'></div>
            </Scrollable> */}
        </div>
    );
};