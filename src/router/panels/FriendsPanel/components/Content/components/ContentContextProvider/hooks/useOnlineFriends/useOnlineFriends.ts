import { Store } from '@/features';
import { useMemo } from 'react';



export const useOnlineFriends = (searchValue: string) => {
    const users = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserOnlineFriendIdsAndNames,
    );

    const filteredIds = useMemo(() => {
        if (!searchValue) return users.map(({ id }) => id);

        return users.filter((user) => {
            return user.name.toLowerCase().includes(
                searchValue.toLowerCase(),
            );
        }).map(({ id }) => id);
    }, [users, searchValue]);

    return {
        filteredOnlineIds: filteredIds,
    };
};