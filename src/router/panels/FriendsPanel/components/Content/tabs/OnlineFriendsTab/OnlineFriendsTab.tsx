import { Store } from '@/features';
import { FC } from 'react';
import { FriendsActionButtons, List, ListItem } from '../components';



export const OnlineFriendsTab: FC = () => {
    const onlineFriends = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserOnlineFriendIds,
    );

    return (
        <List userIds={onlineFriends}>
            {(id) => (
                <ListItem
                    userId={id}
                    renderActionButtons={(id) => (
                        <FriendsActionButtons userId={id}/>
                    )}
                />
            )}
        </List>
    );
};