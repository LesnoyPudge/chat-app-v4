import { FC, PropsWithChildren } from 'react';
import { Scrollable } from '@/components';
import { useTrans } from '@/hooks';
import { useFeedContextProxy } from '../../context';
import { createStyles } from '@/utils';



const styles = createStyles({
    wrapper: 'h-full',
    feed: 'flex min-h-full flex-col justify-end',
});

export const FeedWrapper: FC<PropsWithChildren> = ({
    children,
}) => {
    const { t } = useTrans();
    const {
        feedRef,
        scrollableRef,
        scrollableApiRef,
    } = useFeedContextProxy();

    return (
        <Scrollable
            className={styles.wrapper}
            scrollableRef={scrollableRef}
            apiRef={scrollableApiRef}
        >
            <div
                className={styles.feed}
                role='feed'
                aria-busy
                aria-label={t('Feed.label')}
                ref={feedRef}
            >
                {children}
            </div>
        </Scrollable>
    );
};