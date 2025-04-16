import { FC } from 'react';
import { MessageContext } from '../../../../context';
import { Types } from '../../../../types';



export const MessageProvider: FC<Types.Provider.Props> = ({
    children,
    message,
    ...rest
}) => {
    const value: Types.Context = {
        ...rest,
        message,
        contentId: `contentId-${message.id}`,
        editTimestampId: `contentId-${message.id}`,
        timestampId: `contentId-${message.id}`,
        usernameId: `contentId-${message.id}`,
    };

    return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
    );
};