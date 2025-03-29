import { ReduxToolkit } from '@/libs';
import { sortFns } from '@lesnoypudge/utils';



type BaseState = {
    id: string;
    createdAt: number;
    updatedAt: number;
};

export const createEntityAdapter = <
    _State extends BaseState,
>() => ReduxToolkit.createEntityAdapter<_State>({
    sortComparer: sortFns.descending.select((v) => v.createdAt),
});