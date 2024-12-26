import { ClientEntities } from '@types';
import { inRange, invariant } from '@lesnoypudge/utils';
import { nanoid } from '@reduxjs/toolkit';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { v4 as uuid } from 'uuid';



export class Dummies {
    static channel(
        data: (
            Pick<
                ClientEntities.Channel.Base,
                'id'
                | 'textChat'
                | 'voiceChat'
                | 'roleWhitelist'
                | 'server'
                | 'name'
            >
        ),
    ): ClientEntities.Channel.Base {
        invariant(data.textChat ?? data.voiceChat, 'chat not provided');

        return {
            ...data,
        } as ClientEntities.Channel.Base;
    }

    static conversation(
        data: (
            Pick<
                ClientEntities.Conversation.Base,
                'id' | 'textChat' | 'voiceChat' | 'user'
            >
        ),
    ): ClientEntities.Conversation.Base {
        return {
            ...data,
        };
    }

    static message(
        data: (
            Pick<
                ClientEntities.Message.Base,
                'id' | 'attachments' | 'author' | 'index' | 'content'
            >
        ),
    ): ClientEntities.Message.Base {
        return {
            ...data,
            createdAt: Date.now(),
            isDeleted: false,
            isModified: false,
            updatedAt: Date.now(),
        };
    }

    static role(
        data: (
            Pick<
                ClientEntities.Role.Base,
                'id'
                | 'avatar'
                | 'color'
                | 'isDefault'
                | 'name'
                | 'server'
                | 'users'
            >
            & Partial<Pick<
                ClientEntities.Role.Base,
                'permissions'
            >>
        ),
    ): ClientEntities.Role.Base {
        return {
            ...data,
            permissions: data.permissions ?? {
                admin: false,
                banMember: false,
                channelControl: false,
                createInvitation: true,
                kickMember: false,
                serverControl: false,
            },
            weight: 0,
        };
    }

    static server(
        data: Pick<
            ClientEntities.Server.Base,
            'id'
            | 'avatar'
            | 'owner'
            | 'identifier'
            | 'name'
            | 'channels'
            | 'roles'
            | 'members'
        >,
    ): ClientEntities.Server.Base {
        return {
            ...data,
            banned: [],
            invitations: [],
            isPrivate: false,
            onlineMemberCount: 0,
        };
    }

    static user(
        data: Pick<
            ClientEntities.User.Base,
            'id'
            | 'login'
            | 'password'
            | 'name'
            | 'accessToken'
            | 'refreshToken'
        >,
    ): ClientEntities.User.Base {
        return {
            ...data,
            accessCode: nanoid(6).toUpperCase(),
            avatar: null,
            blocked: [],
            conversations: [],
            defaultAvatar: inRange(1, 4) as 1 | 2 | 3 | 4,
            extraStatus: 'default',
            friendRequests: {
                incoming: [],
                outgoing: [],
            },
            friends: [],
            hiddenConversations: [],
            isDeleted: false,
            lastSeenMessages: [],
            mutedServers: [],
            servers: [],
            settings: {
                messageDisplayMode: 'cozy',
                messageFontSize: 16,
                messageGroupSpacing: 20,
                theme: 'dark',
            },
            status: 'offline',
        };
    }

    static textChatChannel(
        data: T.SetNonNullable<Pick<
            ClientEntities.TextChat.Base,
            'id' | 'channel'
        >>,
    ): ClientEntities.TextChat.Base {
        return {
            ...data,
            messages: [],
            conversation: null,
        };
    }


    static textChatConversation(
        data: T.SetNonNullable<Pick<
            ClientEntities.TextChat.Base,
            'id' | 'conversation'
        >>,
    ): ClientEntities.TextChat.Base {
        return {
            ...data,
            messages: [],
            channel: null,
        };
    }

    static voiceChatChannel(
        data: T.SetNonNullable<Pick<
            ClientEntities.TextChat.Base,
            'id' | 'channel'
        >>,
    ): ClientEntities.VoiceChat.Base {
        return {
            ...data,
            deafen: [],
            muted: [],
            participants: [],
            conversation: null,
        };
    }

    static voiceChatConversation(
        data: T.SetNonNullable<Pick<
            ClientEntities.VoiceChat.Base,
            'id' | 'conversation'
        >>,
    ): ClientEntities.VoiceChat.Base {
        return {
            ...data,
            channel: null,
            deafen: [],
            muted: [],
            participants: [],
        };
    }

    static file(
        data: ClientEntities.File.Encoded,
    ): ClientEntities.File.Base {
        return {
            id: uuid(),
            ...data,
        };
    }
}