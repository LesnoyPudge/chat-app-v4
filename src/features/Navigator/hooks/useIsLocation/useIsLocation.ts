import { ContextSelectable } from '@lesnoypudge/utils-react';
import { NavigatorContext } from '../../context';
import { navigatorPath, params, staticNavigatorPath } from '../../vars';
import { T } from '@lesnoypudge/types-utils-base/namespace';



type Matchers = typeof matchers;

type MatcherSelector = (
    matchers: Matchers
) => ReturnType<T.ValueOf<Matchers>>;

const matchers = {
    root: () => {
        return (path: string) => path === navigatorPath.root();
    },

    auth: () => {
        return (path: string) => path === navigatorPath.auth();
    },

    invitation: () => {
        return (path: string) => {
            return path.startsWith(staticNavigatorPath.invitation.replace(
                params.invitationCode,
                '',
            ));
        };
    },

    conversation: (props: Parameters<typeof navigatorPath.conversation>[0]) => {
        return (path: string) => {
            return path === navigatorPath.conversation(props);
        };
    },

    anyConversation: () => {
        return (path: string) => {
            return path.startsWith(staticNavigatorPath.conversation.replace(
                params.conversationId,
                '',
            ));
        };
    },

    server: (props: Parameters<typeof navigatorPath.server>[0]) => {
        return (path: string) => {
            return path.startsWith(navigatorPath.server(props));
        };
    },

    channel: (props: Parameters<typeof navigatorPath.channel>[0]) => {
        return (path: string) => {
            return path === navigatorPath.channel(props);
        };
    },
};

export const useIsLocation = (
    pathOrMatcher: string | MatcherSelector,
): boolean => {
    const isActiveLocation = ContextSelectable.useSelector(
        NavigatorContext,
        (v) => {
            if (typeof pathOrMatcher === 'string') {
                return v.pathname === pathOrMatcher;
            }

            return pathOrMatcher(matchers)(v.pathname);
        },
    );

    return isActiveLocation;
};