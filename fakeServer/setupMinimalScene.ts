import { invariant } from '@lesnoypudge/utils';
import { db } from './FakeDB';
import { Dummies } from './Dummies';
import { combineToTable } from './scenariosUtils';
import { v4 as uuid } from 'uuid';



export const setupMinimalScene = async (myId: string) => {
    const oldMe = db.getById('user', myId);
    invariant(oldMe);

    await db.clearStorage();

    const me = Dummies.user(oldMe);

    // const id = uuid();

    await db.set({
        user: combineToTable([
            me,
        ]),
    });
};