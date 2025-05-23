import { Scrollable, VirtualList } from '@/components';
import { useTrans } from '@/hooks';
import { createStyles } from '@/utils';
import { useRefManager } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { EmptyListBlock } from '../EmptyListBlock';



const styles = createStyles({
    list: 'flex flex-col gap-0.5 py-2',
    scrollable: 'h-full',
});

export namespace List {
    export type Props = {
        userIds: string[];
        children: VirtualList.Types.Node.Props['children'];
    };
}

export const List: FC<List.Props> = ({
    userIds,
    children,
}) => {
    const wrapperRef = useRefManager<HTMLUListElement>(null);
    const { t } = useTrans();

    return (
        <Scrollable className={styles.scrollable}>
            <ul
                className={styles.list}
                aria-label={t('FriendsPanel.List.label')}
                ref={wrapperRef}
            >
                <VirtualList.Node
                    items={userIds}
                    getId={(v) => v}
                    itemSize={60}
                    itemMargin={2}
                    wrapperRef={wrapperRef}
                >
                    {children}
                </VirtualList.Node>
            </ul>

            <EmptyListBlock/>
        </Scrollable>
    );
};