import { DialogBlocks } from '@/components';
import { Content } from '../Content';
import { FC } from 'react';
import { useTrans } from '@/hooks';
import { createStyles } from '@/utils';
import { FILE_MAX_SIZE } from '@/fakeShared';



const styles = createStyles({
    content: 'bg-danger',
});

export const SizeLimitDialog: FC<DialogBlocks.Types.PublicProps> = ({
    controls,
}) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.Base.Provider
            label={t('SizeLimitDialog.label')}
            controls={controls}
        >
            <DialogBlocks.Base.Wrapper>
                <Content
                    className={styles.content}
                    header={t('SizeLimitDialog.label')}
                    content={t('SizeLimitDialog.description', {
                        maxSize: FILE_MAX_SIZE,
                    })}
                />
            </DialogBlocks.Base.Wrapper>
        </DialogBlocks.Base.Provider>
    );
};