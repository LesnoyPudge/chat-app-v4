import { FC } from 'react';
import { ConversationListItem, ServerListItem } from './components';
import { Scrollable, Separator, VirtualRender } from '@/components';
import { useKeyboardNavigation, useTrans } from '@/hooks';
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

    const {
        getIsFocused,
        getTabIndex,
        setCurrentFocusedId,
    } = useKeyboardNavigation(wrapperRef, {
        list: ids,
        direction: 'vertical',
        loop: false,
    });

    const showServersOrConversations = !!ids.length;
    const showConversations = !!sortedConversationIds.length;

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
                <div
                    className={styles.list}
                    aria-label={t('PrimaryNavigation.NavigationList.label')}
                    ref={wrapperRef}
                    role='list'
                >
                    <If condition={showConversations}>
                        <VirtualRender
                            items={sortedConversationIds}
                            getId={(item) => item}
                            indexesShift={0}
                            itemSize={56}
                        >
                            {(conversationId) => (
                                <ConversationListItem
                                    key={conversationId}
                                    conversationId={conversationId}
                                    isFocused={getIsFocused(conversationId)}
                                    setCurrentFocusedId={setCurrentFocusedId}
                                    tabIndex={getTabIndex(conversationId)}
                                />
                            )}
                        </VirtualRender>

                        <Separator
                            className={styles.scrollableSeparator}
                            length={32}
                            spacing={8}
                            thickness={2}
                        />
                    </If>

                    <VirtualRender
                        items={serverIds}
                        getId={(item) => item}
                        indexesShift={0}
                    >
                        {(serverId) => (
                            <ServerListItem
                                key={serverId}
                                serverId={serverId}
                                isFocused={getIsFocused(serverId)}
                                setCurrentFocusedId={setCurrentFocusedId}
                                tabIndex={getTabIndex(serverId)}
                            />
                        )}
                    </VirtualRender>
                </div>
            </Scrollable>

            <Separator
                length={32}
                spacing={0}
                thickness={2}
            />
        </div>
    );
};