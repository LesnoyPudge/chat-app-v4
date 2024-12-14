import { Button, Form, Overlay, Tooltip } from '@components';
import { noop } from '@lesnoypudge/utils';
import { ContextConsumerProxy, useBoolean, useContextProxy, useRefManager } from '@lesnoypudge/utils-react';
import { AnimatePresence, m } from 'motion/react';
import { ComponentRef, FC, PropsWithChildren, useEffect, useState } from 'react';



export const Playground: FC = () => {
    const buttonRef = useRefManager<ComponentRef<'button'>>(null);
    const url = 'http://localhost:5000/api/some';
    // const url = '/api/some';
    const method = 'get';

    return (
        <div>
            <Tooltip
                leaderElementRef={buttonRef}
                preferredAlignment='right'
            >
                <>some tooltip</>
            </Tooltip>

            <Button
                onLeftClick={() => {
                    fetch(url, { method });
                }}
                innerRef={buttonRef}
            >
                <>test</>
            </Button>
        </div>
    );
};