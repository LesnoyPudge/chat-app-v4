import { FC } from 'react';
import { MessageContext } from '../../../../context';
import { Types } from '../../../../types';
import { Store } from '@/features';
import { useFunction } from '@lesnoypudge/utils-react';



export const MessageProvider: FC<Types.Provider.Props> = ({
    children,
    message,
    ...rest
}) => {
    const [
        toggleReactionTrigger,
    ] = Store.Messages.Api.useMessageToggleReactionMutation();

    const toggleReaction: (
        Types.Context['toggleReaction']
    ) = useFunction((code) => {
        void toggleReactionTrigger({
            code,
            messageId: message.id,
        });
    });

    const value: Types.Context = {
        ...rest,
        toggleReaction,
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