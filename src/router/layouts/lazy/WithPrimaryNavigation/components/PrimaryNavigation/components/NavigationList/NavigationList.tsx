import { FC } from 'react';
import { ConversationListItem, ServerListItem } from './components';
import { KeyboardNavigation, Scrollable, Separator, VirtualRender } from '@/components';
import { useTrans } from '@/hooks';
import { useRefManager } from '@lesnoypudge/utils-react';
import { createStyles } from '@/utils';
import { Store } from '@/features';



const styles = createStyles({
    list: 'flex flex-col py-2',
    scrollableSeparator: 'ml-5',
});

export const NavigationList: FC = () => {
    const { t } = useTrans();
    const wrapperRef = useRefManager<HTMLDivElement>(null);

    const sortedConversationIds = Store.useSelector(
        Store
            .Conversations
            .Selectors
            .selectIdsWithUnreadNotificationCountSortedByCount,
        (state) => state.map((v) => v[0]),
    );

    const conversationIdsToFetch = Store.useSelector(
        Store.Conversations.Selectors.selectUndefinedIdsByIds(
            ...sortedConversationIds,
        ),
    );

    Store.Conversations.Api.useConversationGetManyDeepQuery({
        conversationIds: conversationIdsToFetch,
    }, { skip: !conversationIdsToFetch.length });

    const sortedServerIds = Store.useSelector(
        Store
            .Servers
            .Selectors
            .selectIdsWithUnreadNotificationCountSortedByCount,
        (state) => state.map((v) => v[0]),
    );

    const serverIdsWithoutNotifications = Store.useSelector(
        Store.Servers.Selectors.selectIdsWithoutUnreadNotifications,
    );

    const serverIdsToFetch = Store.useSelector(
        Store.Servers.Selectors.selectUndefinedIdsByIds(
            ...sortedServerIds,
            ...serverIdsWithoutNotifications,
        ),
    );

    Store.Servers.Api.useServerGetManyDeepQuery({
        serverIds: serverIdsToFetch,
    }, { skip: !serverIdsToFetch.length });

    const serverIds = [
        ...sortedServerIds,
        ...serverIdsWithoutNotifications,
    ];

    const ids = [
        ...sortedConversationIds,
        ...serverIds,
    ];

    const showServersOrConversations = !!ids.length;
    const showConversations = !!sortedConversationIds.length;

    const virtualServers = VirtualRender.useVirtualArray(serverIds);
    const virtualConversations = VirtualRender.useVirtualArray(
        sortedConversationIds,
    );
    const virtualList = [
        ...virtualConversations.virtualList,
        ...virtualServers.virtualList,
    ];

    if (!showServersOrConversations) return null;

    return (
        <div role='listitem'>
            <Separator
                length={32}
                spacing={0}
                thickness={2}
            />

            <Scrollable
                size='small'
                withoutOppositeGutter
                autoHide
            >
                <KeyboardNavigation.Provider
                    list={virtualList}
                    wrapperRef={wrapperRef}
                >
                    <div
                        className={styles.list}
                        aria-label={t('PrimaryNavigation.NavigationList.label')}
                        ref={wrapperRef}
                        role='list'
                    >
                        <If condition={showConversations}>
                            <VirtualRender.List
                                items={sortedConversationIds}
                                getId={(item) => item}
                                indexesShift={0}
                                itemSize={56}
                                onViewportIndexesChange={virtualConversations.setVirtualIndexes}
                            >
                                {(conversationId) => (
                                    <ConversationListItem
                                        conversationId={conversationId}
                                    />
                                )}
                            </VirtualRender.List>

                            <Separator
                                className={styles.scrollableSeparator}
                                length={32}
                                spacing={8}
                                thickness={2}
                            />
                        </If>

                        <VirtualRender.List
                            items={serverIds}
                            getId={(item) => item}
                            indexesShift={0}
                            onViewportIndexesChange={virtualServers.setVirtualIndexes}
                        >
                            {(serverId) => (
                                <ServerListItem
                                    serverId={serverId}
                                />
                            )}
                        </VirtualRender.List>
                    </div>
                </KeyboardNavigation.Provider>
            </Scrollable>

            <Separator
                length={32}
                spacing={0}
                thickness={2}
            />
        </div>
    );
};