import { useMemo, useRef } from 'react';
import { NavigateOptions, useLocation, useNavigate } from 'react-router';
import {
    useConst,
    ContextSelectable,
    useFunction,
    useLatest,
} from '@lesnoypudge/utils-react';
import { navigatorPath, params, staticNavigatorPath } from '../../vars';
import { MobileMenu } from '@components';



type NavigatorPath = typeof navigatorPath;

/* eslint-disable @stylistic/indent */
type NavigateTo = {
    [_Key in keyof NavigatorPath]: (
        Parameters<NavigatorPath[_Key]>[0] extends void
            ? (options?: NavigateOptions) => Promise<void> | void
            : (
                (
                    props: Parameters<NavigatorPath[_Key]>[0],
                    options?: NavigateOptions
                ) => Promise<void> | void
            )
    )
};

type MyLocationIs = (
    {
        [_Key in keyof NavigatorPath]: (
            (props: Parameters<NavigatorPath[_Key]>[0]) => boolean
        );
    }
    & {
        anyConversation: () => boolean;
    }
);

export const useNavigator = () => {
    const _navigate = useNavigate();
    const { pathname } = useLocation();
    const latestPathRef = useLatest(pathname);
    const previousLocationRef = useRef(pathname);
    const mobileMenu = ContextSelectable.useSelector(
        MobileMenu.Context,
    ) as MobileMenu.Context | undefined;

    const getLocationResolver = useFunction((path?: string) => {
        const pathToUse = (
            path === undefined
                ? latestPathRef
                : { current: path }
        );

        return {
            root: () => pathToUse.current === navigatorPath.root(),

            auth: () => pathToUse.current === navigatorPath.auth(),

            conversation: (props) => {
                return pathToUse.current === navigatorPath.conversation(props);
            },

            anyConversation: () => {
                const conversationPath = (
                    staticNavigatorPath.conversation.replace(
                        params.conversationId,
                        '',
                    )
                );

                return pathToUse.current.startsWith(conversationPath);
            },

            invitation: (props) => {
                return pathToUse.current === navigatorPath.invitation(props);
            },

            channel: (props) => {
                return pathToUse.current === navigatorPath.channel(props);
            },

            server: (props) => {
                const serverPath = navigatorPath.server(props);

                return (
                    pathToUse.current === serverPath
                    || pathToUse.current.startsWith(serverPath)
                );
            },
        } satisfies MyLocationIs;
    });

    const stableMyLocationIs = useConst(() => getLocationResolver());

    const myLocationIs = useMemo(() => {
        return getLocationResolver(pathname);
    }, [getLocationResolver, pathname]);

    const navigate = useFunction((to: string, options?: NavigateOptions) => {
        previousLocationRef.current = pathname;

        if (mobileMenu?.shouldShowMenu) {
            mobileMenu.closeMenu();
        }

        return _navigate(to, options);
    });

    const navigateTo: NavigateTo = useConst(() => ({
        root: (options) => {
            if (stableMyLocationIs.root()) return;

            return navigate(navigatorPath.root(), options);
        },

        auth: (options) => {
            if (stableMyLocationIs.auth()) return;

            return navigate(navigatorPath.auth(), options);
        },

        invitation: (props, options) => {
            if (stableMyLocationIs.invitation(props)) return;

            return navigate(navigatorPath.invitation(props), options);
        },


        conversation: (props, options) => {
            if (stableMyLocationIs.conversation(props)) return;

            return navigate(navigatorPath.conversation(props), options);
        },


        channel: (props, options) => {
            if (stableMyLocationIs.channel(props)) return;

            return navigate(navigatorPath.channel(props), options);
        },


        server: (props, options) => {
            if (stableMyLocationIs.server(props)) return;

            return navigate(navigatorPath.server(props), options);
        },
    }));

    return {
        stableMyLocationIs,
        myLocationIs,
        navigateTo,
        navigate,
    };
};