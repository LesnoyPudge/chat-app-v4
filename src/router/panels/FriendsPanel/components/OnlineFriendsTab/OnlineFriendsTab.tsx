
import { FC } from 'react';
import { FriendsActionButtons, List, ListItem } from '../components';
import { FriendsPanelTabs } from '../../FriendsPanel';
import { sharedStyles } from '../../sharedStyles';
import { useContentContextSelector } from '../ContentContext';



export const OnlineFriendsTab: FC = () => {
    const filteredOnlineIds = useContentContextSelector((v) => {
        return v.filteredOnlineIds;
    });

    return (
        <FriendsPanelTabs.Panel.Online className={sharedStyles.tabWrapper}>
            <List userIds={filteredOnlineIds}>
                {(id) => (
                    <ListItem
                        userId={id}
                        renderActionButtons={(id) => (
                            <FriendsActionButtons userId={id}/>
                        )}
                    />
                )}
            </List>
        </FriendsPanelTabs.Panel.Online>
    );
};