import { Overlay } from '@/components';
import { Content } from '../Content';
import { createStyles } from '@/utils';
import { FC } from 'react';
import { useTrans } from '@/hooks';



const styles = createStyles({
    content: 'pointer-events-none bg-brand',
});

export const FileDropDialog: FC<Overlay.Dialog.Types.PublicProps> = ({
    controls,
}) => {
    const { t } = useTrans();

    return (
        <Content
            className={styles.content}
            controls={controls}
            withoutPointerEvents
            label={t('FileDropDialog.label')}
            header={t('FileDropDialog.label')}
            content={t('FileDropDialog.description')}
        />
    );
};