import { FC } from 'react';
import { useMessageContext } from '../../../../../../hooks';
import { useTrans } from '@/hooks';
import { Iterate } from '@lesnoypudge/utils-react';
import { ExternalLink } from '@/components';
import { createStyles, getFilePathById } from '@/utils';



const styles = createStyles({
    list: 'flex flex-col gap-1',
});

export const MessageAttachmentFiles: FC = () => {
    const { t } = useTrans();
    const { message, tabIndex } = useMessageContext();

    const files = message.attachments.filter((v) => v.type === 'file');

    if (!files.length) return null;

    return (
        <ul
            className={styles.list}
            aria-label={t('Message.Attachments.fileList.label')}
        >
            <Iterate items={files} getKey={(v) => v.id}>
                {(file) => (
                    <li>
                        <ExternalLink
                            href={getFilePathById(file.id) ?? ''}
                            tabIndex={tabIndex}
                            download
                        >
                            {t('Message.Attachments.fileList.itemText')}
                        </ExternalLink>
                    </li>
                )}
            </Iterate>
        </ul>
    );
};