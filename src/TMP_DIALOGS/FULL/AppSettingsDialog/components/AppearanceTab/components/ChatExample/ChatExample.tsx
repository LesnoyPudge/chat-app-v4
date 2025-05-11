import { Form, Message, RTE } from '@/components';
import { Iterate } from '@lesnoypudge/utils-react';
import { Dummies } from '@/fakeServer';
import { FC, useMemo } from 'react';
import { useTrans } from '@/hooks';
import { Store } from '@/features';
import { AppSettingsDialogForm } from '../../../../AppSettingsDialog';



const styles = {
    wrapper: `
        flex 
        flex-col 
        justify-center 
        h-[180px] 
        overflow-hidden 
        rounded-md 
        bg-primary-300
        pointer-events-none
    `,
};



export const ChatExample: FC = () => {
    const { t } = useTrans();

    const userId = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserId,
    );

    const messageDisplayMode = AppSettingsDialogForm.useField(
        AppSettingsDialogForm.names.messageDisplayMode,
    );

    const messageDisplayModeValue = Form.useStore(
        messageDisplayMode.field.store, (v) => v.value,
    );

    const messagesContent: RTE.Types.Nodes[] = useMemo(() => [
        [
            {
                type: 'paragraph',
                children: [{ text: t('AppSettingsDialog.AppearanceTab.ChatExample.message.1') }],
            },
        ],
        [
            {
                type: 'paragraph',
                children: [
                    {
                        text: t('AppSettingsDialog.AppearanceTab.ChatExample.message.2'),
                    },
                    {
                        type: 'emoji',
                        code: ':smile:',
                        children: [{ text: ':smile:' }],
                    },
                ],
            },
        ],
        [
            {
                type: 'paragraph',
                children: [{ text: t('AppSettingsDialog.AppearanceTab.ChatExample.message.3') }],
            },
        ],
        [
            {
                type: 'paragraph',
                children: [{ text: t('AppSettingsDialog.AppearanceTab.ChatExample.message.4') }],
            },
        ],
        [
            {
                type: 'paragraph',
                children: [{ text: t('AppSettingsDialog.AppearanceTab.ChatExample.message.5') }],
            },
        ],
    ], []);

    const messageList = useMemo(() => Array.from({
        length: messagesContent.length,
    }, (_, i) => ({
        withHead: i % 2 === 0,
        message: Dummies.message({
            id: String(i),
            author: userId,
            attachments: [],
            channel: null,
            content: JSON.stringify(messagesContent[i]),
            conversation: '',
            index: i,
            server: null,
            textChat: '',
        }),
    })), [messagesContent, userId]);

    return (
        <div className={styles.wrapper}>
            <Message.RedactorProvider>
                <Iterate items={messageList} getKey={(_, i) => i}>
                    {({ message, withHead }) => (
                        <Message.Node
                            isGroupHead={withHead}
                            message={message}
                            messageDisplayMode={messageDisplayModeValue}
                            tabIndex={-1}
                        />
                    )}
                </Iterate>
            </Message.RedactorProvider>
        </div>
    );
};