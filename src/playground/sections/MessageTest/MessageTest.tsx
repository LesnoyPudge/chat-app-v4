import { Message, RTE, Scrollable } from '@/components';
import { Store } from '@/features';
import { createStyles } from '@/utils';
import { faker } from '@faker-js/faker';
import { invariant } from '@lesnoypudge/utils';
import { Dummies } from 'fakeServer/Dummies';
import { FC } from 'react';



const messageFake = Dummies.message({
    id: 'qwe',
    attachments: [],
    author: 'zxc',
    channel: null,
    content: JSON.stringify([
        ...RTE.Modules.Utils.createInitialValue(faker.lorem.words(15)),
        ...RTE.Modules.Utils.createInitialValue('some value2'),
    ]),
    conversation: 'zxczxc',
    index: 0,
    server: null,
    textChat: 'zxcqwezxc',
});

const styles = createStyles({
    list: 'flex flex-col gap-4 p-8',
});

export const MessageTest: FC = () => {
    const [textChat] = Store.useSelector(
        Store.TextChats.Selectors.selectAll,
    );

    invariant(textChat, 'textChat missing');

    Store.Messages.Api.useMessageGetManyByTextChatIdQuery({
        from: null,
        limit: 50,
        textChatId: textChat.id,
    });

    const userId = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserId,
    );

    const [_message] = Store.useSelector(
        Store.Messages.Selectors.selectAll,
    );

    if (!_message) return <div>no message</div>;

    const message = {
        ..._message,
        author: userId,
    };

    return (
        <Scrollable>
            {/* <div className={styles.list}>
                <div>fake message</div>

                <Message.RedactorProvider>
                    <div>cozy head</div>

                    <Message.Node
                        message={messageFake}
                        tabIndex={0}
                        isGroupHead={true}
                        messageDisplayMode='cozy'
                    />

                    <div>cozy not head</div>

                    <Message.Node
                        message={messageFake}
                        tabIndex={0}
                        isGroupHead={false}
                        messageDisplayMode='cozy'
                    />

                    <div>compact head</div>

                    <Message.Node
                        message={messageFake}
                        tabIndex={0}
                        isGroupHead={true}
                        messageDisplayMode='compact'
                    />

                    <div>compact not head</div>

                    <Message.Node
                        message={messageFake}
                        tabIndex={0}
                        isGroupHead={false}
                        messageDisplayMode='compact'
                    />
                </Message.RedactorProvider>
            </div> */}

            <div className={styles.list}>
                <div>real message</div>

                <Message.RedactorProvider>
                    <Message.Node
                        message={message}
                        tabIndex={0}
                        isGroupHead={true}
                        messageDisplayMode='cozy'
                    />
                    {/*
                    <Message.Node
                        message={message}
                        tabIndex={0}
                        isGroupHead={false}
                        messageDisplayMode='cozy'
                    />

                    <Message.Node
                        message={message}
                        tabIndex={0}
                        isGroupHead={true}
                        messageDisplayMode='compact'
                    />

                    <Message.Node
                        message={message}
                        tabIndex={0}
                        isGroupHead={false}
                        messageDisplayMode='compact'
                    /> */}
                </Message.RedactorProvider>
            </div>
        </Scrollable>
    );
};