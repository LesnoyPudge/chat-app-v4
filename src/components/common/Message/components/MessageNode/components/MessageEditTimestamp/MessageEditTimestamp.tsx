import { FC, PropsWithChildren } from 'react';
import { useMessageContext } from '../../../../hooks';
import { MessageTimestamp } from '..';



const styles = {
    wrapper: 'leading-none text-xs text-color-muted',
};

export const MessageModifiedTimestamp: FC<PropsWithChildren> = ({
    children,
}) => {
    const { editTimestampId, message } = useMessageContext();

    return (
        <If condition={message.isModified}>
            <MessageTimestamp
                className={styles.wrapper}
                timestamp={message.updatedAt}
                id={editTimestampId}
            >
                {children}
            </MessageTimestamp>
        </If>
    );
};