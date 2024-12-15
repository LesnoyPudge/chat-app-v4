import { useRef } from 'react';
import { NavigateOptions, useLocation, useNavigate } from 'react-router';
import { useConst, useFunction, useLatest } from '@lesnoypudge/utils-react';
import { navigatorPath } from '../../vars';



export const useNavigator = () => {
    const _navigate = useNavigate();
    const { pathname } = useLocation();
    const latestPathRef = useLatest(pathname);
    const previousLocationRef = useRef(pathname);

    const myLocationIs = useConst(() => ({
        auth: () => latestPathRef.current === navigatorPath.auth(),
        root: () => latestPathRef.current === navigatorPath.root(),
        // anyPrivateChat: () => latestPathRef.current.includes(navigatorPath.anyPrivateChat()),
        // privateChat: (...args: Parameters<typeof navigatorPath.privateChat>) => {
        //     return latestPathRef.current === navigatorPath.privateChat(...args);
        // },
        // channel: (...args: Parameters<typeof navigatorPath.channel>) => {
        //     return latestPathRef.current.includes(navigatorPath.channel(...args));
        // },
        // room: (...args: Parameters<typeof navigatorPath.room>) => {
        //     return latestPathRef.current === navigatorPath.room(...args);
        // },
    }));

    const navigate = useFunction((to: string, options?: NavigateOptions) => {
        previousLocationRef.current = pathname;
        return _navigate(to, options);
    });

    const navigateTo = useConst(() => ({
        auth: (options?: NavigateOptions) => {
            if (myLocationIs.auth()) return;

            return navigate(navigatorPath.auth(), options);
        },

        root: (options?: NavigateOptions) => {
            if (myLocationIs.root()) return;

            return navigate(navigatorPath.root(), options);
        },

        // privateChat: (privateChatId: string, options?: NavigateOptions) => {
        //     if (myLocationIs.privateChat(privateChatId)) return;

        //     if (options?.withState) {
        //         stateRef.current.from = latestPathRef.current;
        //     }

        //     navigate(navigatorPath.privateChat(privateChatId), options);
        // },

        // channel: (channelId: string, options?: NavigateOptions) => {
        //     closeMobileMenu();

        //     if (myLocationIs.channel(channelId)) return;

        //     if (options?.withState) {
        //         stateRef.current.from = latestPathRef.current;
        //     }

        //     const latestRoomId = localStorageApi.get('lastVisitedTextRooms')?.[channelId];
        //     if (latestRoomId) {
        //         navigate(navigatorPath.room(channelId, latestRoomId), options);
        //         return;
        //     }

        //     navigate(navigatorPath.channel(channelId), options);
        // },

        // room: (channelId: string, roomId: string, options?: NavigateOptions) => {
        //     closeMobileMenu();

        //     if (myLocationIs.room(channelId, roomId)) return;

        //     if (options?.withState) {
        //         stateRef.current.from = latestPathRef.current;
        //     }

        //     navigate(navigatorPath.room(channelId, roomId), options);
        // },
    }));

    // const navigateToDev = useConst(() => ({
    //     app: () => navigate('app'),
    //     loader: () => navigate('/dev/loader'),
    //     error: () => navigate('/dev/error'),
    //     auth: () => navigate('/dev/auth'),
    //     playground: () => navigate('/dev/playground'),
    //     invitation: () => navigate('/dev/invitation/fake-link'),
    // }));

    return {
        myLocationIs,
        navigateTo,
        navigate,
    };
};