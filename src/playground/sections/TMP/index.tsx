import { JsonView, useConst, useRefManager, useTimeout, useIsFocused } from '@lesnoypudge/utils-react';
import { db, Dummies, FakeDB, scenarios, token } from '@fakeServer';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { deepEqual, isCallable, noop } from '@lesnoypudge/utils';
import { useLocalStorage } from '@hooks';
import { Form, Scrollable } from '@components';
import { v4 as uuid } from 'uuid';
import { cn, createStyles } from '@utils';



const styles = createStyles({
    a: 'animation-delay-0',
    b: 'animation-delay-100',
    c: 'animation-delay-300',
});

export const TMP: FC = () => {
    const ref = useRefManager<HTMLDivElement>(null);

    const options = {
        within: true,
        visible: true,
    };

    const { isFocused, isFocusedRef } = useIsFocused(ref, {
        stateless: false,
        ...options,
        onFocus: () => {
            console.log('FOCUS');
        },
        onBlur: () => {
            console.log('BLUR');
        },
    });

    // useEffect(() => {
    //     return isFocusedRef.effect((isFocused) => {
    //         console.log('isFocused:', isFocused);
    //     });
    // }, [isFocusedRef]);


    const className = cn(styles.a, styles.b, styles.c);

    return (
        <div className='flex h-dvh flex-col gap-2'>
            {className}

            <div className={className}></div>
        </div>
    );
};