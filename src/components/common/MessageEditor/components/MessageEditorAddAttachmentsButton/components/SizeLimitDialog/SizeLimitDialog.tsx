import { DialogBlocks } from '@/components';
import { Content } from '../Content';
import { FC } from 'react';
import { useTrans } from '@/hooks';
import { BytesToMB, createStyles } from '@/utils';
import { FILE_MAX_SIZE_BYTES } from '@/fakeShared';



const styles = createStyles({
    content: 'bg-danger',
});

export const SizeLimitDialog: FC<DialogBlocks.Types.PublicProps> = ({
    controls,
}) => {
    const { t } = useTrans();

    return (
        <Content
            className={styles.content}
            controls={controls}
            label={t('SizeLimitDialog.label')}
            header={t('SizeLimitDialog.label')}
            content={t('SizeLimitDialog.description', {
                maxSize: BytesToMB(FILE_MAX_SIZE_BYTES),
            })}
        />
    );
};