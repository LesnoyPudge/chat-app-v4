import { ClientEntities } from '@/types';
import { inRange } from '@lesnoypudge/utils';
import { nanoid } from '@reduxjs/toolkit';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';



export class Dummies {
    static channel(
        data: (
            Pick<
                ClientEntities.Channel.Base,
                'id'
                | 'textChat'
                | 'roleWhitelist'
                | 'server'
                | 'name'
            >
        ),
    ): ClientEntities.Channel.Base {
        return {
            ...data,
        } as ClientEntities.Channel.Base;
    }

    static conversation(
        data: (
            Pick<
                ClientEntities.Conversation.Base,
                'id' | 'textChat' | 'members'
            >
        ),
    ): ClientEntities.Conversation.Base {
        return {
            ...data,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
    }

    static message(
        data: (
            T.Except<
                ClientEntities.Message.Base,
                'createdAt'
                | 'isDeleted'
                | 'isModified'
                | 'updatedAt'
                | 'reactions'
            >
        ),
    ): ClientEntities.Message.Base {
        return {
            ...data,
            reactions: [],
            isDeleted: false,
            isModified: false,
            createdAt: Date.now(),
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
            createdAt: Date.now(),
            updatedAt: Date.now(),
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
            | 'banned'
        >,
    ): ClientEntities.Server.Base {
        return {
            ...data,
            invitations: [{
                creator: data.owner,
                code: faker.string.alphanumeric({ casing: 'mixed', length: 6 }),
                createdAt: Date.now(),
                expiresAt: null,
            }],
            isPrivate: false,
            onlineMemberCount: 0,
            memberCount: data.members.length,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
    }

    static user(
        data: (
            Pick<
                ClientEntities.User.Base,
                'id'
                | 'login'
                | 'password'
                | 'name'
                | 'accessToken'
                | 'refreshToken'
            >
            & Partial<Pick<
                ClientEntities.User.Base,
                'status'
            >>
        ),
    ): ClientEntities.User.Base {
        return {
            ...data,
            accessCode: nanoid(6).toUpperCase(),
            avatar: null,
            blocked: [],
            conversations: [],
            defaultAvatar: (
                inRange(1, 4) as ClientEntities.User.Base['defaultAvatar']
            ),
            extraStatus: 'default',
            incomingFriendRequests: [],
            outgoingFriendRequests: [],
            friends: [],
            mutedConversations: [],
            hiddenConversations: [],
            isDeleted: false,
            bannerColor: [
                '#3FA7D6',
                '#F2B134',
                '#7C4DFF',
            ][inRange(0, 2)]!,
            lastSeenMessages: {},
            mutedServers: [],
            servers: [],
            settings: {
                messageDisplayMode: 'cozy',
                messageFontSize: 16,
                messageGroupSpacing: 20,
                theme: 'dark',
            },
            status: data.status ?? 'offline',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
    }

    static textChatChannel(
        data: T.SetNonNullable<Pick<
            ClientEntities.TextChat.Base,
            'id' | 'channel' | 'server'
        >> & Pick<ClientEntities.TextChat.Base, 'messages'>,
    ): ClientEntities.TextChat.Base {
        return {
            ...data,
            messageCount: data.messages.length,
            conversation: null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
    }

    static textChatConversation(
        data: T.SetNonNullable<Pick<
            ClientEntities.TextChat.Base,
            'id' | 'conversation'
        >> & Pick<ClientEntities.TextChat.Base, 'messages'>,
    ): ClientEntities.TextChat.Base {
        return {
            ...data,
            server: null,
            messageCount: data.messages.length,
            channel: null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
    }

    static file(
        data: ClientEntities.File.Encoded,
    ): ClientEntities.File.Base {
        return {
            id: uuid(),
            ...data,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
    }
}