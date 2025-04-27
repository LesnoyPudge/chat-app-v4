import { Feed, RTE } from '@/components';
import { Store } from '@/features';
import { invariant } from '@lesnoypudge/utils';
import { Dummies } from '@/fakeServer';
import { FC, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';



export const FeedTest: FC = () => {
    const isAuthorized = Store.useSliceSelector(Store.App, (v) => !!v.userId);
    invariant(isAuthorized, 'NOT AUTHORIZED');

    const [conversation] = Store.useSelector(
        Store.Conversations.Selectors.selectAll,
    );
    invariant(conversation);

    const textChat = Store.useSelector(
        Store.TextChats.Selectors.selectById(conversation.textChat),
    );
    invariant(textChat);

    const targetId = Store.useSelector(
        Store.Conversations.Selectors
            .selectSecondConversationMemberIdById(conversation.id),
    );
    invariant(targetId);

    const definedMessages = Store.useSelector(
        Store.TextChats.Selectors
            .selectDefinedMessageIdsById(conversation.textChat),
    );

    const messageActions = Store.useActions(Store.Messages);
    const textChatActions = Store.useActions(Store.TextChats);

    const isDefinedMessagesExists = !!definedMessages?.length;

    // useMountEffect(() => {
    //     const messages = Array.from({ length: 100 }, (_, index) => {
    //         const message = Dummies.message({
    //             attachments: [],
    //             author: targetId,
    //             channel: null,
    //             content: JSON.stringify(
    //                 RTE.Modules.Utils.createInitialValue(
    //                     faker.lorem.words(15),
    //                 ),
    //             ),
    //             conversation: conversation.id,
    //             id: uuid(),
    //             index,
    //             server: null,
    //             textChat: textChat.id,
    //         });

    //         return message;
    //     });

    //     messageActions.addMany(messages);
    //     textChatActions.updateOne({
    //         id: textChat.id,
    //         changes: {
    //             messageCount: textChat.messageCount + messages.length,
    //             messages: [...textChat.messages, ...messages.map((v) => v.id)],
    //         },
    //     });
    // });

    useEffect(() => {
        if (!isDefinedMessagesExists) return;
        if (1) return;
        const id = setInterval(() => {
            const message = Dummies.message({
                attachments: [],
                author: targetId,
                channel: null,
                content: JSON.stringify(
                    RTE.Modules.Utils.createInitialValue(
                        faker.lorem.words(15),
                    ),
                ),
                conversation: conversation.id,
                id: uuid(),
                index: textChat.messages.length,
                server: null,
                textChat: textChat.id,
            });

            messageActions.addOne(message);
            textChatActions.updateOne({
                id: textChat.id,
                changes: {
                    messageCount: textChat.messageCount + 1,
                    messages: [...textChat.messages, message.id],
                },
            });
        }, 1_500);

        return () => {
            clearInterval(id);
        };
    }, [
        conversation.id,
        isDefinedMessagesExists,
        messageActions,
        targetId,
        textChat.id,
        textChat.messageCount,
        textChat.messages,
        textChat.messages.length,
        textChatActions,
    ]);

    return (
        <Feed textChatId={conversation.textChat}/>
    );
};