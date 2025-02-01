import { Endpoints } from '@fakeShared';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { db } from './FakeDB';
import { invariant } from '@lesnoypudge/utils';



export const getAppData = (
    userId: string,
): T.Except<Endpoints.V1.User.Refresh.Response, 'userData'> => {
    const user = db.getById('user', userId);
    invariant(user);

    const conversations = db.getByIds(
        'conversation',
        user.conversations,
    );

    const servers = db.getByIds(
        'server',
        user.servers,
    );

    const channels = db.getByIds(
        'channel',
        servers.flatMap((server) => server.channels),
    );

    const roles = db.getByIds(
        'role',
        servers.flatMap((server) => server.roles),
    );

    const textChats = db.getByIds(
        'textChat',
        channels.flatMap((channel) => channel.textChat ?? []),
    );

    const voiceChats = db.getByIds(
        'voiceChat',
        channels.flatMap((channel) => channel.textChat ?? []),
    );

    const users = db.getByIds(
        'user',
        [...new Set([
            user.id,
            ...user.friends,
            ...conversations.flatMap(({ members }) => members),
        ])],
    );

    return {
        Channel: channels,
        Conversation: conversations,
        Message: [],
        Role: roles,
        Server: servers,
        TextChat: textChats,
        User: users,
        VoiceChat: voiceChats,
    };
};