/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, memo, useMemo } from 'react';
import { KeyboardNavigation, Message, VirtualList } from '@/components';
import { useRefManager, withDisplayName } from '@lesnoypudge/utils-react';
import { Store } from '@/features';
import { invariant } from '@lesnoypudge/utils';
import { cn, createStyles } from '@/utils';
import { differenceInMinutes, isSameDay } from 'date-fns';
import { FeedDayDivider } from '../FeedDayDivider';
import { decorate } from '@lesnoypudge/macro';



const styles = createStyles({
    wrapper: {
        base: VirtualList.Styles.resetItemPaddingTop,
        withPadding: 'pt-[--message-group-spacing]',
    },
});

namespace getExtraMessageData {
    export type Props = {
        currentMessageAuthorId: string;
        currentMessageCreatedAt: number;
        prevMessageAuthorId: string | undefined;
        prevMessageCreatedAt: number | undefined;
    };

    export type Return = {
        isGroupHead: boolean;
        shouldShowDayDivider: boolean;
    };
}

const getExtraMessageData = ({
    currentMessageAuthorId,
    currentMessageCreatedAt,
    prevMessageAuthorId,
    prevMessageCreatedAt,
}: getExtraMessageData.Props): getExtraMessageData.Return => {
    if (!prevMessageAuthorId || !prevMessageCreatedAt) {
        return {
            isGroupHead: true,
            shouldShowDayDivider: false,
        };
    }

    const isSameAuthor = currentMessageAuthorId === prevMessageAuthorId;

    const isNewDay = !isSameDay(
        prevMessageCreatedAt,
        currentMessageCreatedAt,
    );

    const timeGap = differenceInMinutes(
        prevMessageCreatedAt,
        currentMessageCreatedAt,
    );

    const withTimeGap = timeGap >= 5;

    const isGroupHead = (
        !isSameAuthor
        || withTimeGap
        || isNewDay
    );

    const shouldShowDayDivider = isNewDay;

    return {
        isGroupHead,
        shouldShowDayDivider,
    };
};

export namespace FeedItem {
    export type Props = {
        messageId: string;
        previousMessageId: string | undefined;
    };
}

decorate(withDisplayName, 'FeedItem', decorate.target);
decorate(memo, decorate.target);

export const FeedItem: FC<FeedItem.Props> = ({
    messageId,
    previousMessageId,
}) => {
    const elementRef = useRefManager<HTMLDivElement>(null);
    const { tabIndex, setId } = KeyboardNavigation.useCommonItem({
        elementRef,
        itemId: messageId,
    });

    const { messageDisplayMode } = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserSettings,
    );

    const message = Store.useSelector(
        Store.Messages.Selectors.selectById(messageId),
    );
    invariant(
        message,
        'message should be defined, otherwise we would not be here',
    );

    const previousMessageAuthor = Store.useSelector(
        Store.Messages.Selectors.selectAuthorById(previousMessageId),
    );

    const previousMessageCreatedAt = Store.useSelector(
        Store.Messages.Selectors.selectCreatedAtById(previousMessageId),
    );

    const {
        isGroupHead,
        shouldShowDayDivider,
    } = useMemo(() => getExtraMessageData({
        currentMessageAuthorId: message.author,
        currentMessageCreatedAt: message.createdAt,
        prevMessageAuthorId: previousMessageAuthor,
        prevMessageCreatedAt: previousMessageCreatedAt,
    }), [
        message.author,
        message.createdAt,
        previousMessageAuthor,
        previousMessageCreatedAt,
    ]);

    const withPadding = isGroupHead && (message.index !== 0);

    return (
        <div
            className={cn(
                styles.wrapper.base,
                withPadding && styles.wrapper.withPadding,
            )}
            onClick={setId}
            onAuxClick={setId}
            onContextMenu={setId}
            data-index={message.index}
        >
            <If condition={shouldShowDayDivider}>
                <FeedDayDivider timestamp={message.createdAt}/>
            </If>

            <Message.Node
                message={message}
                isGroupHead={isGroupHead}
                messageDisplayMode={messageDisplayMode}
                tabIndex={tabIndex}
                innerRef={elementRef}
            />
        </div>
    );
};