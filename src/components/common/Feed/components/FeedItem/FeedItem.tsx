/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, memo } from 'react';
import { KeyboardNavigation, Message, VirtualList } from '@/components';
import { useRefManager, withDisplayName } from '@lesnoypudge/utils-react';
import { Store } from '@/features';
import { inRange, invariant } from '@lesnoypudge/utils';
import { cn, createStyles } from '@/utils';
import { differenceInMinutes, isSameDay } from 'date-fns';
import { FeedDayDivider } from '../FeedDayDivider';
import { decorate } from '@lesnoypudge/macro';



const styles = createStyles({
    wrapper: {
        base: 'pt-[--message-gap]',
        resetPadding: VirtualList.Styles.resetItemPaddingTop,
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
        index?: number;
    };
}

const h = new Map<string, number>();

decorate(withDisplayName, 'FeedItem', decorate.target);
decorate(memo, decorate.target);

export const FeedItem: FC<FeedItem.Props> = ({
    messageId,
    previousMessageId,
}) => {
    const elementRef = useRefManager<HTMLDivElement>(null);
    // const { tabIndex, setId } = KeyboardNavigation.useCommonItem({
    //     elementRef,
    //     itemId: messageId,
    // });
    const setId = () => {};
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
    } = getExtraMessageData({
        currentMessageAuthorId: message.author,
        currentMessageCreatedAt: message.createdAt,
        prevMessageAuthorId: previousMessageAuthor,
        prevMessageCreatedAt: previousMessageCreatedAt,
    });

    const shouldResetPadding = message.index === 0;

    // if (!h.has(messageId)) {
    //     const height = 40 + inRange(0, 35);

    //     h.set(messageId, height);
    // }

    return (
        <div
            className={cn(
                styles.wrapper.base,
                shouldResetPadding && styles.wrapper.resetPadding,
            )}
            // style={{
            //     height: h.get(messageId),
            // }}
            onClick={setId}
            onAuxClick={setId}
            onContextMenu={setId}
        >
            <If condition={shouldShowDayDivider}>
                <FeedDayDivider timestamp={message.createdAt}/>
            </If>

            {/* <div>{message.index} - {h.get(messageId)} - {messageId}</div> */}
            <Message.Node
                message={message}
                isGroupHead={isGroupHead}
                messageDisplayMode={messageDisplayMode}
                tabIndex={-1}
                // tabIndex={ta bIndex}
                innerRef={elementRef}
            />
        </div>
    );
};


// export const FeedItem: FC<FeedItem.Props> = ({
//     messageId,
//     previousMessageId,
//     index,
// }) => {
//     const elementRef = useRefManager<HTMLDivElement>(null);
//     // const { tabIndex, setId } = KeyboardNavigation.useCommonItem({
//     //     elementRef,
//     //     itemId: messageId,
//     // });
//     const setId = () => {};
//     // const { messageDisplayMode } = Store.useSelector(
//     //     Store.Users.Selectors.selectCurrentUserSettings,
//     // );

//     // const message = Store.useSelector(
//     //     Store.Messages.Selectors.selectById(messageId),
//     // );
//     // invariant(
//     //     message,
//     //     'message should be defined, otherwise we would not be here',
//     // );

//     // const previousMessageAuthor = Store.useSelector(
//     //     Store.Messages.Selectors.selectAuthorById(previousMessageId),
//     // );

//     // const previousMessageCreatedAt = Store.useSelector(
//     //     Store.Messages.Selectors.selectCreatedAtById(previousMessageId),
//     // );

//     // const {
//     //     isGroupHead,
//     //     shouldShowDayDivider,
//     // } = getExtraMessageData({
//     //     currentMessageAuthorId: message.author,
//     //     currentMessageCreatedAt: message.createdAt,
//     //     prevMessageAuthorId: previousMessageAuthor,
//     //     prevMessageCreatedAt: previousMessageCreatedAt,
//     // });

//     // const shouldResetPadding = message.index === 0;

//     if (!h.has(messageId)) {
//         const height = 40 + Math.floor(
//             inRange(0, Math.max(50, index) / 2) + inRange(0, 35),
//         );

//         h.set(messageId, height);
//     }

//     return (
//         <div
//             className={cn(
//                 styles.wrapper.base,
//                 // shouldResetPadding && styles.wrapper.resetPadding,
//             )}
//             // style={{
//             //     height: h.get(messageId),
//             // }}
//             onClick={setId}
//             onAuxClick={setId}
//             onContextMenu={setId}
//         >
//             {/* <If condition={shouldShowDayDivider}>
//                 <FeedDayDivider timestamp={message.createdAt}/>
//             </If> */}

//             <div>{index} - {h.get(messageId)} - {messageId}</div>
//             {/* <Message.Node
//                     message={message}
//                     isGroupHead={isGroupHead}
//                     messageDisplayMode={messageDisplayMode}
//                     tabIndex={tabIndex}
//                     innerRef={elementRef}
//                 /> */}
//         </div>
//     );
// };