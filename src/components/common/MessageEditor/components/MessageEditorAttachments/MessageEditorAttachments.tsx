import { createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC } from 'react';
import { Form, Scrollable } from '@/components';
import { useMessageEditorContext } from '../../hooks';
import { Iterate } from '@lesnoypudge/utils-react';
import { MessageEditorAttachmentItem } from './components';
import { Types } from '../../types';



const styles = createStyles({
    scrollable: 'h-full',
    list: 'flex flex-1 gap-6 py-5',
});

export const MessageEditorAttachments: FC<RT.PropsWithClassName> = ({
    className = '',
}) => {
    const { attachmentsName } = useMessageEditorContext();
    const attachments = Form.useFieldValue<
        Types.MessageAttachments
    >(attachmentsName);

    if (!attachments?.length) return null;

    return (
        <div className={className}>
            <Scrollable
                className={styles.scrollable}
                direction='horizontal'
            >
                <ul className={styles.list}>
                    <Iterate
                        items={attachments}
                        getKey={(v, i) => `${v.name}${i}`}
                    >
                        {(file, index) => (
                            <MessageEditorAttachmentItem
                                index={index}
                                {...file}
                            />
                        )}
                    </Iterate>
                </ul>
            </Scrollable>
        </div>
    );
};