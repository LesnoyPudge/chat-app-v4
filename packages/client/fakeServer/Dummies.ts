
import { Endpoints } from '@fakeShared';
import { ClientEntities } from '@types';
import { v4 as uuid } from 'uuid';
import E_Channel = Endpoints.V1.Channel;
import E_Conversation = Endpoints.V1.Conversation;
import E_File = Endpoints.V1.File;
import E_Message = Endpoints.V1.Message;
import E_Role = Endpoints.V1.Role;
import E_Server = Endpoints.V1.Server;
import E_TextChat = Endpoints.V1.TextChat;
import E_User = Endpoints.V1.User;
import { inRange, invariant } from '@lesnoypudge/utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { nanoid } from '@reduxjs/toolkit';



export class Dummies {
    channel(
        data: (
            E_Channel.Create.RequestBody
            & Pick<ClientEntities.Channel.Base, 'textChat' | 'voiceChat'>
        ),
    ): ClientEntities.Channel.Base {
        const id = uuid();
        invariant(!data.textChat && !data.voiceChat);

        return {
            id,
            name: data.name,
            roleWhitelist: data.roleWhitelist,
            server: data.serverId,
            textChat: data.textChat,
            voiceChat: data.voiceChat,
        } as ClientEntities.Channel.Base;
    }

    conversation(
        data: (
            E_Conversation.Create.RequestBody
            & Pick<ClientEntities.Conversation.Base, 'textChat' | 'voiceChat'>
        ),
    ): ClientEntities.Conversation.Base {
        return {
            id: uuid(),
            textChat: data.textChat,
            voiceChat: data.voiceChat,
            user: data.targetId,
        };
    }

    message(
        data: (
            E_Message.Create.RequestBody
            & Pick<
                ClientEntities.Message.Base,
                'attachments' | 'author' | 'index'
            >
        ),
    ): ClientEntities.Message.Base {
        return {
            id: uuid(),
            attachments: data.attachments,
            author: data.author,
            content: data.content,
            createdAt: Date.now(),
            index: data.index,
            isDeleted: false,
            isModified: false,
            updatedAt: Date.now(),
        };
    }

    role(
        data: (
            E_Role.Create.RequestBody
            & Pick<
                ClientEntities.Role.Base,
                'avatar' | 'color' | 'isDefault' | 'weight'
            >
            & Partial<Pick<
                ClientEntities.Role.Base,
                'permissions'
            >>
        ),
    ): ClientEntities.Role.Base {
        return {
            id: uuid(),
            avatar: data.avatar,
            color: data.color,
            isDefault: data.isDefault,
            name: data.name,
            permissions: data.permissions ?? {
                admin: false,
                banMember: false,
                channelControl: false,
                createInvitation: true,
                kickMember: false,
                serverControl: false,
            },
            server: data.serverId,
            users: [],
            weight: data.weight,
        };
    }

    server(
        data: (
            E_Server.Create.RequestBody
            & Pick<ClientEntities.Server.Base, 'avatar' | 'owner'>
        ),
    ): ClientEntities.Server.Base {
        return {
            id: uuid(),
            avatar: data.avatar,
            banned: [],
            channels: [],
            identifier: data.identifier,
            invitations: [],
            isPrivate: false,
            members: [],
            name: data.name,
            owner: data.owner,
            roles: [],
        };
    }

    user(
        data: E_User.Registration.RequestBody,
    ): ClientEntities.User.Base {
        return {
            id: uuid(),
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
            login: data.login,
            mutedTextChats: [],
            name: data.name,
            password: data.password,
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

    textChatChannel(
        channelId: string,
    ): ClientEntities.TextChat.Base {
        return {
            id: uuid(),
            message: [],
            channel: channelId,
            conversation: null,
        };
    }


    textChatConversation(
        conversationId: string,
    ): ClientEntities.TextChat.Base {
        return {
            id: uuid(),
            message: [],
            channel: null,
            conversation: conversationId,
        };
    }

    voiceChatChannel(
        channelId: string,
    ): ClientEntities.VoiceChat.Base {
        return {
            id: uuid(),
            deafen: [],
            muted: [],
            participants: [],
            channel: channelId,
            conversation: null,
        };
    }

    voiceChatConversation(
        conversationId: string,
    ): ClientEntities.VoiceChat.Base {
        return {
            id: uuid(),
            channel: null,
            conversation: conversationId,
            deafen: [],
            muted: [],
            participants: [],
        };
    }

    file(
        data: ClientEntities.File.Encoded,
    ): ClientEntities.File.Base {
        return {
            id: uuid(),
            ...data,
        };
    }
}