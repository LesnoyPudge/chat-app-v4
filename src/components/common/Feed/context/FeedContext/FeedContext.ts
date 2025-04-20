import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export const {
    FeedContext,
    useFeedContextProxy,
    useFeedContextSelector,
} = ContextSelectable.createContextWithHooks<
    Types.Context
>().withName('Feed');