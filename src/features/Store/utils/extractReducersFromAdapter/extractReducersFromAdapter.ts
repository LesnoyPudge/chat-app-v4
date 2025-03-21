import { ReduxToolkit } from '@/libs';
import { pick } from '@lesnoypudge/utils';



const actionNames = [
    'addMany',
    'addOne',
    'removeAll',
    'removeMany',
    'removeOne',
    'setAll',
    'setMany',
    'setOne',
    'updateMany',
    'updateOne',
    'upsertMany',
    'upsertOne',
] as const satisfies (keyof ReduxToolkit.EntityAdapter<unknown, string>)[];

export const extractReducersFromAdapter = <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _Adapter extends ReduxToolkit.EntityAdapter<any, string>,
>(
    adapter: _Adapter,
) => {
    return pick(
        adapter,
        ...actionNames,
    );
};