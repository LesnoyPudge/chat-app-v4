import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { FeedPlaceholder, FeedProvider, FeedWrapper, FeedIntroduction, FeedList } from './components';
import { Types } from './types';
import { decorate } from '@lesnoypudge/macro';
import { memo } from 'react';
import { useFeedContextProxy } from './context';



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
        shouldShowIntroduction,
    } = useFeedContextProxy();

    if (shouldShowPlaceholder) {
        return (
            <FeedPlaceholder isStatic/>
        );
    }

    return (
        <FeedWrapper>
            <If condition={shouldShowIntroduction}>
                <FeedIntroduction/>
            </If>

            <If condition={shouldShowMessagePlaceholder}>
                <FeedPlaceholder/>
            </If>

            <FeedList/>
        </FeedWrapper>
    );
});