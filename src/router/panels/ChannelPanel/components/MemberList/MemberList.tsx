import { Scrollable, VirtualList } from '@/components';
import { FC } from 'react';
import { Navigator, Store } from '@/features';
import { useRefManager } from '@lesnoypudge/utils-react';
import { MemberItem, MemberListPlaceholder } from './components';
import { createStyles } from '@/utils';
import { useTrans } from '@/hooks';



const styles = createStyles({
    scrollable: 'h-full',
    list: 'flex flex-col px-2 py-5',
});

export const MemberList: FC = () => {
    const { t } = useTrans();
    const { serverId } = Navigator.useParams('channel');
    const wrapperRefManager = useRefManager<HTMLDivElement>(null);

    const onlineMemberIds = Store.useSelector(
        Store.Servers.Selectors.selectOnlineMemberIdsById(serverId),
    );

    const offlineMemberIds = Store.useSelector(
        Store.Servers.Selectors.selectOfflineMemberIdsById(serverId),
    );

    const { isLoading } = Store.Servers.Api.useServerGetMembersQuery({
        serverId,
        // omit load on scroll for simplicity
        limit: Infinity,
    });

    const ids = [...onlineMemberIds, ...offlineMemberIds];

    if (isLoading || !ids.length) {
        return <MemberListPlaceholder/>;
    }

    return (
        <Scrollable className={styles.scrollable}>
            <div
                className={styles.list}
                role='list'
                aria-label={t('ChannelPanel.MemberList.label')}
                ref={wrapperRefManager}
            >
                <VirtualList.Node
                    items={ids}
                    getId={(v) => v}
                    itemMargin={2}
                    itemSize={40}
                    wrapperRef={wrapperRefManager}
                >
                    {(userId) => (
                        <MemberItem userId={userId}/>
                    )}
                </VirtualList.Node>
            </div>
        </Scrollable>
    );
};