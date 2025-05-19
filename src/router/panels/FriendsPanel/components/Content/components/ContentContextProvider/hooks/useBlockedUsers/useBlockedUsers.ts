import { Store } from '@/features';
import { useMemo } from 'react';



export const useBlockedUsers = (searchValue: string) => {
    const blockedIds = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserBlockedIds,
    );

    const users = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserBlockedIdsAndNames,
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
        filteredBlockedIds: filteredIds,
        blockedIds,
    };
};