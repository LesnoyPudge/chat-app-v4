import { useFunction, useIsMounted } from '@lesnoypudge/utils-react';
import { useNavigateTo } from '../useNavigateTo';
import { Store } from '@/features';
import { injectedStore } from '@/store/utils';



export const useTryNavigateToConversation = () => {
    const { navigateTo } = useNavigateTo();
    const { getIsMounted } = useIsMounted();

    const [
        createTrigger,
        createHelpers,
    ] = Store.Conversations.Api.useConversationCreateMutation();

    const tryNavigateToConversation = useFunction((targetId: string) => {
        const storeState = injectedStore.getStore().getState();

        const maybeConversation = (
            Store.Conversations.Selectors
                .selectConversationByTargetId(targetId)(storeState)
        );

        if (maybeConversation) return navigateTo.conversation({
            conversationId: maybeConversation.id,
        });

        if (!createHelpers.isLoading) {
            void createTrigger({ targetId }).then((result) => {
                if (!result.data) return;
                if (!getIsMounted()) return;

                navigateTo.conversation({
                    conversationId: result.data.id,
                });
            });
        }
    });

    return {
        isConversationLoading: createHelpers.isLoading,
        tryNavigateToConversation,
    };
};