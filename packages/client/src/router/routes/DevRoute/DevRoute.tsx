import { RouteObject } from 'react-router';
import { ErrorScreen } from '@pages/screens/ErrorScreen';
import { ErrorBoundary } from '@lesnoypudge/utils-react';
import { ErrorThrower } from '@components';



export const DevRoute: RouteObject[] = [{
    path: 'dev',
    children: [
        {
            index: true,
            element: <>playground</>,
        },
        {
            path: 'error-screen',
            element: (
                <ErrorBoundary.Node FallbackComponent={ErrorScreen}>
                    <ErrorThrower/>
                </ErrorBoundary.Node>
            ),
        },
    ],
}];