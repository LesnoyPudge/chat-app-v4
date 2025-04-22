import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { FeedIntroduction, FeedList, FeedPlaceholder, FeedProvider, FeedWrapper } from './components';
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
        shouldShowMessagePlaceholder,
        shouldShowPlaceholder,
        messagesPlaceholderRef,
    } = useFeedContextProxy();

    if (shouldShowPlaceholder) {
        return (
            <FeedPlaceholder/>
        );
    }

    return (
        <FeedWrapper>
            <FeedIntroduction/>

            <If condition={shouldShowMessagePlaceholder}>
                <FeedPlaceholder innerRef={messagesPlaceholderRef}/>
            </If>

            <FeedList/>
        </FeedWrapper>
    );
});