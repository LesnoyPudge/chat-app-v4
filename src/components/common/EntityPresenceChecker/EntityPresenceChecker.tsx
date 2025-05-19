import { Navigator, Store } from '@/features';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';



export const EntityPresenceChecker = {
    Channel: ({ children }: PropsWithChildren) => {
        const { channelId, serverId } = Navigator.useParams('channel');

        const isServerExists = Store.useSelector(
            Store.Servers.Selectors.selectIsExistsById(serverId),
        );

        const isChannelExists = Store.useSelector(
            Store.Channels.Selectors.selectIsExistsById(channelId),
        );

        if (!isServerExists) {
            return (
                <Navigate
                    to={Navigator.navigatorPath.root()}
                    replace
                />
            );
        }

        if (!isChannelExists) {
            return (
                <Navigate
                    to={Navigator.navigatorPath.server({ serverId })}
                    replace
                />
            );
        }

        return children;
    },

    Server: ({ children }: PropsWithChildren) => {
        const { serverId } = Navigator.useParams('server');

        const isServerExists = Store.useSelector(
            Store.Servers.Selectors.selectIsExistsById(serverId),
        );

        if (!isServerExists) {
            return (
                <Navigate
                    to={Navigator.navigatorPath.root()}
                    replace
                />
            );
        }

        return children;
    },

    Conversation: ({ children }: PropsWithChildren) => {
        const { conversationId } = Navigator.useParams('conversation');

        const isConversationExists = Store.useSelector(
            Store.Conversations.Selectors.selectIsExistsById(conversationId),
        );

        if (!isConversationExists) {
            return (
                <Navigate
                    to={Navigator.navigatorPath.root()}
                    replace
                />
            );
        }

        return children;
    },
};