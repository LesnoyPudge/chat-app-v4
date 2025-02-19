import { db } from './FakeDB';
import { Dummies } from './Dummies';
import { faker } from '@faker-js/faker';
import { catchErrorAsync, chance, coinFlip, inRange, invariant } from '@lesnoypudge/utils';
import { v4 as uuid } from 'uuid';
import { ClientEntities } from '@types';
import type { RichTextEditor } from '@components';
import { hoursToMilliseconds, minutesToMilliseconds } from 'date-fns';
import { logger } from '@utils';
import { flattenPopulated } from './utils';



const createArray = (len: number) => Array.from({ length: len });

const extractIds = (items: { id: string }[]) => items.map((item) => item.id);

const combineToTable = <_Item extends { id: string }>(items: _Item[]) => {
    return items.reduce<Record<string, _Item>>((acc, cur) => {
        acc[cur.id] = cur;

        return acc;
    }, {});
};

const createUser = () => {
    const user = Dummies.user({
        id: uuid(),
        accessToken: '',
        login: faker.string.sample(),
        password: faker.string.sample(),
        refreshToken: '',
        name: faker.person.firstName(),
    });

    user.status = coinFlip() ? 'online' : 'offline';

    if (chance(1 / 4)) {
        user.extraStatus = 'afk';
        return user;
    }

    if (chance(1 / 4)) {
        user.extraStatus = 'dnd';
        return user;
    }

    if (chance(1 / 4)) {
        user.extraStatus = 'invisible';
        return user;
    }

    user.extraStatus = 'default';

    return user;
};

const createMessage = (props: Pick<
    ClientEntities.Message.Base,
    'author' | 'conversation' | 'channel' | 'server' | 'index' | 'textChat'
>) => {
    const content = JSON.stringify(
        [{
            type: 'paragraph',
            children: [{ text: faker.lorem.paragraph(inRange(1, 3)) }],
        }] satisfies RichTextEditor.Types.Nodes,
    );

    const timeDiff = minutesToMilliseconds(
        Math.min(1, inRange(0, 3)) * props.index,
    );

    const hoursPadding = hoursToMilliseconds(24 * 10);
    const createdAt = Date.now() - hoursPadding + timeDiff;
    const timestamp = Math.min(
        Date.now(),
        createdAt,
    );

    if (createdAt >= Date.now()) {
        logger.warn('created too much messages, need to change timestamp generation');
    }

    if (props.conversation) {
        const message = Dummies.message({
            id: uuid(),
            author: props.author,
            attachments: [],
            content,
            index: props.index,
            conversation: props.conversation,
            textChat: props.textChat,
            server: null,
            channel: null,
        });

        message.createdAt = timestamp;
        message.updatedAt = timestamp;

        return message;
    }

    invariant(props.textChat);
    invariant(props.channel);
    invariant(props.server);

    const message = Dummies.message({
        id: uuid(),
        author: props.author,
        attachments: [],
        content,
        channel: props.channel,
        conversation: null,
        index: props.index,
        server: props.server,
        textChat: props.textChat,
    });

    message.createdAt = timestamp;
    message.updatedAt = timestamp;

    return message;
};

const createServer = (myId: string) => {
    const serverId = uuid();
    const owner = createUser();

    owner.servers = [serverId];

    const members = createArray(inRange(mul(3), mul(10))).map(() => {
        const user = createUser();

        user.servers = [serverId];

        return user;
    });

    const roles = createArray(inRange(mul(2), mul(5))).map(() => {
        return Dummies.role({
            avatar: null,
            color: faker.color.rgb(),
            id: uuid(),
            isDefault: false,
            name: faker.hacker.noun(),
            server: serverId,
            users: extractIds(members.slice(0, inRange(0, members.length))),
            permissions: {
                admin: chance(0.1),
                banMember: chance(0.1),
                channelControl: chance(0.3),
                createInvitation: chance(0.5),
                kickMember: chance(0.3),
                serverControl: chance(0.3),
            },
        });
    });

    const textChatIds = createArray(inRange(mul(1), mul(5))).map(() => uuid());
    const voiceChatIds = createArray(inRange(mul(1), mul(5))).map(() => uuid());

    const textChannelIds = createArray(textChatIds.length).map(() => uuid());
    const voiceChannelIds = createArray(voiceChatIds.length).map(() => uuid());

    const textChats = textChannelIds.map((channelId, index) => {
        const id = textChatIds[index];
        invariant(id);

        const messages = createArray(inRange(0, mul(25))).map((_, index) => {
            const member = members[inRange(0, members.length - 1)];
            invariant(member);

            return createMessage({
                author: member.id,
                channel: channelId,
                server: serverId,
                conversation: null,
                index,
                textChat: id,
            });
        });

        const chat = Dummies.textChatChannel({
            id,
            channel: channelId,
            server: serverId,
            messages: extractIds(messages),
        });

        return {
            chat,
            messages,
        };
    });

    const voiceChats = voiceChatIds.map((channelId, index) => {
        const id = voiceChannelIds[index];
        invariant(id);

        return Dummies.voiceChatChannel({
            id,
            channel: channelId,
            server: serverId,
        });
    });

    const textChannels = textChannelIds.map((id, index) => {
        const textChat = textChats[index]?.chat;
        invariant(textChat);

        return Dummies.channel({
            id,
            name: faker.animal.petName(),
            roleWhitelist: [],
            server: serverId,
            textChat: textChat.id,
            voiceChat: null,
        });
    });

    const voiceChannels = voiceChannelIds.map((id, index) => {
        const voiceChat = voiceChats[index];
        invariant(voiceChat);

        return Dummies.channel({
            id,
            name: faker.animal.petName(),
            roleWhitelist: [],
            server: serverId,
            voiceChat: voiceChat.id,
            textChat: null,
        });
    });

    const server = Dummies.server({
        avatar: null,
        id: serverId,
        channels: extractIds([
            ...textChannels,
            ...voiceChannels,
        ]),
        identifier: faker.string.sample(),
        members: [
            ...extractIds(members),
            myId,
        ],
        name: faker.company.name(),
        owner: owner.id,
        roles: extractIds(roles),
    });

    return {
        members,
        server,
        owner,
        roles,
        textChats: textChats.flatMap(({ chat }) => chat),
        voiceChats,
        textChannels,
        voiceChannels,
        messages: textChats.flatMap(({ messages }) => messages),
    };
};

const createConversation = (myId: string, userId: string) => {
    const id = uuid();
    const textChatId = uuid();

    const messages = createArray(inRange(0, mul(15))).map((_, index) => {
        const author = chance(0.5) ? myId : userId;

        return createMessage({
            author,
            channel: null,
            server: null,
            conversation: id,
            index,
            textChat: textChatId,
        });
    });

    const textChat = Dummies.textChatConversation({
        id: textChatId,
        conversation: id,
        messages: extractIds(messages),
    });

    const voiceChat = Dummies.voiceChatConversation({
        id: uuid(),
        conversation: id,
    });

    const conversation = Dummies.conversation({
        id,
        textChat: textChat.id,
        voiceChat: voiceChat.id,
        members: [myId, userId],
    });

    return {
        textChat,
        voiceChat,
        conversation,
        messages,
    };
};

type PopulateOptions = {
    myId: string;
    size: 'small' | 'medium' | 'large';
};

const sizeNameToMultiplier = {
    small: 1,
    medium: 3,
    large: 10,
};

let sizeMultiplier = sizeNameToMultiplier.small;

const mul = (value: number) => {
    return value * sizeMultiplier;
};

class Scenarios {
    async populate(options: PopulateOptions) {
        const originalState = db.getStorageClone();
        sizeMultiplier = sizeNameToMultiplier[options.size];

        logger.log(`Database is populating with size: ${options.size}`);

        const [_, error] = await catchErrorAsync(() => this._populate(options));

        if (!error) {
            logger.log(`Database successfully populated`);
            return;
        }

        await catchErrorAsync(() => db.clearStorage());

        logger.log('Database population failed', error);
        logger.log('Restoring previous state');

        await catchErrorAsync(() => db.set(originalState));
    }

    async _populate({ myId }: PopulateOptions) {
        const oldMe = db.getById('user', myId);
        invariant(oldMe);

        await db.clearStorage();

        const me = Dummies.user(oldMe);

        const friends = createArray(mul(3)).map(() => {
            const user = createUser();

            user.friends = [me.id];
            me.friends.push(user.id);

            return user;
        });

        const {
            blocked_user = [],
        } = flattenPopulated('blocked_', createArray(mul(3)).map(() => {
            const user = createUser();

            me.blocked.push(user.id);

            return {
                user,
            };
        }));

        const {
            IFR_user = [],
        } = flattenPopulated('IFR_', createArray(mul(3)).map(() => {
            const user = createUser();
            const time = Date.now() - hoursToMilliseconds(inRange(1, 100));

            user.outgoingFriendRequests = [{
                to: me.id,
                createdAt: time,
            }];

            const request: ClientEntities.User.IncomingFriendRequest = {
                from: user.id,
                createdAt: time,
            };

            me.incomingFriendRequests.push(request);

            return {
                request,
                user,
            };
        }));

        const {
            OFR_user = [],
        } = flattenPopulated('OFR_', createArray(mul(3)).map(() => {
            const user = createUser();
            const time = Date.now() - hoursToMilliseconds(inRange(1, 100));

            user.incomingFriendRequests = [{
                from: me.id,
                createdAt: time,
            }];

            const request: ClientEntities.User.OutgoingFriendRequest = {
                to: user.id,
                createdAt: time,
            };

            me.outgoingFriendRequests.push(request);

            return {
                user,
                request,
            };
        }));

        const {
            servers_members = [],
            servers_messages = [],
            servers_owner = [],
            servers_roles = [],
            servers_server = [],
            servers_textChannels = [],
            servers_textChats = [],
            servers_voiceChannels = [],
            servers_voiceChats = [],
        } = flattenPopulated('servers_', createArray(mul(3)).map(() => {
            const server = createServer(me.id);

            me.servers.push(server.server.id);

            return server;
        }));

        const {
            mutedServers_members = [],
            mutedServers_messages = [],
            mutedServers_owner = [],
            mutedServers_roles = [],
            mutedServers_server = [],
            mutedServers_textChannels = [],
            mutedServers_textChats = [],
            mutedServers_voiceChannels = [],
            mutedServers_voiceChats = [],
        } = flattenPopulated('mutedServers_', createArray(mul(2)).map(() => {
            const server = createServer(me.id);

            me.mutedServers.push(server.server.id);

            return server;
        }));

        const friendsWithConv = createArray(mul(3)).map(() => {
            const user = createUser();

            user.friends = [me.id];
            me.friends.push(user.id);

            return user;
        });

        const {
            conv_conversation = [],
            conv_messages = [],
            conv_textChat = [],
            conv_voiceChat = [],
        } = flattenPopulated('conv_', friendsWithConv.map(({ id }) => {
            const conversation = createConversation(myId, id);

            me.conversations.push(conversation.conversation.id);

            return conversation;
        }));

        const friendsWithMutedConv = createArray(mul(3)).map(() => {
            const user = createUser();

            user.friends = [me.id];
            me.friends.push(user.id);

            return user;
        });

        const {
            mutedConv_conversation = [],
            mutedConv_messages = [],
            mutedConv_textChat = [],
            mutedConv_voiceChat = [],
        } = flattenPopulated('mutedConv_', friendsWithMutedConv.map(({ id }) => {
            const conversation = createConversation(myId, id);

            me.mutedConversations.push(conversation.conversation.id);

            return conversation;
        }));

        const friendsWithHiddenConv = createArray(mul(3)).map(() => {
            const user = createUser();

            user.friends = [me.id];
            me.friends.push(user.id);

            return user;
        });

        const {
            hiddenConv_conversation = [],
            hiddenConv_messages = [],
            hiddenConv_textChat = [],
            hiddenConv_voiceChat = [],
        } = flattenPopulated('hiddenConv_', friendsWithHiddenConv.map(({ id }) => {
            const conversation = createConversation(myId, id);

            me.mutedConversations.push(conversation.conversation.id);

            return conversation;
        }));

        await db.set({
            user: combineToTable([
                me,
                ...friends,
                ...friendsWithConv,
                ...friendsWithHiddenConv,
                ...servers_members,
                ...servers_owner,
                ...mutedServers_owner,
                ...mutedServers_members,
                ...IFR_user,
                ...OFR_user,
                ...blocked_user,
            ]),
            channel: combineToTable([
                ...servers_textChannels,
                ...servers_voiceChannels,
                ...mutedServers_textChannels,
                ...mutedServers_voiceChannels,
            ]),
            conversation: combineToTable([
                ...conv_conversation,
                ...hiddenConv_conversation,
                ...mutedConv_conversation,
            ]),
            file: {},
            message: combineToTable([
                ...servers_messages,
                ...mutedServers_messages,
                ...mutedServers_messages,
                ...conv_messages,
                ...hiddenConv_messages,
                ...mutedConv_messages,
            ]),
            role: combineToTable([
                ...servers_roles,
                ...mutedServers_roles,
                ...mutedServers_roles,
            ]),
            server: combineToTable([
                ...servers_server,
                ...mutedServers_server,
                ...mutedServers_server,
            ]),
            textChat: combineToTable([
                ...servers_textChats,
                ...mutedServers_textChats,
                ...mutedServers_textChats,
                ...conv_textChat,
                ...mutedConv_textChat,
                ...hiddenConv_textChat,
            ]),
            voiceChat: combineToTable([
                ...servers_voiceChats,
                ...mutedServers_voiceChats,
                ...mutedServers_voiceChats,
                ...conv_voiceChat,
                ...mutedConv_voiceChat,
                ...hiddenConv_voiceChat,
            ]),
        });

        // socket.addDataFromStorage(db.getStorageClone());
    }
}

export const scenarios = new Scenarios();