import { JsonView } from '@lesnoypudge/utils-react';
import { db } from '@fakeServer';
import { FC, useEffect, useRef, useState } from 'react';
import { isCallable } from '@lesnoypudge/utils';
import { useLocalStorage } from '@hooks';



export const TMP: FC = () => {
    // const [state] = useState(localStorage.getItem('db-1'));
    const refreshToken = useLocalStorage('refreshToken') as unknown as {
        setValue: () => void;
    };

    console.log(refreshToken);

    // useEffect(() => {
    //     refreshToken.setValue('qwezxc');
    // }, [refreshToken.setValue]);

    return (
        <>

            {/* <JsonView data={JSON.stringify(refreshToken) ?? ''}/> */}
        </>
    );
};