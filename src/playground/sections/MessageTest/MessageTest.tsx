import { Message, RTE, Scrollable } from '@/components';
import { Dummies } from 'fakeServer/Dummies';
import { FC } from 'react';



const message = Dummies.message({
    id: 'qwe',
    attachments: [],
    author: 'zxc',
    channel: null,
    content: JSON.stringify(RTE.Modules.Utils.createInitialValue('some value')),
    conversation: 'zxczxc',
    index: 0,
    server: null,
    textChat: 'zxcqwezxc',
});

export const MessageTest: FC = () => {
    return (
        <Scrollable>
            <div className='flex flex-col gap-4 p-8'>
                <Message.RedactorProvider>
                    <Message.Node
                        message={message}
                        tabIndex={0}
                        isGroupHead={true}
                        messageDisplayMode='cozy'
                    />

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
                    />
                </Message.RedactorProvider>
            </div>
        </Scrollable>
    );
};