import { FC, PropsWithChildren, useMemo } from 'react';
import { ContentContext } from '../../../ContentContext';
import { FriendsPanelTabs } from '../../../../FriendsPanel';
import {
    useAllFriends,
    useBlockedUsers,
    useOnlineFriends,
    usePendingUsers,
} from './hooks';
import { never } from '@lesnoypudge/utils';



export namespace ContentContextProvider {
    export type Props = (
        PropsWithChildren
        & {
            searchValue: string;
        }
    );
}

export const ContentContextProvider: FC<ContentContextProvider.Props> = ({
    searchValue,
    children,
}) => {
    const { currentTab } = FriendsPanelTabs.useProxy();

    const { filteredAllIds } = useAllFriends(searchValue);
    const {
        filteredBlockedIds,
        blockedIds,
    } = useBlockedUsers(searchValue);
    const { filteredOnlineIds } = useOnlineFriends(searchValue);
    const {
        filteredPendingIds,
        pendingIds,
        incomingIds,
    } = usePendingUsers(searchValue);

    const displayCount = useMemo(() => {
        switch (currentTab.identifier) {
            case 'All': {
                return filteredAllIds.length;
            }

            case 'Online': {
                return filteredOnlineIds.length;
            }

            case 'Pending': {
                return filteredPendingIds.length;
            }

            case 'Blocked': {
                return filteredBlockedIds.length;
            }
        }

        never();
    }, [
        currentTab.identifier,
        filteredAllIds.length,
        filteredBlockedIds.length,
        filteredOnlineIds.length,
        filteredPendingIds.length,
    ]);

    const shouldShowList = !!displayCount;
    const shouldShowEmptyBlock = !shouldShowList;

    const value: ContentContext = {
        displayCount: 0,
        searchValue,
        shouldShowEmptyBlock,
        shouldShowList,
        filteredAllIds,
        filteredBlockedIds,
        filteredOnlineIds,
        filteredPendingIds,
        pendingIds,
        incomingIds,
        blockedIds,
    };

    return (
        <ContentContext.Provider value={value}>
            {children}
        </ContentContext.Provider>
    );
};