import { FC, PropsWithChildren } from 'react';
import { Scrollable } from '@/components';
import { useTrans } from '@/hooks';
import { useFeedContextProxy } from '../../context';
import { createStyles } from '@/utils';



const styles = createStyles({
    wrapper: 'h-full',
    autoscrollTrigger: 'h-px',
});

export const FeedWrapper: FC<PropsWithChildren> = ({
    children,
}) => {
    const { t } = useTrans();
    const {
        feedRef,
        autoscrollTriggerRef,
        scrollableApiRef,
        scrollableRef,
        scrollableWrapperRef,
    } = useFeedContextProxy();

    return (
        <Scrollable
            className={styles.wrapper}
            apiRef={scrollableApiRef}
            scrollableRef={scrollableRef}
            wrapperRef={scrollableWrapperRef}
        >
            <div
                role='feed'
                aria-busy
                aria-label={t('Feed.label')}
                ref={feedRef}
            >
                {children}
            </div>

            <div
                className={styles.autoscrollTrigger}
                aria-hidden
                ref={autoscrollTriggerRef}
            >
            </div>
        </Scrollable>
    );
};