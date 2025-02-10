import { socket } from '@fakeSocket';
import { db } from './FakeDB';
import { Dummies } from './Dummies';
import { faker } from '@faker-js/faker';
import { chance, coinFlip, inRange, invariant } from '@lesnoypudge/utils';
import { v4 as uuid } from 'uuid';
import { ClientEntities } from '@types';
import { RichTextEditor } from '@components';
import { hoursToMilliseconds, minutesToMilliseconds } from 'date-fns';
import { logger } from '@utils';



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

    return user;
};

const createMessage = (props: Pick<
    ClientEntities.Message.Base,
    'author' | 'conversation' | 'channel' | 'server' | 'index' | 'textChat'
>) => {
    const content = JSON.stringify(
        RichTextEditor.Modules.Utils.createInitialValue(
            faker.lorem.paragraph(),
        ),
    );

    const timeDiff = minutesToMilliseconds(3 * props.index);
    const timestamp = Date.now() - hoursToMilliseconds(24 * 10) + timeDiff;

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

    const members = createArray(inRange(3, 10)).map(() => {
        const user = createUser();

        user.servers = [serverId];

        return user;
    });

    const roles = createArray(inRange(2, 5)).map(() => {
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

    const textChatIds = createArray(inRange(1, 5)).map(() => uuid());
    const voiceChatIds = createArray(inRange(1, 5)).map(() => uuid());

    const textChannelIds = createArray(textChatIds.length).map(() => uuid());
    const voiceChannelIds = createArray(voiceChatIds.length).map(() => uuid());

    const textChats = textChannelIds.map((channelId, index) => {
        const id = textChatIds[index];
        invariant(id);

        const messages = createArray(inRange(0, 15)).map((_, index) => {
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
        });

        chat.messages = extractIds(messages);

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

    const textChat = Dummies.textChatConversation({
        id: uuid(),
        conversation: id,
    });

    const messages = createArray(inRange(0, 15)).map((_, index) => {
        const author = chance(0.5) ? myId : userId;

        return createMessage({
            author,
            channel: null,
            server: null,
            conversation: id,
            index,
            textChat: textChat.id,
        });
    });

    textChat.messages = extractIds(messages);

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

class Scenarios {
    populate(myId: string) {
        try {
            this._populate(myId);
            logger.log('Database populated');
        } catch {
            logger.log('Database population failed');
            db.clearStorage();
        }
    }

    _populate(myId: string) {
        const me = db.getById('user', myId);
        invariant(me);

        db.clearStorage();

        const friends = createArray(10).map(() => {
            const user = createUser();

            user.friends = [me.id];

            return user;
        });

        me.friends = extractIds(friends);

        const popServers = createArray(10).map(() => {
            const server = createServer(me.id);

            me.servers.push(server.server.id);

            return server;
        });

        const members = popServers.flatMap((item) => item.members);
        const servers = popServers.flatMap((item) => item.server);
        const owners = popServers.flatMap((item) => item.owner);
        const roles = popServers.flatMap((item) => item.roles);
        const textChats = popServers.flatMap((item) => item.textChats);
        const voiceChats = popServers.flatMap((item) => item.voiceChats);
        const textChannels = popServers.flatMap((item) => item.textChannels);
        const voiceChannels = popServers.flatMap((item) => item.voiceChannels);
        const messages = popServers.flatMap((item) => item.messages);

        const popConv = friends.map(({ id }) => {
            return createConversation(myId, id);
        });

        const conversations = popConv.flatMap((item) => item.conversation);
        const textChats2 = popConv.flatMap((item) => item.textChat);
        const voiceChats2 = popConv.flatMap((item) => item.voiceChat);
        const messages2 = popConv.flatMap((item) => item.messages);

        db.set({
            user: combineToTable([
                me,
                ...friends,
                ...members,
                ...owners,
            ]),
            channel: combineToTable([
                ...textChannels,
                ...voiceChannels,
            ]),
            conversation: combineToTable([
                ...conversations,
            ]),
            file: {},
            message: combineToTable([
                ...messages,
                ...messages2,
            ]),
            role: combineToTable([
                ...roles,
            ]),
            server: combineToTable([
                ...servers,
            ]),
            textChat: combineToTable([
                ...textChats,
                ...textChats2,
            ]),
            voiceChat: combineToTable([
                ...voiceChats,
                ...voiceChats2,
            ]),
        });

        // socket.addDataFromStorage(db.getStorageClone());
    }
}

export const scenarios = new Scenarios();