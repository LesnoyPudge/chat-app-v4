import { Scrollable, VirtualList } from '@/components';
import { createStyles } from '@/utils';
import { useRefManager, withDisplayName } from '@lesnoypudge/utils-react';
import { FC, memo } from 'react';
import { Item } from './components';
import { decorate } from '@lesnoypudge/macro';



const styles = createStyles({
    list: 'flex flex-col gap-2',
    scrollable: 'h-full',
});

type Props = {
    userIds: string[];
};

decorate(withDisplayName, 'UserList', decorate.target);
decorate(memo, decorate.target);

export const UserList: FC<Props> = ({
    userIds,
}) => {
    const wrapperRef = useRefManager<HTMLUListElement>(null);

    return (
        <Scrollable
            className={styles.scrollable}
            size='small'
            withoutGutter
        >
            <ul className={styles.list} ref={wrapperRef}>
                <VirtualList.Node
                    items={userIds}
                    getId={(v) => v}
                    wrapperRef={wrapperRef}
                >
                    {(id) => <Item id={id}/>}
                </VirtualList.Node>
            </ul>
        </Scrollable>
    );
};