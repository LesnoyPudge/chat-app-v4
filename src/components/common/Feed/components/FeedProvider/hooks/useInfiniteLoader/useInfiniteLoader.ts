import { useFunction } from '@lesnoypudge/utils-react';
import { Types } from '../../../../types';
import { Store } from '@/features';
import { useEffect } from 'react';



type Props = Pick<
    Types.Context,
    'textChatId'
>;

export const useInfiniteLoader = ({
    textChatId,
}: Props) => {
    const [
        getMessagesTrigger,
        getMessagesHelpers,
    ] = Store.Messages.Api.useLazyMessageGetManyByTextChatIdQuery();

    const loadMore: (
        Types.Context['loadMore']
    ) = useFunction(({ from }) => {
        if (!textChatId) return;
        if (getMessagesHelpers.isFetching) return;

        return getMessagesTrigger({
            textChatId,
            from,
            limit: 50,
        });
    });

    // initial fetch
    useEffect(() => {
        if (!textChatId) return;
        if (!getMessagesHelpers.isUninitialized) return;

        void loadMore({ from: null });
    }, [loadMore, getMessagesHelpers.isUninitialized, textChatId]);

    return {
        loadMore,
        isLoading: getMessagesHelpers.isLoading,
        isUninitialized: getMessagesHelpers.isUninitialized,
    };
};