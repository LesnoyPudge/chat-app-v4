import { FC } from 'react';
import { ConversationListItem, ServerListItem } from './components';
import { useStoreSelector } from '@redux/hooks';
import { Features } from '@redux/features';
import { Iterate, Scrollable, Separator } from '@components';
import { useKeyboardNavigation } from '@hooks';
import { useRefManager } from '@lesnoypudge/utils-react';
import { createStyles } from '@utils';
import { useTrans } from '@i18n';



const styles = createStyles({
    wrapper: 'flex flex-col',
    scrollable: 'py-2',
    list: 'flex flex-col gap-2',
});

export const NavigationList: FC = () => {
    const { t } = useTrans();
    const wrapperRef = useRefManager<HTMLDivElement>(null);

    const conversationIdsWithNotifications = useStoreSelector(
        Features.Conversations.StoreSelectors.selectIdsWithUnreadNotificationCount(),
    );

    const serverIdsWithNotifications = useStoreSelector(
        Features.Servers.StoreSelectors.selectIdsWithUnreadNotificationCount(),
    );

    const serverIdsWithoutNotifications = useStoreSelector(
        Features.Servers.StoreSelectors.selectIdsWithoutUnreadNotifications(),
    );

    const sortedConversationIds = conversationIdsWithNotifications.toSorted((a, b) => {
        return b[1] - a[1];
    }).map(([id]) => id);

    const sortedServerIds = serverIdsWithNotifications.toSorted((a, b) => {
        return b[1] - a[1];
    }).map(([id]) => id);

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

    return (
        <If condition={showServersOrConversations}>
            <div className={styles.wrapper}>
                <Separator {...separatorProps}/>

                <Scrollable
                    className={styles.scrollable}
                    size='hidden'
                >
                    <div
                        className={styles.list}
                        aria-label={t('PrimaryNavigation.NavigationList.label')}
                        ref={wrapperRef}
                        role='menubar'
                    >
                        <If condition={showConversations}>
                            <Iterate items={sortedConversationIds}>
                                {(conversationId) => (
                                    <ConversationListItem
                                        conversationId={conversationId}
                                        isFocused={getIsFocused(conversationId)}
                                        setCurrentFocusedId={setCurrentFocusedId}
                                        tabIndex={getTabIndex(conversationId)}
                                        key={conversationId}
                                    />
                                )}
                            </Iterate>

                            <Separator {...separatorProps}/>
                        </If>

                        <Iterate items={serverIds}>
                            {(serverId) => (
                                <ServerListItem
                                    serverId={serverId}
                                    isFocused={getIsFocused(serverId)}
                                    setCurrentFocusedId={setCurrentFocusedId}
                                    tabIndex={getTabIndex(serverId)}
                                    key={serverId}
                                />
                            )}
                        </Iterate>
                    </div>
                </Scrollable>

                <Separator {...separatorProps}/>
            </div>
        </If>
    );
};