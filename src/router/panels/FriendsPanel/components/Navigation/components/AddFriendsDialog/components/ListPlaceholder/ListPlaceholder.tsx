import { Placeholder } from '@/components';
import { createStyles } from '@/utils';
import { decorate } from '@lesnoypudge/macro';
import { Iterate, withDisplayName } from '@lesnoypudge/utils-react';
import { FC, memo } from 'react';



const styles = createStyles({
    list: 'grid h-full w-full gap-2 overflow-hidden',
    item: 'h-8 w-full',
});

decorate(withDisplayName, 'ListPlaceholder', decorate.target);
decorate(memo, decorate.target);

export const ListPlaceholder: FC = () => {
    return (
        <div className={styles.list}>
            <Iterate count={20} getKey={(v) => v}>
                {() => (
                    <Placeholder.Node className={styles.item}/>
                )}
            </Iterate>
        </div>
    );
};