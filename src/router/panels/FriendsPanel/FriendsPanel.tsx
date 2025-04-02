import { Tab } from '@/components';
import { FC } from 'react';
import { Content, Navigation } from './components';
import { createStyles } from '@/utils';



const styles = createStyles({
    wrapper: 'flex h-dvh flex-col',
});

const tabs = Tab.createTabs({
    online: null,
    all: null,
    pending: null,
    blocked: null,
});

export type FriendsPanelTabs = typeof tabs;

export const FriendsPanelTabsContext = Tab.createTabContext<
    FriendsPanelTabs
>();

export const FriendsPanel: FC = () => {
    return (
        <div className={styles.wrapper}>
            <Tab.Provider
                context={FriendsPanelTabsContext}
                tabs={tabs}
                initialTab='online'
                orientation='horizontal'
            >
                <Navigation/>

                <Content/>
            </Tab.Provider>
        </div>
    );
};