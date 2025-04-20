import { Navigator } from '@/features';
// import { capitalize } from '@lesnoypudge/utils';
import { useRefManager } from '@lesnoypudge/utils-react';
import { rawActions } from '../../actions';



const navigate = (path: string) => {
    // eslint-disable-next-line no-restricted-globals
    location.href = path;
};

export const useDevTools = () => {
    const wrapperRef = useRefManager<HTMLDivElement>(null);

    // const navigateToDev = Object.entries({
    //     playground: () => navigate(Navigator.navigatorDevPath.playground),
    //     errorScreen: () => navigate(Navigator.navigatorDevPath.errorScreen),
    //     authScreen: () => navigate(Navigator.navigatorDevPath.authScreen),
    //     invitationScreen: () => navigate(
    //         Navigator.navigatorDevPath.invitationScreen,
    //     ),
    //     globalLoaderScreen: () => navigate(
    //         Navigator.navigatorDevPath.globalLoaderScreen,
    //     ),
    // }).reduce<Record<string, () => void | Promise<void>>>((
    //     acc,
    //     [key, value],
    // ) => {
    //     acc[`navigateToDev${capitalize(key)}`] = value;

    //     return acc;
    // }, {});

    // const navigateToWithPrompt = Object.entries({
    //     root: navigateTo.root,
    //     auth: navigateTo.auth,
    //     conversation: () => {
    //         const conversationId = prompt('conversationId');
    //         if (!conversationId) return;

    //         return navigateTo.conversation({ conversationId });
    //     },
    //     invitation: () => {
    //         const invitationCode = prompt('invitationCode');
    //         if (!invitationCode) return;

    //         return navigateTo.invitation({ invitationCode });
    //     },
    //     server: () => {
    //         const serverId = prompt('serverId');
    //         if (!serverId) return;

    //         return navigateTo.server({ serverId });
    //     },
    //     channel: () => {
    //         const serverId = prompt('serverId');
    //         if (!serverId) return;

    //         const channelId = prompt('channelId');
    //         if (!channelId) return;

    //         return navigateTo.channel({ serverId, channelId });
    //     },
    // }).reduce<Record<string, () => void | Promise<void>>>((
    //     acc,
    //     [key, value],
    // ) => {
    //     acc[`navigateToWithPrompt${capitalize(key)}`] = value;

    //     return acc;
    // }, {});

    const navigatorActions = {
        nav_to_playground: () => {
            navigate(Navigator.navigatorDevPath.playground);
        },

        nav_to_playground_auth: () => {
            navigate(Navigator.navigatorDevPath.playgroundAuthorized);
        },

        nav_to_root: () => {
            navigate(Navigator.navigatorPath.root());
        },
    };

    const actions = {
        ...rawActions,
        ...navigatorActions,
        // ...navigateToDev,
        // ...navigateToWithPrompt,
    };

    return {
        actions,
        wrapperRef,
    };
};