import { RouteObject } from 'react-router';



export const ProdRoute: RouteObject[] = [{
    path: '/',
    children: [
        {
            index: true,
            element: <>prod page</>,
        },
        {
            path: 'nested/some',
            element: <>nested page</>,
        },
    ],
}];