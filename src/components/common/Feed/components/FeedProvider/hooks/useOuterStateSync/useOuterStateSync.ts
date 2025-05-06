import { useEffect } from 'react';
import { Store } from '@/features';
import { Types } from '../../../../types';
import { usePrevious } from '@lesnoypudge/utils-react';



type Props = Pick<
    Types.Context,
    'textChatId'
>;

export const useOuterStateSync = ({ textChatId }: Props) => {
    const { setCurrentTextChat } = Store.useActions(Store.App);

    useEffect(() => {
        if (!textChatId) return;

        setCurrentTextChat(textChatId);

        return () => {
            setCurrentTextChat(null);
        };
    }, [setCurrentTextChat, textChatId]);

    const messageCount = Store.useSelector(
        Store.TextChats.Selectors.selectMessageCountById(textChatId),
    );

    const prevMessageCount = usePrevious(messageCount);

    const [
        markAsReadTrigger,
        markAsReadHelpers,
    ] = Store.Users.Api.useUserMarkTextChatAsReadMutation();

    useEffect(() => {
        if (!textChatId) return;

        void markAsReadTrigger({ textChatId });
    }, [markAsReadTrigger, textChatId]);

    useEffect(() => {
        if (!textChatId) return;
        if (messageCount === undefined) return;
        if (prevMessageCount === undefined) return;
        if (prevMessageCount === messageCount) return;
        if (markAsReadHelpers.isLoading) return;

        void markAsReadTrigger({ textChatId });
    }, [
        messageCount,
        textChatId,
        markAsReadTrigger,
        prevMessageCount,
        markAsReadHelpers.isLoading,
    ]);
};