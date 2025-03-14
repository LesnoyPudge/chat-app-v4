import { NavigateOptions } from 'react-router';
import {
    ContextSelectable,
    useConst,
    usePropsChange,
} from '@lesnoypudge/utils-react';
import { navigatorDevPath, navigatorPath, params, staticNavigatorPath } from '../../vars';
import { NavigatorContext } from '../../context';



type NavigatorPath = typeof navigatorPath;
type NavigatorPathDev = typeof navigatorDevPath;

/* eslint-disable @stylistic/indent */
type NavigateTo = {
    [_Key in keyof NavigatorPath]: (
        Parameters<NavigatorPath[_Key]>[0] extends void
            ? (options?: NavigateOptions) => void
            : (
                (
                    props: Parameters<NavigatorPath[_Key]>[0],
                    options?: NavigateOptions
                ) => void
            )
    )
};

type NavigateToDev = {
    [_Key in keyof NavigatorPathDev]: VoidFunction;
};

type MyLocationIs = (
    {
        [_Key in keyof NavigatorPath]: (
            (props: Parameters<NavigatorPath[_Key]>[0]) => boolean
        );
    }
);

export const useNavigateTo = () => {
    const navigate = ContextSelectable.useSelector(
        NavigatorContext,
        (v) => v.navigate,
    );
    const pathnameRef = ContextSelectable.useSelector(
        NavigatorContext,
        (v) => v.pathnameRef,
    );

    const stableMyLocationIs = useConst(() => {
        const pathToUse = pathnameRef;

        return {
            root: () => pathToUse.current === navigatorPath.root(),

            auth: () => pathToUse.current === navigatorPath.auth(),

            conversation: (props) => {
                return pathToUse.current === navigatorPath.conversation(props);
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

    const navigateToDev: NavigateToDev = useConst(() => ({
        authScreen: () => navigate(navigatorDevPath.authScreen),
        errorScreen: () => navigate(navigatorDevPath.errorScreen),
        globalLoaderScreen: () => navigate(navigatorDevPath.globalLoaderScreen),
        invitationScreen: () => navigate(navigatorDevPath.invitationScreen),
        playground: () => navigate(navigatorDevPath.playground),
        playgroundAuthorized: () => navigate(
            navigatorDevPath.playgroundAuthorized,
        ),
    }));

    usePropsChange({ navigate });

    return {
        navigateTo,
        navigateToDev,
        navigate,
    };
};