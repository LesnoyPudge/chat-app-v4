import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { FeedScroller, FeedPlaceholder, FeedProvider, FeedWrapper } from './components';
import { Types } from './types';
import { decorate } from '@lesnoypudge/macro';
import { memo } from 'react';
import { useFeedContextProxy } from './context';
import { FeedList } from './components/FeedList';



const { withDecorator } = createWithDecorator<Types.FeedProvider.OwnProps>(({
    children,
    textChatId,
}) => {
    return (
        <FeedProvider textChatId={textChatId}>
            {children}
        </FeedProvider>
    );
});

decorate(withDisplayName, 'Feed', decorate.target);
decorate(memo, decorate.target);

export const Feed = withDecorator(() => {
    const {
        shouldShowPlaceholder,
        shouldShowMessagePlaceholder,
    } = useFeedContextProxy();

    if (shouldShowPlaceholder) {
        return (
            <FeedPlaceholder isStatic/>
        );
    }

    return (
        <FeedWrapper>
            {/* <If condition={shouldShowMessagePlaceholder}>
                <FeedPlaceholder/>
            </If> */}

            <FeedList/>
            {/* <FeedScroller/> */}
        </FeedWrapper>
    );
});