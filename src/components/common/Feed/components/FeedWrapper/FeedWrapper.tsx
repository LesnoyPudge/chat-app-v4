import { FC, PropsWithChildren } from 'react';
import { Scrollable } from '@/components';
import { useTrans } from '@/hooks';
import { useFeedContextProxy } from '../../context';
import { createStyles } from '@/utils';



const styles = createStyles({
    wrapper: 'h-full',
});

export const FeedWrapper: FC<PropsWithChildren> = ({
    children,
}) => {
    const { t } = useTrans();
    const {
        feedRef,
        scrollableRef,
    } = useFeedContextProxy();

    return children;

    return (
        <Scrollable
            className={styles.wrapper}
            scrollableRef={scrollableRef}
        >
            <div
                role='feed'
                aria-busy
                aria-label={t('Feed.label')}
                ref={feedRef}
                style={{
                    // visibility: 'hidden', // TODO replace with other optimization methods
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    minHeight: '100%',
                }}
            >
                {children}
            </div>
        </Scrollable>
    );
};