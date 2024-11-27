import { RouteObject } from 'react-router';
import { ErrorScreen } from '@pages/screens/ErrorScreen';



export const DevRoute: RouteObject[] = [{
    path: 'dev',
    children: [
        {
            index: true,
            element: <>playground</>,
        },
        {
            path: 'error-screen',
            element: <ErrorScreen/>,
        },
    ],
}];