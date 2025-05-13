import { Form, Message, RTE } from '@/components';
import { Iterate } from '@lesnoypudge/utils-react';
import { Dummies } from '@/fakeServer';
import { FC, useMemo } from 'react';
import { useTrans } from '@/hooks';
import { Store } from '@/features';
import { AppSettingsDialogForm } from '../../../../AppSettingsDialog';
import { cn, createStyles } from '@/utils';



const styles = createStyles({
    withMargin: 'mt-[--message-group-spacing]',
    message: 'pointer-events-none ',
    wrapper: `
        isolate
        flex
        h-[180px] 
        flex-col 
        justify-start 
        overflow-hidden 
        rounded-md 
        bg-primary-300
        [overflow-anchor:none]
    `,
});

export const ChatExample: FC = () => {
    const { t } = useTrans();

    const userId = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserId,
    );

    const messageDisplayMode = Form.useFieldValue(
        AppSettingsDialogForm.useFieldApi(
            AppSettingsDialogForm.names.messageDisplayMode,
        ),
    );

    const messageFontSize = Form.useFieldValue(
        AppSettingsDialogForm.useFieldApi(
            AppSettingsDialogForm.names.messageFontSize,
        ),
    );

    const messageGroupSpacing = Form.useFieldValue(
        AppSettingsDialogForm.useFieldApi(
            AppSettingsDialogForm.names.messageGroupSpacing,
        ),
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
    ], [t]);

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
        <div
            className={styles.wrapper}
            data-message-font-size={messageFontSize}
            data-message-group-spacing={messageGroupSpacing}
        >
            <Message.RedactorProvider>
                <Iterate items={messageList} getKey={(_, i) => i}>
                    {({ message, withHead }, index) => {
                        const withMargin = withHead && (index !== 0);

                        return (
                            <Message.Node
                                className={cn(
                                    styles.message,
                                    withMargin && styles.withMargin,
                                )}
                                isGroupHead={withHead}
                                message={message}
                                messageDisplayMode={messageDisplayMode}
                                tabIndex={-1}
                            />
                        );
                    }}
                </Iterate>
            </Message.RedactorProvider>
        </div>
    );
};