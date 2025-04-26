import { useFunction } from '@lesnoypudge/utils-react';
import { Types } from '../../../../types';
import { Store } from '@/features';
import { useEffect } from 'react';



type Props = Pick<Types.Context, 'textChatId'>;

export const useInfiniteLoader = ({ textChatId }: Props) => {
    const [
        getMessagesTrigger,
        getMessagesHelpers,
    ] = Store.Messages.Api.useLazyMessageGetManyByTextChatIdQuery();

    const loadMoreFn = useFunction(({ from }: { from: number | null }) => {
        if (getMessagesHelpers.isFetching) return;

        void getMessagesTrigger({
            textChatId,
            from,
            limit: 50,
        });
    });

    // initial fetch
    useEffect(() => {
        if (getMessagesHelpers.isFetching) return;
        if (!getMessagesHelpers.isUninitialized) return;

        loadMoreFn({ from: null });
    }, [loadMoreFn, getMessagesHelpers]);

    const firstMessageIndex = Store.useSelector(
        Store.TextChats.Selectors
            .selectFirstDefinedMessageIndexById(textChatId),
    );

    // fetch old messages when upper bound is reached
    const onIndexesChange: (
        Types.Context['onIndexesChange']
    ) = useFunction(([start]) => {
        if (start !== 0) return;
        if (firstMessageIndex === 0) return;
        if (getMessagesHelpers.isFetching) return;

        loadMoreFn({ from: firstMessageIndex ?? null });
    });

    return {
        onIndexesChange,
        isLoading: getMessagesHelpers.isLoading,
        isUninitialized: getMessagesHelpers.isUninitialized,
    };
};