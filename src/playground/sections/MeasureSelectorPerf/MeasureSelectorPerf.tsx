
import { Scrollable } from '@/components';
import { Store } from '@/features';
import { injectedStore } from '@/store/utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { deepEqual, invariant, toOneLine } from '@lesnoypudge/utils';
import {
    Focus,
    useBoolean,
    useCounter,
    useForceUpdate,
    useRefManager,
} from '@lesnoypudge/utils-react';
import React, { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { renderToString } from 'react-dom/server';



const measure = (fn: () => unknown) => {
    const iterationMax = 10_000;
    const resultHolder = Array.from({ length: iterationMax });
    let isFirstRun = true;
    let firstRunDuration = 0;
    let isSecondRun = true;
    let secondRunDuration = 0;

    const startTime = performance.now();

    for (let iteration = 0; iteration < iterationMax; iteration++) {
        resultHolder[iteration] = fn();
        if (isFirstRun) {
            isFirstRun = false;
            firstRunDuration = performance.now() - startTime;
        }

        if (!isFirstRun && isSecondRun) {
            isSecondRun = false;
            secondRunDuration = (
                performance.now()
                - startTime
                - firstRunDuration
            );
        }
    }

    const endTime = performance.now();
    const diffRaw = endTime - startTime;
    const diff = diffRaw / iterationMax;

    return {
        firstRunDuration,
        secondRunDuration,
        diff,
        resultHolder,
        totalDuration: diffRaw,
    };
};

const fnToMeasure = () => {
    const state = injectedStore.getStore().getState();
    const [first] = Store.TextChats.Selectors.selectAll(state);
    invariant(first);

    const messageId = (
        Store.TextChats.Selectors.selectDefinedMessageIdsById(first.id)
    )(state)?.[0];
    invariant(messageId);

    const { messageDisplayMode } = (
        Store.Users.Selectors
            .selectCurrentUserSettings(state)
    );

    const message = (
        Store.Messages.Selectors.selectById(messageId)(state)
    );
    invariant(message);

    return {
        messageDisplayMode,
        message,
    };
};

const startMeasure = () => {
    const {
        diff,
        resultHolder,
        totalDuration,
        firstRunDuration,
        secondRunDuration,
    } = measure(() => fnToMeasure());

    // @ts-expect-error
    window._res = resultHolder;

    console.log(toOneLine(`
        firstRunDuration: ${firstRunDuration}ms,
        secondRunDuration: ${secondRunDuration}ms,
        fnToMeasure: ${diff}ms, 
        total: ${totalDuration},
    `));
};

export const MeasureSelectorPerf: FC = () => {
    const state = useBoolean(false);
    const counter = useCounter();
    const [textChat] = Store.useSelector(
        Store.TextChats.Selectors.selectAll,
    );
    invariant(textChat);

    const [
        trigger,
        helpers,
    ] = Store.Messages.Api.useLazyMessageGetManyByTextChatIdQuery();

    useEffect(() => {
        if (!helpers.isUninitialized) return;

        void trigger({
            from: null,
            limit: 50,
            textChatId: textChat.id,
        });
    }, [trigger, textChat, helpers]);

    const buttonRef = useRefManager<HTMLButtonElement>(null);

    Focus.useMoveFocusInside({
        containerRef: buttonRef,
        isEnabled: true,
    });

    return (
        <Scrollable>
            <div className='flex flex-col gap-2'>
                <div>wow</div>

                <button
                    onClick={startMeasure}
                    ref={buttonRef}
                >
                    <If condition={helpers.isFetching}>
                        <>loading...</>
                    </If>

                    <If condition={helpers.isSuccess}>
                        <>measure</>
                    </If>
                </button>

                <button onClick={state.toggle}>toggle</button>

                <button onClick={() => counter.inc()}>recreate</button>

                {/* <If condition={state.value}>
                    <Inner key={counter.count}/>
                </If> */}

                <If condition={!state.value}>
                    <div>hidden</div>
                </If>
            </div>
        </Scrollable>
    );
};