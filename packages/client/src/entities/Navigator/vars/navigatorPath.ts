import { T } from '@lesnoypudge/types-utils-base/namespace';
import { params } from './params';
import { staticNavigatorPath } from './staticPath';



export const navigatorPath = {
    root: () => staticNavigatorPath.root,

    auth: () => staticNavigatorPath.auth,

    invitation: (props: { invitationCode: string }) => {
        return staticNavigatorPath.invitation.replace(
            params.invitationCode,
            props.invitationCode,
        );
    },

    conversation: (props: { conversationId: string }) => {
        return staticNavigatorPath.conversation.replace(
            params.conversationId,
            props.conversationId,
        );
    },

    server: (props: { serverId: string }) => {
        return staticNavigatorPath.server.replace(
            params.serverId,
            props.serverId,
        );
    },

    channel: (props: { serverId: string; channelId: string }) => {
        return staticNavigatorPath.channel.replace(
            params.serverId,
            props.serverId,
        ).replace(
            params.channelId,
            props.channelId,
        );
    },
} satisfies Record<keyof typeof staticNavigatorPath, T.AnyFunction>;