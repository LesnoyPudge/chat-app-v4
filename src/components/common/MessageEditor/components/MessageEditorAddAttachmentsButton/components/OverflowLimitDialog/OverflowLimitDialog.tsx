import { DialogBlocks } from '@/components';
import { Content } from '../Content';
import { FC } from 'react';
import { useTrans } from '@/hooks';
import { createStyles } from '@/utils';



const styles = createStyles({
    content: 'bg-danger',
});

export const OverflowLimitDialog: FC<DialogBlocks.Types.PublicProps> = ({
    controls,
}) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.Base.Provider
            label={t('OverflowLimitDialog.label')}
            controls={controls}
        >
            <DialogBlocks.Base.Wrapper>
                <Content
                    className={styles.content}
                    header={t('OverflowLimitDialog.label')}
                    content={t('OverflowLimitDialog.description')}
                />
            </DialogBlocks.Base.Wrapper>
        </DialogBlocks.Base.Provider>
    );
};