import { FC, PropsWithChildren } from 'react';
import { LayoutTypeContext } from '../../context';
import { Types } from '../../types';
import { Store } from '@/features';



export const LayoutTypeProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const isMobile = Store.useSelector(
        Store.App.Selectors.selectIsMobileScreen,
    );

    const value: Types.Context = {
        isDesktop: !isMobile,
        isMobile,
    };

    return (
        <LayoutTypeContext.Provider value={value}>
            {children}
        </LayoutTypeContext.Provider>
    );
};