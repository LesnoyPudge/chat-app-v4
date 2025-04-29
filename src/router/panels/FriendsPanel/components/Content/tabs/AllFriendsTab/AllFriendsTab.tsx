import { FC } from 'react';
import { FriendsActionButtons, List, ListItem } from '../components';
import { Store } from '@/features';



export const AllFriendsTab: FC = () => {
    const friends = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserFriendIds,
    );

    return (
        <List userIds={friends}>
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