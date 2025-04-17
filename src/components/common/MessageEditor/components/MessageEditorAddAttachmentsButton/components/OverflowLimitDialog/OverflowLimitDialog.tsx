import { Overlay } from '@/components';
import { Content } from '../Content';
import { FC } from 'react';
import { useTrans } from '@/hooks';
import { createStyles } from '@/utils';



const styles = createStyles({
    content: 'bg-danger',
});

export const OverflowLimitDialog: FC<Overlay.Dialog.Types.PublicProps> = ({
    controls,
}) => {
    const { t } = useTrans();

    return (
        <Content
            className={styles.content}
            controls={controls}
            label={t('OverflowLimitDialog.label')}
            header={t('OverflowLimitDialog.label')}
            content={t('OverflowLimitDialog.description')}
        />
    );
};