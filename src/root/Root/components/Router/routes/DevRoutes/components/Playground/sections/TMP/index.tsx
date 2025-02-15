import { JsonView, useConst, useRefManager, useTimeout } from '@lesnoypudge/utils-react';
import { db, Dummies, FakeDB, scenarios, token } from '@fakeServer';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { deepEqual, isCallable } from '@lesnoypudge/utils';
import { useLocalStorage } from '@hooks';
import { Scrollable } from '@components';
import { v4 as uuid } from 'uuid';



export const TMP: FC = () => {
    // const db1 = useConst(() => new FakeDB());
    const [state, setState] = useState(db.getStorageClone());

    // useTimeout(() => {
    //     db.clearStorage();

    //     const id = uuid();
    //     const { accessToken, refreshToken } = token.generateTokens({
    //         id,
    //         password: 'zxc',
    //     });

    //     const user = db.create('user', Dummies.user({
    //         id,
    //         accessToken,
    //         refreshToken,
    //         login: 'qwe',
    //         password: 'zxc',
    //         name: 'qwezxc',
    //     }));

    //     scenarios.populate(user.id);

    //     // db1.create('user', Dummies.user({
    //     //     id: 'qwe',
    //     //     accessToken: 'zxczxc',
    //     //     login: 'qwe',
    //     //     name: 'qwezxc',
    //     //     password: 'zxc',
    //     //     refreshToken: 'qweqwe',
    //     // }));

    //     setState(db.getStorageClone());
    // }, 3_000);



    return (
        <JsonView data={JSON.stringify({ value: 'some' }) ?? ''}/>
    );
};