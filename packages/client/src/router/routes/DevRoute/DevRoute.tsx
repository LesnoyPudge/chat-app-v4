import { RouteObject } from 'react-router';
import { ErrorScreenPure } from '@pages/screens/ErrorScreen';
import { noop } from '@lesnoypudge/utils';
import { InvitationScreenPure } from '@pages/screens/InvitationScreen';



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
                    }}
                    acceptInvitation={noop}
                />
            ),
        },
        // {
        //     path: 'global-loader-screen',
        //     element: <GlobalLoader.Wrapper/>,
        // },
    ],
}];