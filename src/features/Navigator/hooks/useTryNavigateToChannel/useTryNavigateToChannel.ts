import { useFunction } from '@lesnoypudge/utils-react';
import { useNavigateTo } from '../useNavigateTo';
import { useLocalStorage } from '@/hooks';
import { useIsLocation } from '../useIsLocation';
import { localStorageApi } from '@/utils';
import { pathMatchers } from '../../vars';
import { Store } from '@/features';



export const useTryNavigateToChannel = (serverId: string) => {
    const { navigateTo } = useNavigateTo();
    const maybeChannel = Store.useSelector(
        Store.Channels.Selectors.selectAvailableByServerId(serverId),
    );

    const bail = () => {
        navigateTo.server({ serverId });
    };

    const navigate = (channelId: string) => {
        navigateTo.channel({ serverId, channelId });
    };

    const tryNavigateToChannel = useFunction(() => {
        if (maybeChannel) {}

        const lastVisitedChannels = localStorageApi.get('lastVisitedChannels');
        if (!lastVisitedChannels) return bail();

        const channelId = lastVisitedChannels[serverId];
        if (!channelId) return bail();

        navigateTo.channel({ serverId, channelId });
    });

    return {
        tryNavigateToChannel,
    };
};