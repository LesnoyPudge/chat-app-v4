import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { ProdRoutes } from '@root/router/routes/ProdRoutes';
import { isDev } from '@vars';
import { Navigator } from '@entities';
import { useConst } from '@lesnoypudge/utils-react';



const DevRoutes = (
    isDev
        // eslint-disable-next-line unicorn/no-await-expression-member
        ? (await import('@root/router/routes/DevRoutes')).DevRoutes
        : () => null
);

export const Router: FC = () => {
    const _ProdRoutes = useConst(() => ProdRoutes({}));
    const _DevRoutes = useConst(() => DevRoutes({}));

    return (
        <BrowserRouter>
            <Routes>
                {_ProdRoutes}
                {_DevRoutes}

                <Route
                    path='*'
                    element={(
                        <Navigate
                            to={Navigator.staticNavigatorPath.root}
                            replace
                        />
                    )}/>
            </Routes>
        </BrowserRouter>
    );
};