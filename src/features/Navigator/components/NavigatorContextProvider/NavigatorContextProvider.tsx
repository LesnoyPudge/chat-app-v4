import { FC, PropsWithChildren } from 'react';
import { NavigatorContext } from '../../context';
import { Types } from '../../types/types';
import { useLocation, useNavigate } from 'react-router';
import { useFunction, useLatest } from '@lesnoypudge/utils-react';



export const NavigatorContextProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const _navigate = useNavigate() as Types.Context['navigate'];
    const navigate = useFunction(_navigate);
    const { pathname } = useLocation();
    const pathnameRef = useLatest(pathname);

    const value: Types.Context = {
        navigate,
        pathname,
        pathnameRef,
    };

    return (
        <NavigatorContext.Provider value={value}>
            {children}
        </NavigatorContext.Provider>
    );
};