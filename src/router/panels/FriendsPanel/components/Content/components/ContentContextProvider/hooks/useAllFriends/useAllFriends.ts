import { Store } from '@/features';
import { useMemo } from 'react';



export const useAllFriends = (searchValue: string) => {
    const ids = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserFriendIds,
    );

    const users = Store.useSelector(
        Store.Users.Selectors.selectByIds(...ids),
    );

    const filteredIds = useMemo(() => users.filter((user) => {
        return user.name.toLowerCase().includes(searchValue.toLowerCase());
    }).map(({ id }) => id), [users, searchValue]);

    return {
        filteredAllIds: filteredIds,
    };
};