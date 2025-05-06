import { coinFlip, inRange, invariant } from '@lesnoypudge/utils';
import { db } from './FakeDB';
import { Dummies } from './Dummies';
import { combineToTable, extractIds } from './scenariosUtils';
import { v4 as uuid } from 'uuid';
import { RTE } from '@/components';
import { faker } from '@faker-js/faker';
import { minutesToMilliseconds, secondsToMilliseconds } from 'date-fns';



export const setupMinimalScene = async (myId: string) => {
    const oldMe = db.getById('user', myId);
    invariant(oldMe);

    await db.clearStorage();

    const me = Dummies.user(oldMe);

    const textChatId = uuid();

    const conversationSecondUser = Dummies.user({
        id: uuid(),
        accessToken: '',
        login: 'conversationSecondUserLogin',
        name: 'conversationSecondUser',
        password: 'conversationSecondUserPassword',
        refreshToken: '',
        status: 'online',
    });

    const conversation = Dummies.conversation({
        id: uuid(),
        members: [me.id, conversationSecondUser.id],
        textChat: textChatId,
    });

    me.conversations.push(conversation.id);
    conversationSecondUser.conversations.push(conversation.id);

    const messageListSize = 200;
    let prevMessageCreatedAt = Date.now();

    const textChatMessages = Array.from({
        length: messageListSize,
    }, (_, i) => {
        const message = Dummies.message({
            id: uuid(),
            attachments: [],
            author: coinFlip() ? myId : conversationSecondUser.id,
            channel: null,
            content: JSON.stringify(
                RTE.Modules.Utils.createInitialValue(
                    faker.lorem.words(inRange(5, 25)),
                ),
            ),
            conversation: conversation.id,
            index: i,
            server: null,
            textChat: textChatId,
        });

        const createdAt = (
            prevMessageCreatedAt
            - minutesToMilliseconds(inRange(0, 30))
            + secondsToMilliseconds(inRange(1, 59))
        );

        message.createdAt = createdAt;

        return message;
    });

    const textChat = Dummies.textChatConversation({
        conversation: conversation.id,
        id: textChatId,
        messages: extractIds(textChatMessages),
    });

    await db.set({
        user: combineToTable([
            me,
            conversationSecondUser,
        ]),
        conversation: combineToTable([
            conversation,
        ]),
        message: combineToTable([
            ...textChatMessages,
        ]),
        textChat: combineToTable([
            textChat,
        ]),
    });
};