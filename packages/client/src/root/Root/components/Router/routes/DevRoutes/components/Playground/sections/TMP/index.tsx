import { JsonView } from '@lesnoypudge/utils-react';
import { db } from '@fakeServer';
import { FC, useRef, useState } from 'react';
import { isCallable } from '@lesnoypudge/utils';



export const TMP: FC = () => {
    const [state] = useState(localStorage.getItem('db-1'));

    return (
        <>

            <JsonView data={state ?? ''}/>
        </>
    );
};