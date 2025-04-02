import { ContextSelectable } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { ContentContext } from '../../context';
import { createStyles } from '@/utils';
import { useTrans } from '@/hooks';


const styles = createStyles({
    count: `
        mt-5 
        truncate
        text-xs 
        font-semibold
        uppercase
        text-color-secondary
    `,
});

export const DisplayCount: FC = () => {
    const { t } = useTrans();
    const displayCount = ContextSelectable.useSelector(
        ContentContext,
        (v) => v.displayCount,
    );

    return (
        <div className={styles.count}>
            {t('FriendsPanel.DisplayCount.text', {
                value: displayCount,
            })}
        </div>
    );
};