import { Button, Dialog, Form, Overlay, Placeholder, Tooltip } from '@components';
import { usePropsChange } from '@hooks';
import { isCallable, noop } from '@lesnoypudge/utils';
import { ContextConsumerProxy, useBoolean, useContextProxy, useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { Features } from '@redux/features';
import { useSliceActions, useSliceSelector, useStoreSelector } from '@redux/hooks';
import { RootState } from '@redux/store';
import { AnimatePresence, m } from 'motion/react';
import { ComponentRef, FC, PropsWithChildren, useEffect, useState } from 'react';



export const Playground: FC = () => {
    const { isMute } = useSliceSelector(
        Features.App.Slice,
        ({ isMute }) => ({ isMute }),
    );

    const { isDeaf } = useSliceSelector(
        Features.App.Slice,
        ({ isDeaf }) => ({ isDeaf: `${isDeaf}: ${Math.random()}` }),
    );

    const { isDeaf2 } = useStoreSelector((state) => {
        return {
            isDeaf2: `${state.App.isDeaf}: ${Math.random()}`,
        };
    });

    const selector = (() => (state: RootState) => {
        const users = Features.Users.StoreSelectors.selectAll()(state);

        const users2 = Features.Users.Slice.selectors.selectAll()(state.Users);
        console.log('warn', users, users2);
        return {
            entity: users.length ? users : [Math.random()],
            // entity: `user: ${JSON.stringify(
            // )}, num: ${Math.random()}`,
        };
    })();

    usePropsChange({ selector });

    const { entity } = useStoreSelector(selector);

    const {
        setIsMute,
    } = useSliceActions(Features.App.Slice);

    const toggle = useFunction(() => {
        setIsMute(!isMute);
    });


    return (
        <div className='flex flex-col'>
            <div>
                <button onClick={toggle}>
                    <>toggle: {String(isMute)}</>
                </button>
            </div>

            <div>
                <div>{isDeaf}</div>
            </div>

            <div>
                <div>{isDeaf2}</div>
            </div>

            <div>
                <div>{JSON.stringify(entity)}</div>
            </div>
        </div>
    );
};