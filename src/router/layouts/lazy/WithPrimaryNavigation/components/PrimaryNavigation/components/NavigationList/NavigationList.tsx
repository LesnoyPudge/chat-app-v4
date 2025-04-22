import { FC, memo } from 'react';
import { ConversationListItem, ServerListItem } from './components';
import { KeyboardNavigation, Scrollable, Separator, VirtualRender } from '@/components';
import { useTrans } from '@/hooks';
import { useRefManager, withDisplayName } from '@lesnoypudge/utils-react';
import { createStyles } from '@/utils';
import { Store } from '@/features';
import { decorate } from '@lesnoypudge/macro';



const styles = createStyles({
    list: 'flex flex-col py-2',
    scrollableSeparator: 'ml-5',
});

type ListProps = {
    servers: string[];
    conversations: string[];
};

decorate(withDisplayName, 'List', decorate.target);
decorate(memo, decorate.target);

const List: FC<ListProps> = ({ conversations, servers }) => {
    const { t } = useTrans();
    const wrapperRef = useRefManager<HTMLDivElement>(null);

    const virtualServers = VirtualRender.useVirtualArray({
        originalArray: servers,
    });
    const virtualConversations = VirtualRender.useVirtualArray({
        originalArray: conversations,
    });

    const showConversations = !!conversations.length;
    const virtualList = [
        ...virtualConversations.virtualList,
        ...virtualServers.virtualList,
    ];

    return (
        <div
            className={styles.list}
            aria-label={t('PrimaryNavigation.NavigationList.label')}
            ref={wrapperRef}
            role='list'
        >
            <KeyboardNavigation.Provider
                list={virtualList}
                wrapperRef={wrapperRef}
            >
                <If condition={showConversations}>
                    <VirtualRender.List
                        items={conversations}
                        getId={(item) => item}
                        itemSize={48}
                        itemMargin={8}
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
                    items={servers}
                    getId={(item) => item}
                    itemSize={48}
                    itemMargin={8}
                    onViewportIndexesChange={virtualServers.setVirtualIndexes}
                >
                    {(serverId) => (
                        <ServerListItem
                            serverId={serverId}
                        />
                    )}
                </VirtualRender.List>
            </KeyboardNavigation.Provider>
        </div>
    );
};

export const NavigationList: FC = () => {
    const sortedConversationIds = Store.useSelector(
        Store
            .Conversations
            .Selectors
            .selectIdsSortedByUnreadNotificationCount,
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
            .selectIdsSortedByUnreadNotificationCount,
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

    const listsAreEmpty = !serverIds.length && !sortedConversationIds.length;
    if (listsAreEmpty) return null;

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
                <List
                    conversations={sortedConversationIds}
                    servers={serverIds}
                />
            </Scrollable>

            <Separator
                length={32}
                spacing={0}
                thickness={2}
            />
        </div>
    );
};