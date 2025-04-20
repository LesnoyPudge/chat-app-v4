import { FC } from 'react';
import { useFeedContextProxy } from '../../context';
import { createStyles } from '@/utils';
import { useTrans } from '@/hooks';



const styles = createStyles({
    wrapper: 'px-4 py-6 text-3xl font-bold text-color-primary',
});

export const FeedIntroduction: FC = () => {
    const { t } = useTrans();
    const {
        shouldShowIntroduction,
        shouldShowEmptyIntroduction,
    } = useFeedContextProxy();

    if (!shouldShowIntroduction) return null;

    const textToShow = (
        shouldShowEmptyIntroduction
            ? t('Feed.Introduction.emptyText')
            : t('Feed.Introduction.startText')
    );

    return (
        <div
            className={styles.wrapper}
            aria-hidden
        >
            {textToShow}
        </div>
    );
};