import { FC } from 'react';
import { ConversationListItem, ServerListItem } from './components';
import { useSliceSelector, useStoreSelector } from '@redux/hooks';
import { Features } from '@redux/features';
import { Scrollable, Separator } from '@components';
import { useKeyboardNavigation } from '@hooks';
import { Iterate, Memo, useRefManager } from '@lesnoypudge/utils-react';
import { createStyles } from '@utils';
import { useTrans } from '@i18n';



const styles = createStyles({
    scrollable: 'py-2',
    list: 'flex flex-col gap-2',
});

export const NavigationList: FC = () => {
    const { t } = useTrans();
    const wrapperRef = useRefManager<HTMLDivElement>(null);

    const sortedConversationIds = useStoreSelector(
        (state) => (
            Features
                .Conversations
                .StoreSelectors
                .selectIdsWithUnreadNotificationCountSortedByCount()(state)
                .map((v) => v[0])
        ),
    );

    const conversationIdsToFetch = useSliceSelector(
        Features.Conversations.Slice,
        Features.Conversations.Slice.selectors.selectUndefinedIdsByIds(
            sortedConversationIds,
        ),
    );

    Features.Conversations.Api.useGetManyDeepQuery({
        conversationIds: conversationIdsToFetch,
    }, { skip: !conversationIdsToFetch.length });

    const sortedServerIds = useStoreSelector(
        (state) => (
            Features
                .Servers
                .StoreSelectors
                .selectIdsWithUnreadNotificationCountSortedByCount()(state)
                .map((v) => v[0])
        ),
    );

    const serverIdsWithoutNotifications = useStoreSelector(
        Features.Servers.StoreSelectors.selectIdsWithoutUnreadNotifications(),
    );

    const serverIdsToFetch = useSliceSelector(
        Features.Servers.Slice,
        Features.Servers.Slice.selectors.selectUndefinedIdsByIds([
            ...sortedServerIds,
            ...serverIdsWithoutNotifications,
        ]),
    );

    Features.Servers.Api.useGetManyDeepQuery({
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

    const separatorProps: Separator.Props = {
        length: 32,
        spacing: 0,
        thickness: 2,
    };

    if (!showServersOrConversations) return null;

    return (
        <div>
            <Separator {...separatorProps}/>

            <Scrollable
                className={styles.scrollable}
                size='hidden'
            >
                <div
                    className={styles.list}
                    aria-label={t('PrimaryNavigation.NavigationList.label')}
                    ref={wrapperRef}
                    role='menu'
                >
                    <If condition={showConversations}>
                        <Iterate items={sortedConversationIds}>
                            {(conversationId) => (
                                <Memo key={conversationId}>
                                    <ConversationListItem
                                        conversationId={conversationId}
                                        isFocused={getIsFocused(conversationId)}
                                        setCurrentFocusedId={setCurrentFocusedId}
                                        tabIndex={getTabIndex(conversationId)}
                                    />
                                </Memo>
                            )}
                        </Iterate>

                        <Separator {...separatorProps}/>
                    </If>

                    <Iterate items={serverIds}>
                        {(serverId) => (
                            <Memo key={serverId}>
                                <ServerListItem
                                    serverId={serverId}
                                    isFocused={getIsFocused(serverId)}
                                    setCurrentFocusedId={setCurrentFocusedId}
                                    tabIndex={getTabIndex(serverId)}
                                />
                            </Memo>
                        )}
                    </Iterate>
                </div>
            </Scrollable>

            <Separator {...separatorProps}/>
        </div>
    );
};