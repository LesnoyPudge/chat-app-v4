import { RouteObject } from 'react-router';
import { ErrorScreenPure } from '@pages/screens/ErrorScreen';
import { noop } from '@lesnoypudge/utils';
import { InvitationScreenPure } from '@pages/screens/InvitationScreen';
import { GlobalLoaderScreen } from '@pages/screens/GlobalLoaderScreen';



export const DevRoute: RouteObject[] = [{
    path: 'dev',
    children: [
        {
            index: true,
            element: <>playground</>,
        },
        {
            path: 'error-screen',
            element: <ErrorScreenPure onClick={noop}/>,
        },
        // {
        //     path: 'auth-screen',
        //     element: <AuthPage/>,
        // },
        {
            path: 'invitation-screen',
            element: (
                <InvitationScreenPure
                    channel={{
                        membersCount: 2,
                        name: 'fake channel',
                        onlineCount: 1,
                        avatarId: 'https://i.pravatar.cc/80',
                    }}
                    acceptInvitation={noop}
                />
            ),
        },
        {
            path: 'global-loader-screen',
            element: <GlobalLoaderScreen/>,
        },
    ],
}];