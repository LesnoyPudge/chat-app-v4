import { createStyles } from '@/utils';
import { decorate } from '@lesnoypudge/macro';
import { withDisplayName } from '@lesnoypudge/utils-react';
import { lightFormat } from 'date-fns';
import { FC, memo, useMemo } from 'react';



const styles = createStyles({
    wrapper: 'flex pb-3 pt-4',
    dividerLine: `
        relative 
        mx-4 
        grow before:absolute 
        before:top-1/2 
        before:-z-10 
        before:h-0.5 
        before:w-full 
        before:-translate-y-1/2 
        before:bg-primary-100
    `,
    text: 'truncate text-xs font-semibold text-color-muted',
});

export namespace FeedDayDivider {
    export type Props = {
        timestamp: number;
    };
}

decorate(withDisplayName, 'FeedDayDivider', decorate.target);
decorate(memo, decorate.target);

export const FeedDayDivider: FC<FeedDayDivider.Props> = ({
    timestamp,
}) => {
    const formattedDate = useMemo(() => {
        return lightFormat(timestamp, 'd MMMM yyyy');
    }, [timestamp]);

    return (
        <div
            className={styles.wrapper}
            role='separator'
            aria-label={formattedDate}
            aria-hidden={false}
        >
            <div className={styles.dividerLine}></div>

            <span className={styles.text}>
                {formattedDate}
            </span>

            <div className={styles.dividerLine}></div>
        </div>
    );
};