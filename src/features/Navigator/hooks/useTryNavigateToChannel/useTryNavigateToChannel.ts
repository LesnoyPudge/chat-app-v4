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

    const navigate = (serverId: string, channelId: string) => {
        navigateTo.channel({ serverId, channelId });

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

        if (lastChannelId) return navigate(localServerId, lastChannelId);

        const maybeChannelId = (
            Store.Channels.Selectors
                .selectAvailableTextChannelIdByServerId(serverId)(storeState)
        );

        if (maybeChannelId) return navigate(localServerId, maybeChannelId);

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
    };
};