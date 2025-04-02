/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Scrollable } from '@/components';
import { Store } from '@/features';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { deepEqual } from '@lesnoypudge/utils';
import { Focus, useBoolean, useCounter, useForceUpdate, useRefManager } from '@lesnoypudge/utils-react';
import React, { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { renderToString } from 'react-dom/server';



const useMeasurePerf = () => {
    const resultsRef = useRef<number[]>([]);
    const startTimeRef = useRef<number>(Number.NaN);
    const renderCountRef = useRef(0);
    const { forceUpdate } = useForceUpdate();

    const start = () => {
        startTimeRef.current = performance.now();
        renderCountRef.current += 1;
    };

    const end = () => {
        resultsRef.current.push(performance.now() - startTimeRef.current);
    };

    useEffect(() => {
        // if (renderCountRef.current < 20) {
        //     // flushSync(() => forceUpdate());
        //     forceUpdate();
        //     return;
        // }

        // console.log('testing ended', resultsRef.current);

        setTimeout(() => {
            if (renderCountRef.current < 20) {
            // flushSync(() => forceUpdate());
                forceUpdate();
                return;
            }

            console.log('testing ended', resultsRef.current);
        }, 10);
    });

    return {
        start,
        end,
    };
};

const Inner: FC = () => {
    // const { start, end } = useMeasurePerf();
    // console.log('render start');
    console.time('render');
    // start();

    const res = Store.useSelector(
        Store
            .Conversations
            .Selectors
            .selectIdsWithUnreadNotificationCountSortedByCount,
        // (state) => state.map(([v]) => v),
    );

    // const sortedConversationIds = Store.useSelector(
    //     (state) => (
    //         measure('sortedConversationIds', true, () => (
    //             Features
    //                 .Conversations
    //                 // .Selectors.selectAll()(state.Conversations)
    //                 .Selectors
    //                 .selectIdsWithUnreadNotificationCountSortedByCount()(state)
    //                 // .map((v) => v[0])
    //         )).sortedConversationIds
    //     ),
    // );

    // resultHolder.push(sortedConversationIds);

    // const conversationIdsToFetch = Store.useSelector(
    //     Features.Conversations.Slice,
    //     Features.Conversations.Selectors.selectUndefinedIdsByIds(
    //         sortedConversationIds,
    //     ),
    // );

    // Features.Conversations.Api.useGetManyDeepQuery({
    //     conversationIds: conversationIdsToFetch,
    // }, { skip: !conversationIdsToFetch.length });

    // const sortedServerIds = Store.useSelector(
    //     (state) => (
    //         Features
    //             .Servers
    //             .Selectors
    //             .selectIdsWithUnreadNotificationCountSortedByCount()(state)
    //             .map((v) => v[0])
    //     ),
    // );

    // const serverIdsWithoutNotifications = Store.useSelector(
    //     Features.Servers.Selectors.selectIdsWithoutUnreadNotifications(),
    // );

    // const serverIdsToFetch = Store.useSelector(
    //     Features.Servers.Slice,
    //     Features.Servers.Selectors.selectUndefinedIdsByIds([
    //         ...sortedServerIds,
    //         ...serverIdsWithoutNotifications,
    //     ]),
    // );

    // console.log('render end', Math.min(0, serverIdsToFetch.length, ids.length));
    console.timeEnd('render');

    // end();

    return 'calculated';

    // return ids.map((item) => (
    //     <div key={item}>{item}</div>
    // ));
};

const measure = <_Name extends string, _Result>(
    name: _Name,
    log: boolean,
    fn: T.AnyFunction<any, _Result>,
): Record<_Name, _Result> & { diff: number } => {
    const startTime = performance.now();

    const fnResult = fn();

    const diff = performance.now() - startTime;

    if (log) {
        console.log(`${name}: ${diff}ms`);
    }

    const result = {
        diff,
    } as Record<_Name, _Result> & { diff: number };

    // @ts-expect-error
    result[name] = fnResult;

    return result;
};

const resultHolder: unknown[] = [];
(window as any)._resultHolder = resultHolder;

const fnToMeasure = (log: boolean) => {
    const {
        sortedConversationIds,
    } = measure(
        'sortedConversationIds',
        log,
        function sortedConversationIds() {
            return (
                Store
                    .Conversations
                    .Selectors
                    .selectIdsWithUnreadNotificationCountSortedByCount(
                        Store.Utils.injectedStore.getStore().getState(),
                    )
                    // .map((v) => v[0])
            );
        },
    );

    // const {
    //     conversationIdsToFetch,
    // } = measure(
    //     'conversationIdsToFetch',
    //     log,
    //     function conversationIdsToFetch() {
    //         return (
    //             Features.Conversations.Selectors.selectUndefinedIdsByIds(
    //                 sortedConversationIds,
    //             )(store.getState().Conversations)
    //         );
    //     },
    // );

    // resultHolder.push(conversationIdsToFetch);

    // const {
    //     sortedServerIds,
    // } = measure(
    //     'sortedServerIds',
    //     log,
    //     function sortedServerIds() {
    //         return (
    //             Features
    //                 .Servers
    //                 .Selectors
    //                 .selectIdsWithUnreadNotificationCountSortedByCount()(
    //                     store.getState(),
    //                 ).map((v) => v[0])
    //         );
    //     },
    // );

    // const {
    //     serverIdsWithoutNotifications,
    // } = measure(
    //     'serverIdsWithoutNotifications',
    //     log,
    //     function serverIdsWithoutNotifications() {
    //         return (
    //             Features.Servers.Selectors.selectIdsWithoutUnreadNotifications()
    //         )(store.getState());
    //     },
    // );


    // const {
    //     serverIdsToFetch,
    // } = measure(
    //     'serverIdsToFetch',
    //     log,
    //     function serverIdsToFetch() {
    //         return (
    //             Features.Servers.Selectors.selectUndefinedIdsByIds([
    //                 ...sortedServerIds,
    //                 ...serverIdsWithoutNotifications,
    //             ])(store.getState().Servers)
    //         );
    //     },
    // );

    // resultHolder.push(serverIdsToFetch);
};

function startMeasure() {
    const { diff } = measure(
        'fnToMeasure',
        false,
        () => fnToMeasure(false),
    );
    console.log(`fnToMeasure: ${diff}ms`);
}

export const MeasureSelectorPerf: FC = () => {
    const state = useBoolean(false);
    const counter = useCounter();

    useEffect(() => {
        console.clear();
        return;
        const results: number[] = [];

        for (let index = 0; index < 1_000; index++) {
            const { diff } = measure('tmp', false, () => fnToMeasure(false));
            results.push(diff);
        }

        const sum = results.reduce<number>((acc, cur) => {
            return acc + cur;
        }, 0);

        console.log(`average measurement: ${sum / results.length}ms`);
        console.log('ready to start measure');
        // measure('fnToMeasure', fnToMeasure);
    }, []);

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
                    <>measure</>
                </button>

                <button onClick={state.toggle}>toggle</button>

                <button onClick={() => counter.inc()}>recreate</button>

                <If condition={state.value}>
                    <Inner key={counter.count}/>
                </If>

                <If condition={!state.value}>
                    <div>hidden</div>
                </If>
            </div>
        </Scrollable>
    );
};