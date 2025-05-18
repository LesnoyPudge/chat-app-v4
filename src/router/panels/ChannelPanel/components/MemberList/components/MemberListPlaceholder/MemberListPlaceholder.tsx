import { PlaceholderList } from '@/components';
import { createStyles } from '@/utils';
import { FC } from 'react';



const styles = createStyles({
    list: 'px-4 py-5',
});

export const MemberListPlaceholder: FC = () => {
    return (
        <PlaceholderList
            className={styles.list}
            count={40}
            gap={2}
            itemSize={40}
        />
    );
};