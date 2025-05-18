import { ContextSelectable } from '@lesnoypudge/utils-react';



export type ContentContext = {
    displayCount: number;
    shouldShowList: boolean;
    shouldShowEmptyBlock: boolean;
    searchValue: string;
    filteredAllIds: string[];
    filteredOnlineIds: string[];
    filteredBlockedIds: string[];
    filteredPendingIds: string[];
    pendingIds: string[];
    incomingIds: string[];
    blockedIds: string[];
};

export const {
    ContentContext,
    useContentContextProxy,
    useContentContextSelector,
} = ContextSelectable.createContextWithHooks<
    ContentContext
>().withName('Content');