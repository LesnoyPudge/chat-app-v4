import { Endpoints, ENTITY_NAME } from '@/fakeShared';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { db } from './FakeDB';
import { invariant } from '@lesnoypudge/utils';



export const flattenPopulated = async <
    _Prefix extends string,
    _Input extends Record<string, T.UnknownRecord | T.UnknownRecord[]>,
>(
    prefix: _Prefix,
    input: _Input[] | Promise<_Input[]>,
) => {
    const result = {} as {
        [_Key in keyof _Input as _Key extends string ? (
        `${_Prefix}${_Key}`
        ) : never]: (
            _Input[_Key] extends any[]
                ? _Input[_Key]
                : _Input[_Key][]
        ) | undefined
    };

    for (const obj of await input) {
        for (const key of Object.keys(obj)) {
            const newKey = `${prefix}${key}` as keyof typeof result;
            const value = obj[key];
            invariant(value !== undefined);

            const oldValue = (
                result[newKey] === undefined
                    ? []
                    : Array.isArray(result[newKey])
                        ? result[newKey]
                        : [result[newKey]]
            );

            result[newKey] = [
                ...oldValue,
                ...(Array.isArray(value) ? value : [value]),
            ] as T.ValueOf<typeof result>;
        }
    }

    return result;
};

export const getDeepServer = ({
    userId,
    serverId,
}: {
    userId: string;
    serverId: string;
}): Endpoints.V1.Server.GetManyDeep.Response => {
    const server = db.getById('server', serverId);
    invariant(server, 'server not found');

    const owner = (
        server.owner === userId
            ? undefined
            : db.getById('user', server.owner)
    );

    if (server.owner !== userId) {
        invariant(owner, 'owner not found');
    }

    const roles = db.getByIds('role', server.roles);

    const channels = db.getByIds('channel', server.channels);

    const textChatIds = channels.map((channel) => {
        return channel.textChat;
    }).filter(Boolean);

    const voiceChatIds = channels.map((channel) => {
        return channel.voiceChat;
    }).filter(Boolean);

    const textChats = db.getByIds('textChat', textChatIds);
    const voiceChats = db.getByIds('voiceChat', voiceChatIds);

    return {
        [ENTITY_NAME.USER]: [owner].filter(Boolean),
        [ENTITY_NAME.TEXT_CHAT]: [...textChats],
        [ENTITY_NAME.VOICE_CHAT]: [...voiceChats],
        [ENTITY_NAME.ROLE]: [...roles],
        [ENTITY_NAME.CHANNEL]: [...channels],
        [ENTITY_NAME.SERVER]: [server],
    };
};

export const getDeepConversation = ({
    userId,
    conversationId,
}: {
    userId: string;
    conversationId: string;
}): Endpoints.V1.Conversation.GetManyDeep.Response => {
    const conversation = db.getById('conversation', conversationId);
    invariant(conversation, 'conversation not found');

    const secondUserId = conversation.members.find((id) => id !== userId);
    const secondUser = db.getById('user', secondUserId);
    invariant(secondUser, 'secondUser not found');

    const textChat = db.getById('textChat', conversation.textChat);
    invariant(textChat, 'textChat not found');

    const voiceChat = db.getById('voiceChat', conversation.voiceChat);
    invariant(voiceChat, 'voiceChat not found');

    return {
        [ENTITY_NAME.USER]: [secondUser],
        [ENTITY_NAME.TEXT_CHAT]: [textChat],
        [ENTITY_NAME.VOICE_CHAT]: [voiceChat],
        [ENTITY_NAME.CONVERSATION]: [conversation],
    };
};

export const getAppData = async (
    userId: string,
): Promise<T.Except<Endpoints.V1.User.Refresh.Response, 'userData'>> => {
    const user = db.getById('user', userId);
    invariant(user);

    const {
        conv_Conversation,
        conv_TextChat,
        conv_User,
        conv_VoiceChat,
    } = await flattenPopulated('conv_', user.conversations.map((id) => {
        return getDeepConversation({ userId: user.id, conversationId: id });
    }));

    const {
        server_Channel,
        server_Role,
        server_Server,
        server_TextChat,
        server_User,
        server_VoiceChat,
    } = await flattenPopulated('server_', user.servers.map((id) => {
        return getDeepServer({ userId: user.id, serverId: id });
    }));

    const friends = db.getByIds('user', user.friends);

    return {
        [ENTITY_NAME.CHANNEL]: [...server_Channel ?? []],
        [ENTITY_NAME.CONVERSATION]: [...conv_Conversation ?? []],
        [ENTITY_NAME.MESSAGE]: [],
        [ENTITY_NAME.ROLE]: [...server_Role ?? []],
        [ENTITY_NAME.SERVER]: [...server_Server ?? []],
        [ENTITY_NAME.TEXT_CHAT]: [
            ...conv_TextChat ?? [],
            ...server_TextChat ?? [],
        ],
        [ENTITY_NAME.USER]: [
            ...conv_User ?? [],
            ...server_User ?? [],
            ...friends,
        ],
        [ENTITY_NAME.VOICE_CHAT]: [
            ...conv_VoiceChat ?? [],
            ...server_VoiceChat ?? [],
        ],
    };
};