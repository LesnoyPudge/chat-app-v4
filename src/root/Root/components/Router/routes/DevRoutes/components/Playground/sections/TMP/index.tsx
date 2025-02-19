import { JsonView, useConst, useRefManager, useTimeout } from '@lesnoypudge/utils-react';
import { db, Dummies, FakeDB, scenarios, token } from '@fakeServer';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { deepEqual, isCallable, noop } from '@lesnoypudge/utils';
import { useLocalStorage } from '@hooks';
import { Form, Scrollable } from '@components';
import { v4 as uuid } from 'uuid';
import { cn, createStyles } from '@utils';



// const styles = createStyles({
//     wrapper: 'group/custom group group-form-invalid:bg-red-100',
//     a: `
//         group-hover-focus-visible:bg-zinc-200
//         group-hover-focus-visible/custom:p-40
//         hover-focus-visible:text-red-400
//     `,
//     b: `
//         group-hover-focus-visible:bg-red-800
//         group-hover-focus-visible/custom:p-4
//         hover-focus-visible:text-green-400
//     `,
// });

const styles = createStyles({
    wrapper: 'peer',
    a: 'hover-focus-visible:bg-green-600 peer-hover-focus-visible:bg-red-500',
    b: 'peer-hover-focus-visible:bg-red-800',
});

export const TMP: FC = () => {
    const className = cn(styles.a, styles.b);

    return (
        <div>
            <div className={styles.wrapper}>peer</div>

            <div className={className}>
                <div>hello</div>

                <div>{className}</div>
            </div>
        </div>
    );
};