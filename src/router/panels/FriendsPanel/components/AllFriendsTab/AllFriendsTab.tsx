import { FC } from 'react';
import { FriendsActionButtons, List, ListItem } from '../components';
import { FriendsPanelTabs } from '../../FriendsPanel';
import { sharedStyles } from '../../sharedStyles';
import { useContentContextSelector } from '../ContentContext';



export const AllFriendsTab: FC = () => {
    const filteredAllIds = useContentContextSelector((v) => v.filteredAllIds);

    return (
        <FriendsPanelTabs.Panel.All className={sharedStyles.tabWrapper}>
            <List userIds={filteredAllIds}>
                {(id) => (
                    <ListItem
                        userId={id}
                        renderActionButtons={(id) => (
                            <FriendsActionButtons userId={id}/>
                        )}
                    />
                )}
            </List>
        </FriendsPanelTabs.Panel.All>
    );
};