import { useFunction } from '@lesnoypudge/utils-react';
import { useNavigateTo } from '../useNavigateTo';
import { localStorageApi } from '@/utils';
import { Store } from '@/features';
import { invariant } from '@lesnoypudge/utils';
import { injectedStore } from '@/store/utils';



export const useTryNavigateToChannel = (serverId?: string) => {
    const { navigateTo } = useNavigateTo();

    const [
        getManyTrigger,
        getManyHelpers,
    ] = Store.Servers.Api.useLazyServerGetManyDeepQuery();

    const navigate = ({
        channelId,
        serverId,
    }: {
        serverId: string;
        channelId: string;
    }) => {
        navigateTo.channel({ serverId, channelId });

        const storeState = injectedStore.getStore().getState();
        const textChatId = (
            Store.Channels.Selectors.selectTextChatById(channelId)(storeState)
        );

        // save if it is text channel
        if (!textChatId) return;

        const value = localStorageApi.get('lastVisitedChannels');

        localStorageApi.set('lastVisitedChannels', {
            ...value,
            [serverId]: channelId,
        });
    };

    const tryNavigateToChannel = useFunction((providedServerId?: string) => {
        const localServerId = providedServerId ?? serverId;
        invariant(localServerId);

        const storeState = injectedStore.getStore().getState();
        const lastVisitedChannels = localStorageApi.get('lastVisitedChannels');
        const lastChannelId = lastVisitedChannels?.[localServerId];

        if (lastChannelId) return navigate({
            channelId: lastChannelId,
            serverId: localServerId,
        });

        const maybeChannelId = (
            Store.Channels.Selectors
                .selectAvailableTextChannelIdByServerId(serverId)(storeState)
        );

        if (maybeChannelId) return navigate({
            serverId: localServerId,
            channelId: maybeChannelId,
        });

        const isServerExists = (
            Store.Servers.Selectors.selectIsExistsById(serverId)(storeState)
        );

        if (!getManyHelpers.isLoading && !isServerExists) {
            void getManyTrigger({ serverIds: [localServerId] });
        }

        navigateTo.server({ serverId: localServerId });
    });

    return {
        tryNavigateToChannel,
        navigate,
    };
};