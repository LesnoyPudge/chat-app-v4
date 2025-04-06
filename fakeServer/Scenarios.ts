import { db } from './FakeDB';
import { Dummies } from './Dummies';
import { faker } from '@faker-js/faker';
import { catchErrorAsync, chance, coinFlip, inRange, invariant, toOneLine } from '@lesnoypudge/utils';
import { v4 as uuid } from 'uuid';
import { ClientEntities } from '@/types';
import type { RTE } from '@/components';
import { hoursToMilliseconds, minutesToMilliseconds } from 'date-fns';
import { logger } from '@/utils';
import { flattenPopulated } from './utils';
import { defer } from '@lesnoypudge/utils-web';



let deferredCounter = 0;

const deferred = <
    _Args extends any[],
    _Return,
>(fn: (...args: _Args) => _Return) => {
    return (...args: _Args) => {
        deferredCounter++;
        return defer(() => fn(...args));
    };
};

const createArray = (len: number) => Array.from({ length: len });

const extractIds = (items: { id: string }[]) => items.map((item) => item.id);

const combineToTable = <_Item extends { id: string }>(items: _Item[]) => {
    return items.reduce<Record<string, _Item>>((acc, cur) => {
        acc[cur.id] = cur;

        return acc;
    }, {});
};

const createUser = deferred(() => {
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
});

const randomParagraphs: string[] = [];

const initParagraphs = async () => {
    for (let i = 0; i < 30; i++) {
        randomParagraphs.push(await defer(() => {
            return faker.lorem.paragraph(inRange(1, 3));
        }));
    }
};

const createMessage = deferred(async (props: Pick<
    ClientEntities.Message.Base,
    'author' | 'conversation' | 'channel' | 'server' | 'index' | 'textChat'
>) => {
    if (randomParagraphs.length === 0) {
        await initParagraphs();
    }

    const text = randomParagraphs[inRange(0, randomParagraphs.length - 1)];
    invariant(text);

    const content = JSON.stringify(
        [{
            type: 'paragraph',
            children: [{ text }],
        }] satisfies RTE.Types.Nodes,
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
        logger.scenarios.warn('created too much messages, need to change timestamp generation');
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
});

const createServer = deferred(async (
    myId: string,
    providedOwner?: ClientEntities.User.Base,
) => {
    const serverId = uuid();
    const owner = providedOwner ?? await createUser();

    owner.servers.push(serverId);

    const members: ClientEntities.User.Base[] = [owner];

    for (let i = 0; i < inRange(1, mul(5)); i++) {
        const user = await createUser();
        user.servers = [serverId];
        members.push(user);
    }

    const roles = createArray(inRange(1, mul(5))).map(() => {
        return Dummies.role({
            avatar: null,
            color: faker.color.rgb(),
            id: uuid(),
            isDefault: false,
            name: faker.hacker.noun(),
            server: serverId,
            users: extractIds(members.slice(0, inRange(1, members.length))),
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

    const textChats: {
        chat: ClientEntities.TextChat.Base;
        messages: ClientEntities.Message.Base[];
    }[] = [];

    for (const [index, channelId] of textChannelIds.entries()) {
        const id = textChatIds[index];
        invariant(id);
        invariant(channelId);

        const messages: ClientEntities.Message.Base[] = [];

        for (let index = 0; index < inRange(0, mul(15)); index++) {
            const member = members[inRange(0, members.length - 1)];
            invariant(member);

            const message = await createMessage({
                author: member.id,
                channel: channelId,
                server: serverId,
                conversation: null,
                index,
                textChat: id,
            });

            messages.push(message);
        }

        const chat = Dummies.textChatChannel({
            id,
            channel: channelId,
            server: serverId,
            messages: extractIds(messages),
        });

        textChats.push({
            chat,
            messages,
        });
    }

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
        members: [...new Set([
            ...extractIds(members),
            myId,
        ])],
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
});

const createConversation = deferred(async (myId: string, userId: string) => {
    const id = uuid();
    const textChatId = uuid();

    const messages: ClientEntities.Message.Base[] = [];

    for (let index = 0; index <= inRange(0, mul(15)); index++) {
        const author = chance(0.5) ? myId : userId;

        const message = await createMessage({
            author,
            channel: null,
            server: null,
            conversation: id,
            index,
            textChat: textChatId,
        });

        messages.push(message);
    }

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
});

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

        logger.scenarios.log(`Database is populating with size: ${options.size}`);

        if (options.size === 'large') {
            logger.scenarios.log('Long loading is expected');
        }

        const startTime = performance.now();
        deferredCounter = 0;

        const [_, error] = await catchErrorAsync(() => {
            return defer(() => this._populate(options));
        });

        const finalDeferredCount = deferredCounter;
        deferredCounter = 0;
        const timeDiff = performance.now() - startTime;
        const timeMs = timeDiff.toFixed(0);
        const timeSec = (timeDiff / 1_000).toFixed(2);

        logger.scenarios.log(toOneLine(`
            Population duration: ${timeMs}ms = ${timeSec}sec`,
        ));

        logger.scenarios.log(toOneLine(`
            Times deferred function called 
            during population: ${finalDeferredCount}    
        `));

        if (!error) {
            logger.scenarios.log(`Database successfully populated`);
            return;
        }

        await catchErrorAsync(() => db.clearStorage());

        logger.scenarios.log('Database population failed', error);
        logger.scenarios.log('Restoring previous state');

        await catchErrorAsync(() => db.set(originalState));
    }

    private async _populate({ myId }: PopulateOptions) {
        const oldMe = db.getById('user', myId);
        invariant(oldMe);

        await db.clearStorage();

        const me = Dummies.user(oldMe);

        const friends = await defer(() => Promise.all(
            createArray(mul(3)).map(async () => {
                const user = await createUser();

                user.friends = [me.id];
                me.friends.push(user.id);

                return user;
            }),
        ));

        const {
            blocked_user = [],
        } = await defer(() => flattenPopulated(
            'blocked_',
            Promise.all(createArray(mul(3)).map(async () => {
                const user = await createUser();

                me.blocked.push(user.id);

                return {
                    user,
                };
            })),
        ));

        const {
            IFR_user = [],
        } = await defer(() => flattenPopulated(
            'IFR_',
            Promise.all(createArray(mul(3)).map(async () => {
                const user = await createUser();
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
            })),
        ));

        const {
            OFR_user = [],
        } = await defer(() => flattenPopulated(
            'OFR_',
            Promise.all(createArray(mul(3)).map(async () => {
                const user = await createUser();
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
            })),
        ));

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
        } = await defer(() => flattenPopulated(
            'servers_',
            Promise.all(createArray(mul(3)).map(async () => {
                const server = await createServer(me.id);

                me.servers.push(server.server.id);

                return server;
            })),
        ));

        const {
            my_servers_members = [],
            my_servers_messages = [],
            my_servers_owner = [],
            my_servers_roles = [],
            my_servers_server = [],
            my_servers_textChannels = [],
            my_servers_textChats = [],
            my_servers_voiceChannels = [],
            my_servers_voiceChats = [],
        } = await defer(() => flattenPopulated(
            'my_servers_',
            Promise.all(createArray(mul(1)).map(() => {
                return createServer(me.id, me);
            })),
        ));

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
        } = await defer(() => flattenPopulated(
            'mutedServers_',
            Promise.all(createArray(mul(2)).map(async () => {
                const server = await createServer(me.id);

                me.mutedServers.push(server.server.id);

                return server;
            })),
        ));

        const friendsWithConv = await defer(() => {
            return Promise.all(createArray(mul(3)).map(async () => {
                const user = await createUser();

                user.friends = [me.id];
                me.friends.push(user.id);

                return user;
            }));
        });

        const {
            conv_conversation = [],
            conv_messages = [],
            conv_textChat = [],
            conv_voiceChat = [],
        } = await defer(() => flattenPopulated(
            'conv_',
            Promise.all(friendsWithConv.map(async ({ id }) => {
                const conversation = await createConversation(myId, id);

                me.conversations.push(conversation.conversation.id);

                return conversation;
            })),
        ));

        const friendsWithMutedConv = await defer(() => {
            return Promise.all(createArray(mul(3)).map(async () => {
                const user = await createUser();

                user.friends = [me.id];
                me.friends.push(user.id);

                return user;
            }));
        });

        const {
            mutedConv_conversation = [],
            mutedConv_messages = [],
            mutedConv_textChat = [],
            mutedConv_voiceChat = [],
        } = await defer(() => flattenPopulated(
            'mutedConv_',
            Promise.all(friendsWithMutedConv.map(async ({ id }) => {
                const conversation = await createConversation(myId, id);

                me.mutedConversations.push(conversation.conversation.id);

                return conversation;
            })),
        ));

        const friendsWithHiddenConv = await defer(() => {
            return Promise.all(createArray(mul(3)).map(async () => {
                const user = await createUser();

                user.friends = [me.id];
                me.friends.push(user.id);

                return user;
            }));
        });

        const {
            hiddenConv_conversation = [],
            hiddenConv_messages = [],
            hiddenConv_textChat = [],
            hiddenConv_voiceChat = [],
        } = await defer(() => flattenPopulated(
            'hiddenConv_',
            Promise.all(friendsWithHiddenConv.map(async ({ id }) => {
                const conversation = await createConversation(myId, id);

                me.mutedConversations.push(conversation.conversation.id);

                return conversation;
            })),
        ));

        await db.set({
            user: combineToTable([
                me,
                ...friends,
                ...friendsWithConv,
                ...friendsWithHiddenConv,
                ...servers_members,
                ...my_servers_members,
                ...my_servers_owner,
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
                ...my_servers_textChannels,
                ...my_servers_voiceChannels,
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
                ...my_servers_messages,
                ...mutedServers_messages,
                ...mutedServers_messages,
                ...conv_messages,
                ...hiddenConv_messages,
                ...mutedConv_messages,
            ]),
            role: combineToTable([
                ...servers_roles,
                ...my_servers_roles,
                ...mutedServers_roles,
                ...mutedServers_roles,
            ]),
            server: combineToTable([
                ...servers_server,
                ...my_servers_server,
                ...mutedServers_server,
                ...mutedServers_server,
            ]),
            textChat: combineToTable([
                ...servers_textChats,
                ...my_servers_textChats,
                ...mutedServers_textChats,
                ...mutedServers_textChats,
                ...conv_textChat,
                ...mutedConv_textChat,
                ...hiddenConv_textChat,
            ]),
            voiceChat: combineToTable([
                ...servers_voiceChats,
                ...my_servers_voiceChats,
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