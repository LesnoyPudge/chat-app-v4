import { DialogBlocks } from '@/components';
import { Content } from '../Content';
import { createStyles } from '@/utils';
import { FC } from 'react';
import { useTrans } from '@/hooks';



const styles = createStyles({
    content: 'pointer-events-none bg-brand',
});

export const FileDropDialog: FC<DialogBlocks.Types.PublicProps> = ({
    controls,
}) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.Base.Provider
            label={t('FileDropDialog.label')}
            controls={controls}
        >
            <DialogBlocks.Base.Wrapper>
                <Content
                    className={styles.content}
                    header={t('FileDropDialog.label')}
                    content={t('FileDropDialog.description')}
                />
            </DialogBlocks.Base.Wrapper>
        </DialogBlocks.Base.Provider>
    );
};