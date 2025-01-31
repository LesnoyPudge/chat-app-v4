import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useFunction, useIsMounted } from '@lesnoypudge/utils-react';
import { CustomQueryFn } from '@redux/utils';
import { TypedMutationTrigger } from '@reduxjs/toolkit/query/react';
import { useRef, useState } from 'react';



export const useOptimisticQueue = <
    _State,
    _Trigger extends () => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ReturnType<TypedMutationTrigger<any, any, CustomQueryFn>>
    ),
    _PossibleActions extends [
        id: string,
        getState: () => _State,
        trigger: _Trigger,
    ][],
    _Names extends _PossibleActions[number][0],
>(
    initialState: _State,
    possibleActions: T.Narrow<_PossibleActions>,
) => {
    const [optimisticState, setOptimisticState] = useState(initialState);
    const lastActionIdRef = useRef<_Names>(null);
    const lastSuccessfulStateRef = useRef(initialState);
    const { getIsMounted } = useIsMounted();

    const getAction = useFunction((actionId: _Names) => {
        return (possibleActions as _PossibleActions).find((item) => {
            return item[0] === actionId;
        });
    });

    const trigger = useFunction((actionId: _Names) => {
        const action = getAction(actionId);
        if (!action) return;

        const [id, getState, actionTrigger] = action;

        const state = getState();
        setOptimisticState(state);

        if (lastActionIdRef.current !== null) {
            lastActionIdRef.current = id as _Names;
            return;
        }

        lastActionIdRef.current = id as _Names;

        void actionTrigger().then((res) => {
            if (!getIsMounted()) return;
            if (res.error) return;

            lastSuccessfulStateRef.current = state;
        }).finally(() => {
            if (!getIsMounted()) return;

            const lastActionId = lastActionIdRef.current;
            lastActionIdRef.current = null;

            // bail if queue is empty or last action is current action
            if (!lastActionId || lastActionId === id) {
                setOptimisticState(lastSuccessfulStateRef.current);
                return;
            }

            const lastAction = getAction(lastActionId);
            if (!lastAction) return;

            const [_, getLastActionState] = lastAction;
            const state = getLastActionState();

            // bail if current state is the same as from last action
            if (lastSuccessfulStateRef.current === state) return;

            trigger(lastActionId);
        });
    });

    return {
        value: optimisticState,
        trigger,
    };
};