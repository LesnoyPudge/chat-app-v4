import { Button, Dialog, Form, Overlay, Placeholder, Tooltip } from '@components';
import { noop } from '@lesnoypudge/utils';
import { ContextConsumerProxy, useBoolean, useContextProxy, useRefManager } from '@lesnoypudge/utils-react';
import { Features } from '@redux/features';
import { useSliceSelector } from '@redux/hooks';
import { AnimatePresence, m } from 'motion/react';
import { ComponentRef, FC, PropsWithChildren, useEffect, useState } from 'react';



export const Playground: FC = () => {
    const state = useBoolean(false);

    return (
        <div className='flex flex-col'>
            <div>
                <button onClick={state.toggle}>toggle</button>
            </div>

            <p className='flex'>
                {
                    state.value
                        ? <>wow</>
                        : <Placeholder.Node containerClassName='flex-1'/>
                }
            </p>
        </div>
    );
};