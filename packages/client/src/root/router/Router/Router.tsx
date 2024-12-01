import { FC } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { ProdRoute } from '@root/router/routes/ProdRoute';
import { isDev } from '@vars';



const DevRoute = (
    isDev
        // eslint-disable-next-line unicorn/no-await-expression-member
        ? (await import('@root/router/routes/DevRoute')).DevRoute
        : []
);

const NotFound = <Navigate to='/' replace/>;

const router = createBrowserRouter([{
    errorElement: NotFound,
    children: [
        ...ProdRoute,
        ...DevRoute,
        { path: '*', element: NotFound },
    ],
}]);

export const Router: FC = () => {
    return (
        <RouterProvider router={router}/>
    );
};