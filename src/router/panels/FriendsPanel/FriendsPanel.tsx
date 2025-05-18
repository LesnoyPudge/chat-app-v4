import { Tab } from '@/components';
import { FC } from 'react';
import { createStyles } from '@/utils';
import { useTrans } from '@/hooks';
import {
    AllFriendsTab,
    BlockedUsersTab,
    OnlineFriendsTab,
    PendingRequestsTab,
    Content,
    Navigation,
} from './components';



const styles = createStyles({
    wrapper: 'flex h-dvh flex-col',
});

export const { FriendsPanelTabs } = Tab.createTypedTabs({
    name: 'FriendsPanel',
    tabs: {
        Online: <OnlineFriendsTab/>,
        All: <AllFriendsTab/>,
        Pending: <PendingRequestsTab/>,
        Blocked: <BlockedUsersTab/>,
    },
});

export const FriendsPanel: FC = () => {
    const { t } = useTrans();

    return (
        <div className={styles.wrapper}>
            <FriendsPanelTabs.Provider
                initialTab={FriendsPanelTabs.tabNameTable.Online}
                orientation='horizontal'
                label={t('FriendsPanel.tabsLabel')}
            >
                <Navigation/>

                <Content/>
            </FriendsPanelTabs.Provider>
        </div>
    );
};