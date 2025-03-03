import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { ProdRoutes } from './routes/ProdRoutes';
import { isDev } from '@/vars';
import { Navigator } from '@/features';



const DevRoutes = (
    isDev
        ? await import('./routes/DevRoutes').then((v) => v.DevRoutes)
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