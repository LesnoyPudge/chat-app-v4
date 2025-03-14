/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Scrollable } from '@/components';
import { Features } from '@/redux/features';
import { useSliceSelector, useStoreSelector } from '@/redux/hooks';
import { store } from '@/redux/store';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { deepEqual } from '@lesnoypudge/utils';
import { useBoolean, useCounter, useForceUpdate } from '@lesnoypudge/utils-react';
import { db } from 'fakeServer/FakeDB';
import { memoize } from 'proxy-memoize';
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

    useStoreSelector(
        Features
            .Conversations
            .StoreSelectors
            .selectIdsWithUnreadNotificationCountSortedByCount(),
    );

    // const sortedConversationIds = useStoreSelector(
    //     (state) => (
    //         measure('sortedConversationIds', true, () => (
    //             Features
    //                 .Conversations
    //                 // .Slice.selectors.selectAll()(state.Conversations)
    //                 .StoreSelectors
    //                 .selectIdsWithUnreadNotificationCountSortedByCount()(state)
    //                 // .map((v) => v[0])
    //         )).sortedConversationIds
    //     ),
    // );

    // resultHolder.push(sortedConversationIds);

    // const conversationIdsToFetch = useSliceSelector(
    //     Features.Conversations.Slice,
    //     Features.Conversations.Slice.selectors.selectUndefinedIdsByIds(
    //         sortedConversationIds,
    //     ),
    // );

    // Features.Conversations.Api.useGetManyDeepQuery({
    //     conversationIds: conversationIdsToFetch,
    // }, { skip: !conversationIdsToFetch.length });

    // const sortedServerIds = useStoreSelector(
    //     (state) => (
    //         Features
    //             .Servers
    //             .StoreSelectors
    //             .selectIdsWithUnreadNotificationCountSortedByCount()(state)
    //             .map((v) => v[0])
    //     ),
    // );

    // const serverIdsWithoutNotifications = useStoreSelector(
    //     Features.Servers.StoreSelectors.selectIdsWithoutUnreadNotifications(),
    // );

    // const serverIdsToFetch = useSliceSelector(
    //     Features.Servers.Slice,
    //     Features.Servers.Slice.selectors.selectUndefinedIdsByIds([
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

// renderToString(<Inner/>);


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

const fnToMeasure = (log: boolean) => {
    const {
        sortedConversationIds,
    } = measure(
        'sortedConversationIds',
        log,
        // () => {
        //     console.log(deepEqual(db.getStorageClone(), db.getStorageClone()));

        // console.log(
        //     JSON.stringify(db.getStorageClone())
        //     === JSON.stringify(db.getStorageClone()),
        // );

        // JSON.stringify();
        // },
        function sortedConversationIds() {
            return (
                Features
                    .Conversations
                    .StoreSelectors
                    .selectIdsWithUnreadNotificationCountSortedByCount()(
                        store.getState(),
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
    //             Features.Conversations.Slice.selectors.selectUndefinedIdsByIds(
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
    //                 .StoreSelectors
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
    //             Features.Servers.StoreSelectors.selectIdsWithoutUnreadNotifications()
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
    //             Features.Servers.Slice.selectors.selectUndefinedIdsByIds([
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

export const TMP: FC = () => {
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

    return (
        <Scrollable className='flex flex-col gap-2'>
            <div>wow</div>

            <button onClick={startMeasure}>
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
        </Scrollable>
    );
};