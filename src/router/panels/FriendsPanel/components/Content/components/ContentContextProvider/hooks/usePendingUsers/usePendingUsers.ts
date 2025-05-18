import { Store } from '@/features';
import { useMemo } from 'react';



export const usePendingUsers = (searchValue: string) => {
    const incomingIds = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserIncomingRequestUserIds,
    );
    const outgoingIds = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserOutgoingRequestUserIds,
    );

    const ids = [...incomingIds, ...outgoingIds];

    const users = Store.useSelector(
        Store.Users.Selectors.selectByIds(...ids),
    );

    const filteredIds = useMemo(() => users.filter((user) => {
        return user.name.toLowerCase().includes(searchValue.toLowerCase());
    }).map(({ id }) => id), [users, searchValue]);

    return {
        filteredPendingIds: filteredIds,
        pendingIds: ids,
        incomingIds,
    };
};