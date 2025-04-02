import { createStyles } from '@/utils';
import { ReactNode } from 'react';
import { FriendsPanelTabsContext } from '../../FriendsPanel';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Scrollable, Search, Separator, Tab } from '@/components';
import {
    AllFriendsTab,
    BlockedUsersTab,
    OnlineFriendsTab,
    PendingRequestsTab,
} from './tabs';
import { useTrans } from '@/hooks';
import { ContentContextProvider, DisplayCount, EmptyListBlock } from './components';



const styles = createStyles({
    searchBar: 'h-9 w-full',
    infoWrapper: 'px-7 pt-4',
    tabWrapper: 'h-full overflow-hidden px-7 pb-4',
    scrollable: 'h-full',
});

export namespace Content {
    export type Props = {
        searchValue: string;
    };
}

export const Content = () => {
    const { t } = useTrans();
    const search = Search.useSearch('');
    const {
        currentTab,
    } = ContextSelectable.useProxy(FriendsPanelTabsContext);

    const tabNameToTabComponent = {
        all: <AllFriendsTab/>,
        blocked: <BlockedUsersTab/>,
        online: <OnlineFriendsTab/>,
        pending: <PendingRequestsTab/>,
    } satisfies Record<typeof currentTab.identifier, ReactNode>;

    return (
        <ContentContextProvider searchValue={search.deferredValue.trim()}>
            <div className={styles.infoWrapper}>
                <Search.Bar
                    className={styles.searchBar}
                    label={t('FriendsPanel.Navigation.searchLabel')}
                    onChange={search.setState}
                    placeholder={t('FriendsPanel.Navigation.searchLabel')}
                    value={search.value}
                />

                <DisplayCount/>

                <Separator
                    spacing={12}
                    length='100%'
                    thickness={2}
                />
            </div>

            <Tab.Panel
                className={styles.tabWrapper}
                context={FriendsPanelTabsContext}
                tabName={currentTab.identifier}
            >
                <Scrollable className={styles.scrollable}>
                    {tabNameToTabComponent[currentTab.identifier]}

                    <EmptyListBlock/>
                </Scrollable>
            </Tab.Panel>
        </ContentContextProvider>
    );
};