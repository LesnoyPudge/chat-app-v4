import { RouteObject } from 'react-router';
import { ErrorScreenPure } from '@pages/screens/ErrorScreen';
import { noop } from '@lesnoypudge/utils';
import { InvitationScreenPure } from '@pages/screens/InvitationScreen';
import { GlobalLoaderScreen } from '@pages/screens/GlobalLoaderScreen';
import { Playground } from '@root/Playground';
import { AuthScreenPure } from '@pages/screens/AuthScreen';
import { createSleep } from '@utils';



const Sleep = createSleep(1_000);

export const DevRoute: RouteObject[] = [{
    path: 'dev',
    children: [
        {
            index: true,
            element: <Sleep><Playground/></Sleep>,
        },
        {
            path: 'error-screen',
            element: <Sleep><ErrorScreenPure onClick={noop}/></Sleep>,
        },
        {
            path: 'auth-screen',
            element: <Sleep><AuthScreenPure/></Sleep>,
        },
        {
            path: 'invitation-screen',
            element: (
                <Sleep>
                    <InvitationScreenPure
                        channel={{
                            membersCount: 2,
                            name: 'fake channel',
                            onlineCount: 1,
                            avatarId: 'https://i.pravatar.cc/80',
                        }}
                        acceptInvitation={noop}
                    />
                </Sleep>
            ),
        },
        {
            path: 'global-loader-screen',
            element: (
                <Sleep>
                    <GlobalLoaderScreen/>
                </Sleep>
            ),
        },
    ],
}];