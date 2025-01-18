import { Navigator } from '@components';
import { useKeyboardNavigation } from '@hooks';
import { capitalize } from '@lesnoypudge/utils';
import { useRefManager } from '@lesnoypudge/utils-react';
import { rawActions } from '../../actions';



export const useDevTools = () => {
    const wrapperRef = useRefManager<HTMLDivElement>(null);
    const { navigateTo, navigate } = Navigator.useNavigator();

    const navigateToDev = Object.entries({
        playground: () => navigate(Navigator.navigatorDevPath.playground),
        errorScreen: () => navigate(Navigator.navigatorDevPath.errorScreen),
        authScreen: () => navigate(Navigator.navigatorDevPath.authScreen),
        invitationScreen: () => navigate(
            Navigator.navigatorDevPath.invitationScreen,
        ),
        globalLoaderScreen: () => navigate(
            Navigator.navigatorDevPath.globalLoaderScreen,
        ),
    }).reduce<Record<string, () => void | Promise<void>>>((
        acc,
        [key, value],
    ) => {
        acc[`navigateToDev${capitalize(key)}`] = value;

        return acc;
    }, {});

    const navigateToWithPrompt = Object.entries({
        root: navigateTo.root,
        auth: navigateTo.auth,
        conversation: () => {
            const conversationId = prompt('conversationId');
            if (!conversationId) return;

            return navigateTo.conversation({ conversationId });
        },
        invitation: () => {
            const invitationCode = prompt('invitationCode');
            if (!invitationCode) return;

            return navigateTo.invitation({ invitationCode });
        },
        server: () => {
            const serverId = prompt('serverId');
            if (!serverId) return;

            return navigateTo.server({ serverId });
        },
        channel: () => {
            const serverId = prompt('serverId');
            if (!serverId) return;

            const channelId = prompt('channelId');
            if (!channelId) return;

            return navigateTo.channel({ serverId, channelId });
        },
    }).reduce<Record<string, () => void | Promise<void>>>((
        acc,
        [key, value],
    ) => {
        acc[`navigateToWithPrompt${capitalize(key)}`] = value;

        return acc;
    }, {});

    const actions = {
        ...rawActions,
        ...navigateToDev,
        ...navigateToWithPrompt,
    };

    const navigation = useKeyboardNavigation(wrapperRef, {
        list: Object.keys(actions),
        direction: 'vertical',
        loop: true,
    });

    return {
        ...navigation,
        actions,
        wrapperRef,
    };
};