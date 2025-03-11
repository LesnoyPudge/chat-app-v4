import { T } from '@lesnoypudge/types-utils-base/namespace';

export const navigatorDevPath = {
    playground: '/dev',
    playgroundAuthorized: '/dev-auth',
    errorScreen: '/dev/error-screen',
    authScreen: '/dev/auth-screen',
    invitationScreen: '/dev/invitation-screen',
    globalLoaderScreen: '/dev/global-loader-screen',
} as const;

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

export const params = {
    invitationCode: ':invitationCode',
    serverId: ':serverId',
    channelId: ':channelId',
    conversationId: ':conversationId',
} as const;

class Paths {
    root = `/` as const;
    auth = `/auth` as const;
    invitation = `/invitation/${params.invitationCode}` as const;
    conversation = `/conversation/${params.conversationId}` as const;
    server = `/server/${params.serverId}` as const;
    channel = `${this.server}/channel/${params.channelId}` as const;
}

// eslint-disable-next-line @typescript-eslint/no-misused-spread
export const staticNavigatorPath = { ...new Paths() };

export const pathToParams = {
    auth: [],
    root: [],
    invitation: ['invitationCode'],
    server: ['serverId'],
    conversation: ['conversationId'],
    channel: ['serverId', 'channelId'],
} as const satisfies Record<keyof Paths, (keyof typeof params)[]>;