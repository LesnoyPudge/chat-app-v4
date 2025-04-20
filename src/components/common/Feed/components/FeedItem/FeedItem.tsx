/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from 'react';
import { KeyboardNavigation, Message, VirtualList } from '@/components';
import { Focus, useRefManager } from '@lesnoypudge/utils-react';
import { Store } from '@/features';
import { coinFlip, invariant } from '@lesnoypudge/utils';
import { createStyles } from '@/utils';



const styles = createStyles({
    wrapper: `
        ${VirtualList.Styles.resetItemPaddingTop}
        pt-[--message-gap]
    `,
});

export namespace FeedItem {
    export type Props = {
        messageId: string;
    };
}

export const FeedItem: FC<FeedItem.Props> = ({
    messageId,
}) => {
    const elementRef = useRefManager<HTMLDivElement>(null);

    const {
        tabIndex,
        setFocusId,
        isFocused,
    } = KeyboardNavigation.useCommonItem({
        elementRef,
        itemId: messageId,
    });

    const { messageDisplayMode } = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserSettings,
    );

    const message = Store.useSelector(
        Store.Messages.Selectors.selectById(messageId),
    );
    invariant(message, 'message should be defined');

    return (
        <div
            className={styles.wrapper}
            onClick={setFocusId}
            onAuxClick={setFocusId}
            onContextMenu={setFocusId}
        >
            {/* <div className='h-32' tabIndex={tabIndex} ref={elementRef}>
                <>isFocused: {String(isFocused)} - {message.id}</>
            </div> */}
            <Message.Node
                message={message}
                isGroupHead
                messageDisplayMode={messageDisplayMode}
                tabIndex={tabIndex}
                innerRef={elementRef}
            />
        </div>
    );
};