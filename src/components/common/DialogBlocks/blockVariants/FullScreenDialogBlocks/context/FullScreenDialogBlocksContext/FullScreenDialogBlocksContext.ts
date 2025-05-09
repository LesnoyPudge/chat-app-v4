import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export const {
    FullScreenDialogBlocksContext,
    useFullScreenDialogBlocksContextProxy,
    useFullScreenDialogBlocksContextSelector,
} = ContextSelectable.createContextWithHooks<Types.Context>().withName(
    'FullScreenDialogBlocks',
);