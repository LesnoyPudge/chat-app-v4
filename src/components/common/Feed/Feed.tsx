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
    } = useFeedContextProxy();


    if (shouldShowPlaceholder) {
        return (
            <FeedPlaceholder isStatic/>
        );
    }

    return (
        <FeedWrapper>
            {/* <FeedIntroduction/>

            <If condition={shouldShowMessagePlaceholder}>
                <FeedPlaceholder/>
            </If> */}

            <FeedList/>
        </FeedWrapper>
    );
});