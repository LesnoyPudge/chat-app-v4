import { FC, memo } from 'react';
import { useFeedContextProxy } from '../../context';
import { createStyles } from '@/utils';
import { useTrans } from '@/hooks';
import { decorate } from '@lesnoypudge/macro';
import { withDisplayName } from '@lesnoypudge/utils-react';



const styles = createStyles({
    wrapper: 'px-4 py-6 text-3xl font-bold text-color-primary',
});

decorate(withDisplayName, 'FeedIntroduction', decorate.target);
decorate(memo, decorate.target);

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