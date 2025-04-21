import { VirtualList } from '@/components';
import { useTrans } from '@/hooks';
import { createStyles } from '@/utils';
import { ContextSelectable, useRefManager } from '@lesnoypudge/utils-react';
import { FC, useEffect } from 'react';
import { ContentContext } from '../../../context';



const styles = createStyles({
    list: 'flex flex-col gap-0.5 py-2',
});

export namespace List {
    export type Props = {
        userIds: string[];
        children: VirtualList.Node.Props['children'];
    };
}

export const List: FC<List.Props> = ({
    userIds,
    children,
}) => {
    const wrapperRef = useRefManager<HTMLUListElement>(null);
    const { t } = useTrans();
    const setDisplayCount = ContextSelectable.useSelector(
        ContentContext,
        (v) => v.setDisplayCount,
    );

    useEffect(() => {
        setDisplayCount(userIds.length);
    }, [setDisplayCount, userIds.length]);

    return (
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
    );
};