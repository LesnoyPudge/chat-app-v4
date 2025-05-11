import { Tab } from '@/components';
import { FC } from 'react';
import { Content, Navigation } from './components';
import { createStyles } from '@/utils';
import { useTrans } from '@/hooks';



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

export const {
    FriendsPanelTabsContext,
    useFriendsPanelTabsContextProxy,
    useFriendsPanelTabsContextSelector,
} = Tab.createTabContext<FriendsPanelTabs>().withName('FriendsPanelTabs');

export const FriendsPanel: FC = () => {
    const { t } = useTrans();

    return (
        <div className={styles.wrapper}>
            <Tab.Provider
                context={FriendsPanelTabsContext}
                tabs={tabs}
                initialTab='online'
                orientation='horizontal'
                label={t('FriendsPanel.tabsLabel')}
            >
                <Navigation/>

                <Content/>
            </Tab.Provider>
        </div>
    );
};