import { Button, Form, Overlay, Tooltip } from '@components';
import { noop } from '@lesnoypudge/utils';
import { ContextConsumerProxy, useBoolean, useContextProxy, useRefManager } from '@lesnoypudge/utils-react';
import { Features } from '@redux/features';
import { useSliceSelector } from '@redux/hooks';
import { AnimatePresence, m } from 'motion/react';
import { ComponentRef, FC, PropsWithChildren, useEffect, useState } from 'react';



export const Playground: FC = () => {
    const { isDeaf } = useSliceSelector(
        Features.App.Slice,
        ({ isDeaf }) => ({ isDeaf }),
    );

    return (
        <div>
            <>pg {String(isDeaf)}</>
        </div>
    );
};