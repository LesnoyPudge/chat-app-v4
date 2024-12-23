import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { ProdRoutes } from './routes/ProdRoutes';
import { isDev } from '@vars';
import { Navigator } from '@entities';



const DevRoutes = (
    isDev
        // eslint-disable-next-line unicorn/no-await-expression-member
        ? (await import('./routes/DevRoutes')).DevRoutes
        : () => null
);

export const Router: FC = () => {
    return (
        <Routes>
            {DevRoutes()}

            {ProdRoutes()}

            <Route
                path='*'
                element={(
                    <Navigate
                        to={Navigator.staticNavigatorPath.root}
                        replace
                    />
                )}
            />
        </Routes>
    );
};