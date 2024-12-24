import { useConst } from '@lesnoypudge/utils-react';
import { RootState } from '@redux/store';
import { memoize } from 'proxy-memoize';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';



const useTypedSelector = useSelector.withTypes<RootState>();

export const useStoreSelector = <
    _Return,
>(
    selector: (state: RootState) => _Return,
): _Return => {
    const _selector = useConst(() => memoize((state: RootState) => {
        return selector(state);
    }));

    const memoizedSelector = useCallback((state: RootState) => {
        return _selector(state);
    }, [_selector]);

    return useTypedSelector(memoizedSelector);
};