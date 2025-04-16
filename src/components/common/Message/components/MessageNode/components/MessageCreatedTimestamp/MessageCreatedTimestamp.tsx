import { FC } from 'react';
import { useMessageContext } from '../../../../hooks';
import { MessageTimestamp } from '../MessageTimestamp';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



export const MessageCreatedTimestamp: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    const { message, timestampId } = useMessageContext();

    return (
        <MessageTimestamp
            className={className}
            id={timestampId}
            timestamp={message.createdAt}
        >
            {children}
        </MessageTimestamp>
    );
};